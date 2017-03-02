/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'
import Align from '../Align'
import Trigger, { EventT } from '../Trigger'

type PositionT = 'Top' | 'Top Right' | 'Right' | 'Bottom Right' | 'Bottom' |
'Bottom Left' | 'Left' | 'Top Left'

type GravityT = 'Top' | 'Right' | 'Bottom' | 'Left' | 'Corner'

type PropsT = {
  theme: Object,
  portal: React.Element<any>,
  children: React.Children,
  position: PositionT,
  gravity: GravityT,
  horizontalOffset: number,
  verticalOffset: number,
  openTriggers: Array<EventT>,
  closeTriggers: Array<EventT>,
  onOpen: Function,
  onClose: Function,
  onRealign: Function,
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

  static onCloseBuffer = null

  constructor(props: PropsT) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handlePortalTrigger = () => {
    this.close()
  }

  handleTargetTrigger = () => {
    this.open()
  }

  storePortal = (c) => {
    this.portal = c
  }

  storeTarget = (c) => {
    this.target = c
  }

  open = () => {
    const { onOpen, closeTriggers } = this.props
    // If another AlignedTrigger instance is currently open
    if (AlignedTrigger.onCloseBuffer) {
      // Close open AlignedTrigger
      AlignedTrigger.onCloseBuffer()
    }

    this.setState({
      isOpen: true,
    })
    if (onOpen) {
      onOpen()
    }
    AlignedTrigger.onCloseBuffer = this.close

    if(closeTriggers.indexOf('Mouse leave') !== -1) {
      setTimeout(() => {
        // Start listening so we an detect when the mouse leaves the target +
        // portal rectangle
        document.addEventListener('mousemove', this.handleMouseMove)
        const targetRect = this.target.node.getBoundingClientRect()
        const portalRect = this.portal.node.getBoundingClientRect()
        this.hoverTargetRect = {
          top: Math.min(targetRect.top, portalRect.top),
          right: Math.max(targetRect.right, portalRect.right),
          bottom: Math.max(targetRect.bottom, portalRect.bottom),
          left: Math.min(targetRect.left, portalRect.left),
        }
      }, 30)
    }
  }

  handleMouseMove = (e) => {
    const x = e.clientX
    const y = e.clientY
    const { hoverTargetRect } = this
    if (x < hoverTargetRect.left || x > hoverTargetRect.right ||
        y < hoverTargetRect.top || y > hoverTargetRect.bottom) {
      // The user moused out of the target + portal rectangle
      document.removeEventListener('mousemove', this.handleMouseMove)
      this.close()
    }
  }

  close = () => {
    this.setState({
      isOpen: false,
    })
    if (this.props.onClose) {
      this.props.onClose()
    }
    AlignedTrigger.onCloseBuffer = null
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    const {
      children,
      portal,
      theme,
      position,
      gravity,
      horizontalOffset,
      verticalOffset,
      openTriggers,
      closeTriggers,
      onRealign,
      ...props
    } = this.props
    // Since we're listening to the document for mouse out we don't need to
    // listen for it from Trigger
    const finalCloseTriggers = closeTriggers.filter((trigger) => trigger !== 'Mouse leave')
    return (
      <Align
        {...props}
        {...theme.alignedTrigger}
        position={position}
        gravity={gravity}
        horizontalOffset={horizontalOffset}
        verticalOffset={verticalOffset}
        isOpen={this.state.isOpen}
        onRealign={onRealign}
        portal={
          <Trigger
            triggerOn={finalCloseTriggers}
            onTrigger={this.handlePortalTrigger}
            ref={this.storePortal}
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
          triggerOn={openTriggers}
          onTrigger={this.handleTargetTrigger}
          ref={this.storeTarget}
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
  target: {
    display: 'inline-block',
  },
}

export default Theme('AlignedTrigger', defaultTheme)(AlignedTrigger)
