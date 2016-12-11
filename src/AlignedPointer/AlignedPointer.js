/* @flow */
import React from 'react'
import Theme from 'js-theme'
import AlignedTrigger from '../AlignedTrigger'
import Pointer from '../Pointer'
import { EventT } from '../Trigger'
import {
  HorizontalT,
  VerticalT,
} from '../types/PortalTypes'

type PropsT = {
  theme: Object,
  portal: React.Element<any>,
  children: React.Children,
  pointerVertical: VerticalT,
  pointerHorizontal: HorizontalT,
  targetVertical: VerticalT,
  targetHorizontal: HorizontalT,
  horizontalOffset: number,
  verticalOffset: number,
  targetTriggers: Array<EventT>,
  portalTriggers: Array<EventT>,
  onOpen: Function,
  onClose: Function,
}

type StateT = {
  pointerHorizontal: HorizontalT,
  targetHorizontal: HorizontalT,
  horizontalOffset: number,
}

const defaultProps = {
  opened: true,
  theme: {},
  horizontalOffset: 0,
  verticalOffset: 0,
}

// TODO: Use size map for pointer (exported?)
const POINTER_SIZE = 10

class AlignedPointer extends React.Component {
  props: PropsT
  state: StateT

  constructor(props: PropsT) {
    super(props)
    this.state = {
      pointerHorizontal: props.pointerHorizontal,
      targetHorizontal: props.targetHorizontal,
      horizontalOffset: props.horizontalOffset,
    }
  }

  handleRealign = () => {
    this.setState({
      pointerHorizontal: this.props.pointerHorizontal === 'Left' ? 'Right' : 'Left',
      targetHorizontal: this.props.targetHorizontal === 'Left' ? 'Right' : 'Left',
    })
  }

  render() {
    const {
      children,
      portal,
      pointerVertical,
      pointerHorizontal,
      targetVertical,
      targetHorizontal,
      horizontalOffset,
      verticalOffset,
      targetTriggers,
      portalTriggers,
      onOpen,
      onClose,
      theme,
      ...props
    }: PropsT = this.props
    return (
      <AlignedTrigger
        portal={
          <Pointer
            pointerVertical={pointerVertical}
            pointerHorizontal={this.state.pointerHorizontal}
            targetVertical={targetVertical}
            targetHorizontal={this.state.targetHorizontal}
          >
            {portal}
          </Pointer>
        }
        verticalOffset={getVerticalOffset(verticalOffset, pointerVertical)}
        horizontalOffset={getHorizontalOffset(horizontalOffset, pointerHorizontal)}
        portalVertical={pointerVertical}
        portalHorizontal={pointerHorizontal}
        targetVertical={targetVertical}
        targetHorizontal={targetHorizontal}
        targetTriggers={targetTriggers}
        portalTriggers={portalTriggers}
        onOpen={onOpen}
        onClose={onClose}
        onRealign={this.handleRealign}
      >
        {children}
      </AlignedTrigger>
    )
  }
}

AlignedPointer.defaultProps = defaultProps

const getVerticalOffset = (verticalOffset: number, pointerVertical: VerticalT) => {
  switch (pointerVertical) {
    case 'Top':
      return verticalOffset + POINTER_SIZE
    case 'Bottom':
      return verticalOffset - POINTER_SIZE
    default:
      return verticalOffset
  }
}

const getHorizontalOffset = (horizontalOffset: number, pointerHorizontal: HorizontalT) => {
  switch (pointerHorizontal) {
    case 'Left':
      return horizontalOffset + POINTER_SIZE
    case 'Right':
      return horizontalOffset - POINTER_SIZE
    default:
      return horizontalOffset
  }
}

const defaultTheme = {
  alignedPointer: {
  },
}

export default Theme('AlignedPointer', defaultTheme)(AlignedPointer)
