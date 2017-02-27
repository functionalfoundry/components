/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Spacing,
} from '@workflo/styles'
import View from '../View'
import {
  HorizontalT,
  VerticalT,
  SizeT,
} from '../types/PortalTypes'

type PositionT = 'Top' | 'Top Right' | 'Right' | 'Bottom Right' | 'Bottom' |
'Bottom Left' | 'Left' | 'Top Left'

type GravityT = 'Top' | 'Right' | 'Bottom' | 'Left'

type PropsT = {
  children: React.Children,
  theme: Object,
  position: PositionT,
  gravity: GravityT,
  size: SizeT,
  color: string,
  backgroundColor: string,
  borderColor: string,
}

const defaultProps = {
  theme: {},
  size: 'Medium',
  color: Colors.grey900,
  backgroundColor: Colors.grey900,
  borderColor: '#393D3F',
}

const Pointer = ({
  color, // eslint-disable-line no-unused-vars
  children,
  position, // eslint-disable-line no-unused-vars
  gravity, // eslint-disable-line no-unused-vars
  size, // eslint-disable-line no-unused-vars
  theme,
  ...props,
}: PropsT) => (
  <View
    {...props}
    {...theme.pointer}
  >
    <View
      {...theme.inner}
    >
      {children}
    </View>
  </View>
)

Pointer.defaultProps = defaultProps

const defaultTheme = ({
  position,
  gravity,
  size,
  color,
  backgroundColor,
  borderColor,
}: PropsT) => ({
  pointer: {
    backgroundColor,
    borderColor,
    borderWidth: 1,
    color: 'white',
    flex: '0 1',
  },
  inner: {
    padding: Spacing.small,
    position: 'relative',
    flex: '0 1',
    ':after': {
      position: 'absolute',
      content: '" "',
      height: 0,
      width: 0,
      border: `${sizeMap[size]}px solid transparent`,
      ...getArrowStyle(position,
                       gravity,
                       sizeMap[size],
                       borderColor),
    },
  },
})

const getArrowStyle = (
  position: PositionT,
  gravity: GravityT,
  width: number,
  borderColor: string,
) => {
  const style = {}
  const [first, second] = position.split(' ')

  if (position === 'Left' || gravity === 'Left') {
    // Pointing left
    style.right = '100%'
    style.borderRightColor = borderColor
  }
  if (position === 'Right' || gravity === 'Right') {
    // Pointing right
    style.right = -2 * width
    style.borderLeftColor = borderColor
  }
  if (position === 'Top' || gravity === 'Top') {
    // Pointing top
    style.top = -2 * width
    style.borderBottomColor = borderColor
  }
  if (position === 'Bottom' || gravity === 'Bottom') {
    // Pointing bottom
    style.bottom = -2 * width
    style.borderTopColor = borderColor
  }

  if ((gravity === 'Top' || gravity === 'Bottom') &&
     (position === 'Top Left' || position === 'Bottom Left')) {
    // Align Left
    style.left = width
  }

  if ((gravity === 'Top' || gravity === 'Bottom') &&
     (position === 'Top Right' || position === 'Bottom Right')) {
    // Align Right
    style.right = width
  }

  if (position === 'Top' || position === 'Bottom') {
    // Align Center Horizontal
    style.left = `calc(50% - ${width}px)`
  }

  if ((gravity === 'Left' || gravity === 'Right') &&
      (position === 'Top Left' || position === 'Top Right')) {
    // Align Top
    style.top = width
  }

  if (position === 'Left' || position === 'Right') {
    // Align Center Vertical
    style.top = `calc(50% - ${width}px)`
  }

  if ((gravity === 'Left' || gravity === 'Right') &&
      (position === 'Bottom Left' || position === 'Bottom Right')) {
    // Align Bottom
    style.bottom = width
  }

  return style
}

const sizeMap = {
  Small: 5,
  Medium: 7,
  Large: 12,
}

const ThemedPointer = Theme('Pointer', defaultTheme)(Pointer)
export default ThemedPointer
