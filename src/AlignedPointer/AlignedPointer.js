/* @flow */
import React from 'react'
import Theme from 'js-theme'
import AlignedTrigger from '../AlignedTrigger'
import Pointer from '../Pointer'
import { EventT } from '../Trigger'
import {
  HorizontalT,
  VerticalT,
} from '../../types/PortalTypes'

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
      theme,
      ...props
    }: PropsT = this.props
    return (
      <AlignedTrigger
        portal={
          <Pointer
            pointerVertical={pointerVertical}
            pointerHorizontal={pointerHorizontal}
            targetVertical={targetVertical}
            targetHorizontal={targetHorizontal}
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
