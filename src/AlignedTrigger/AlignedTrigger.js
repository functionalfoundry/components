/* @flow */
import React from 'react'
import Theme from 'js-theme'
import ReactTimeout from 'react-timeout'
import View from '../View'
import Align from '../Align'
import Trigger, { EventT } from '../Trigger'
import {
  HorizontalT,
  VerticalT,
} from '../types/PortalTypes'

type PropsT = {
  theme: Object,
  portal: React.Element<any>,
  children: React.Children,
  portalVertical: VerticalT,
  portalHorizontal: HorizontalT,
  targetVertical: VerticalT,
  targetHorizontal: HorizontalT,
  horizontalOffset: number,
  verticalOffset: number,
  targetTriggers: Array<EventT>,
  portalTriggers: Array<EventT>,
  onOpen: Function,
  onClose: Function,
  onRealign: Function,
  // Added by ReactTimeout HoC
  setTimeout: Function,
}

type StateT = {
  isOpen: boolean,
}

const defaultProps = {
  opened: true,
  theme: {},
  horizontalOffset: 0,
  verticalOffset: 0,
}

// TODO: Use PureComponent
class AlignedTrigger extends React.Component {
  props: PropsT
  state: StateT
  hasEnteredPortal: boolean
  hasEnteredTrigger: boolean
  // We hijack hover when we want to close the portal when
  // we leave the target but don't enter the portal element (ie move mouse away
  // from popover). We need buffering to accomplish that.
  static onCloseBuffers = []
  static crossingTriggers = false

  constructor(props: PropsT) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handlePortalTrigger = (e) => {
    switch (e.type) {
      case 'mouseenter':
        this.handleEnterPortal()
        break
      case 'mouseleave':
        this.handleLeavePortal()
        break
      default:
        break
    }
  }

  handleTargetTrigger = (e) => {
    switch (e.type) {
      case 'mouseenter':
        this.handleEnterTarget()
        break
      case 'mouseleave':
        this.handleLeaveTarget()
        break
      default:
        break
    }
  }

  handleEnterTarget = () => {
    this.hasEnteredTrigger = true
    if (!this.state.isOpen) {
      this.open()
    }
  }

  handleLeaveTarget = () => {
    this.hasEnteredPortal = false
    this.hasEnteredTrigger = false
    AlignedTrigger.onCloseBuffers = [this.close]
    this.props.setTimeout(() => {
      if (!this.hasEnteredTrigger && !this.hasEnteredPortal && !AlignedTrigger.crossingTriggers) {
        this.close()
      }
      AlignedTrigger.onCloseBuffers = []
      AlignedTrigger.crossingTriggers = false
    }, DELAY_TIME)
  }

  handleEnterPortal = () => {
    this.hasEnteredPortal = true
  }

  handleLeavePortal = () => {
    this.hasEnteredPortal = false
    this.hasEnteredTrigger = false
    this.props.setTimeout(() => {
      if (!this.hasEnteredTrigger && !this.hasEnteredPortal) {
        this.close()
      }
      AlignedTrigger.onCloseBuffers = []
    }, DELAY_TIME)
  }

  open = () => {
    const { onOpen } = this.props
    const { onCloseBuffers } = AlignedTrigger
    this.setState({
      isOpen: true,
    })
    if (onOpen) {
      onOpen()
    }
    if (onCloseBuffers.length > 0) {
      AlignedTrigger.crossingTriggers = true
      onCloseBuffers[0]()
      AlignedTrigger.onCloseBuffers = []
    }
  }

  close = () => {
    const { onClose } = this.props
    this.setState({
      isOpen: false,
    })
    if (onClose) {
      onClose()
    }
  }

  shouldHijackHover = () =>
    this.props.portalTriggers.indexOf('Mouse leave' !== -1)

  render() {
    const {
      children,
      portal,
      theme,
      portalVertical,
      portalHorizontal,
      targetVertical,
      targetHorizontal,
      horizontalOffset,
      verticalOffset,
      targetTriggers,
      portalTriggers,
      onRealign,
      ...props
    } = this.props

    const finalTargetTriggers = [...targetTriggers]
    const finalPortalTriggers = [...portalTriggers]

    if (this.shouldHijackHover()) {
      if (targetTriggers.indexOf('Mouse leave') === -1) {
        finalTargetTriggers.push('Mouse leave')
      }
      if (portalTriggers.indexOf('Hover') === -1) {
        finalPortalTriggers.push('Hover')
      }
    }

    return (
      <Align
        {...props}
        {...theme.alignedTrigger}
        portalVertical={portalVertical}
        portalHorizontal={portalHorizontal}
        targetVertical={targetVertical}
        targetHorizontal={targetHorizontal}
        horizontalOffset={horizontalOffset}
        verticalOffset={verticalOffset}
        isOpen={this.state.isOpen}
        onRealign={onRealign}
        portal={
          <Trigger
            triggerOn={finalPortalTriggers}
            onTrigger={this.handlePortalTrigger}
          >
            <View
              {...theme.portal}
            >
              {portal}
            </View>
          </Trigger>
        }
      >
        <Trigger
          triggerOn={finalTargetTriggers}
          onTrigger={this.handleTargetTrigger}
        >
          <View
            inline
            {...theme.target}
          >
            {children}
          </View>
        </Trigger>
      </Align>
    )
  }
}

AlignedTrigger.defaultProps = defaultProps

const defaultTheme = {
  alignedTrigger: {},
  portal: {},
  trigger: {},
}

const DELAY_TIME = 600 // Milliseconds

export default ReactTimeout(Theme('AlignedTrigger', defaultTheme)(AlignedTrigger))
