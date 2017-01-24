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
      position,
      gravity,
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
        position={position}
        gravity={gravity}
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
  target: {
    display: 'inline-block',
  },
}

export default Theme('AlignedPointer', defaultTheme)(AlignedPointer)
