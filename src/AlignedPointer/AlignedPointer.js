/* @flow */
import React from 'react'
import Theme from 'js-theme'
import AlignedTrigger from '../AlignedTrigger'
import Pointer from '../Pointer'
import { EventT } from '../Trigger'

type PositionT =
  | 'Top'
  | 'Top Right'
  | 'Right'
  | 'Bottom Right'
  | 'Bottom'
  | 'Bottom Left'
  | 'Left'
  | 'Top Left'

type GravityT = 'Top' | 'Right' | 'Bottom' | 'Left' | 'Corner'

type PropsT = {
  children: React.Children,
  closeTriggers: Array<EventT>,
  gravity: GravityT,
  horizontalOffset: number,
  onClose: Function,
  onOpen: Function,
  openTriggers: Array<EventT>,
  portal: React.Element<any>,
  position: PositionT,
  targetRef: any,
  theme: Object,
  verticalOffset: number,
  /** Needed until we have theme nested */
  padding: number,
}

type StateT = {
  pointerPosition: PositionT,
}

const defaultProps = {
  opened: true,
  theme: {},
  horizontalOffset: 0,
  verticalOffset: 0,
  padding: 12,
}

// TODO: Use size map for pointer (exported?)
const POINTER_SIZE = 10

class AlignedPointer extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    this.state = {
      pointerPosition: props.position,
    }
  }

  handleRealign = () => {
    // This is weak. Should not be a toggle (imperative) and should handle
    // off center positioning
    this.setState({
      pointerPosition: this.props.position === 'Left' ? 'Right' : 'Left',
    })
  }

  render() {
    const {
      children,
      portal,
      position,
      gravity,
      horizontalOffset,
      verticalOffset,
      openTriggers,
      closeTriggers,
      onOpen,
      onClose,
      padding,
      targetRef,
    }: PropsT = this.props
    return (
      <AlignedTrigger
        portal={({ close }) => (
          <Pointer
            position={getPointerPosition(this.state.pointerPosition)}
            gravity={getPointerGravity(gravity)}
            theme={{
              inner: {
                padding,
              },
            }}
          >
            {typeof portal === 'function' ? portal({ close }) : portal}
          </Pointer>
        )}
        verticalOffset={getVerticalOffset(verticalOffset, position, gravity)}
        horizontalOffset={getHorizontalOffset(
          horizontalOffset,
          this.state.pointerPosition,
          gravity
        )}
        position={position}
        gravity={gravity}
        openTriggers={openTriggers}
        closeTriggers={closeTriggers}
        onOpen={onOpen}
        onClose={onClose}
        onRealign={this.handleRealign}
        targetRef={targetRef}
      >
        {children}
      </AlignedTrigger>
    )
  }
}

const getPointerPosition = position =>
  position.split(' ').map(el => getOpposite(el)).join(' ')

const getPointerGravity = gravity => getOpposite(gravity)

// Duplicated from Align
const getOpposite = direction => {
  switch (direction) {
    case 'Top':
      return 'Bottom'
    case 'Right':
      return 'Left'
    case 'Bottom':
      return 'Top'
    case 'Left':
      return 'Right'
    case 'Center':
      return 'Center'
    default:
      return null
  }
}

const getVerticalOffset = (
  verticalOffset: number,
  position: PositionT,
  gravity: GravityT
) => {
  if (position === 'Top' || gravity === 'Top') {
    return verticalOffset - POINTER_SIZE
  } else if (position === 'Bottom' || gravity === 'Bottom') {
    return verticalOffset + POINTER_SIZE
  }
  return verticalOffset
}

const getHorizontalOffset = (
  horizontalOffset: number,
  position: PositionT,
  gravity: GravityT
) => {
  if (position === 'Left' || gravity === 'Left') {
    return horizontalOffset - POINTER_SIZE
  } else if (position === 'Right' || gravity === 'Right') {
    return horizontalOffset + POINTER_SIZE
  }
  return horizontalOffset
}

const defaultTheme = {
  alignedPointer: {},
}

const ThemedAlignedPointer = Theme('AlignedPointer', defaultTheme)(AlignedPointer)
export default ThemedAlignedPointer
