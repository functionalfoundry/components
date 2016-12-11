/* @flow */
import React from 'react'
import Theme from 'js-theme'
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
class AlignedPointer extends React.Component {
  props: PropsT
  state: StateT

  constructor(props: PropsT) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handlePortalTrigger = () => {
    this.setState({
      isOpen: false,
    })
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  handleTargetTrigger = () => {
    this.setState({
      isOpen: true,
    })
    if (this.props.onOpen) {
      this.props.onOpen()
    }
  }

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
            triggerOn={portalTriggers}
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
          triggerOn={targetTriggers}
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

AlignedPointer.defaultProps = defaultProps

const defaultTheme = {
  alignedTrigger: {},
  portal: {},
  trigger: {},
}

export default Theme('AlignedPointer', defaultTheme)(AlignedPointer)
