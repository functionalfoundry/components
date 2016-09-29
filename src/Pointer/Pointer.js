/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'
import {
  Colors,
  Spacing,
} from '@workflo/styles'
import View from '../View'

type HorizontalT = 'Left' | 'Center' | 'Right'
type VerticalT = 'Top' | 'Center' | 'Bottom'
type SizeT = 'Small' | 'Medium' | 'Large'

type PropsT = {
  children: React.Children,
  theme: Object,
  targetHorizontal: HorizontalT,
  targetVertical: VerticalT,
  pointerHorizontal: HorizontalT,
  pointerVertical: VerticalT,
  size: SizeT,
  color: string,
}

const defaultProps = {
  theme: {},
  size: 'Medium',
  color: Colors.grey200,
}

const Pointer = ({
  color, // eslint-disable-line no-unused-vars
  children,
  pointerVertical, // eslint-disable-line no-unused-vars
  pointerHorizontal, // eslint-disable-line no-unused-vars
  targetVertical, // eslint-disable-line no-unused-vars
  targetHorizontal, // eslint-disable-line no-unused-vars
  size, // eslint-disable-line no-unused-vars
  theme,
  ...props,
}: PropsT) => (
  <View
    {...mergeProps(theme.pointer, props)}
  >
    <View
      {...mergeProps(theme.inner, theme.arrow)}
    >
      {children}
    </View>
  </View>
)

Pointer.defaultProps = defaultProps

const defaultTheme = ({
  targetHorizontal,
  targetVertical,
  pointerHorizontal,
  pointerVertical,
  size,
  color,
}: PropsT) => ({
  pointer: {
    backgroundColor: color,
    color: Colors.grey900,
    flex: '0 1',
  },
  inner: {
    padding: Spacing.small,
    position: 'relative',
    flex: '0 1',
  },
  arrow: {
    ':after': {
      position: 'absolute',
      content: '" "',
      height: 0,
      width: 0,
      border: `${sizeMap[size]}px solid transparent`,
      ...getArrowStyle(pointerVertical,
                       pointerHorizontal,
                       targetVertical,
                       targetHorizontal,
                       sizeMap[size],
                       color),
    },
  },
})

const getArrowStyle = (
  pointerVertical: VerticalT,
  pointerHorizontal: HorizontalT,
  targetVertical: VerticalT,
  targetHorizontal: HorizontalT,
  width: number,
  color: string,
) => {
  const style = {}

  if (pointerHorizontal === 'Left' &&
     (pointerVertical === 'Center' || targetHorizontal === 'Right')) {
    // Pointing left
    style.right = '100%'
    style.borderRightColor = color
  }
  if (pointerHorizontal === 'Right' &&
     (pointerVertical === 'Center' || targetHorizontal === 'Left')) {
    // Pointing right
    style.right = -2 * width
    style.borderLeftColor = color
  }
  if (pointerVertical === 'Top' &&
     (pointerHorizontal === 'Center' || targetVertical === 'Bottom')) {
    // Pointing top
    style.top = -2 * width
    style.borderBottomColor = color
  }
  if (pointerVertical === 'Bottom' &&
     (pointerHorizontal === 'Center' || targetVertical === 'Top')) {
    // Pointing bottom
    style.bottom = -2 * width
    style.borderTopColor = color
  }

  if (pointerHorizontal === 'Left' &&
     (targetVertical === 'Top' || targetVertical === 'Bottom')) {
    // Align Left
    style.left = width
  }

  if (pointerHorizontal === 'Right' &&
     (targetVertical === 'Top' || targetVertical === 'Bottom')) {
    // Align Right
    style.right = width
  }

  if (pointerHorizontal === 'Center') {
    // Align Center Horizontal
    style.left = `calc(50% - ${width}px)`
  }

  if (pointerVertical === 'Top' &&
     (targetHorizontal === 'Left' || targetHorizontal === 'Right')) {
    // Align Top
    style.top = width
  }

  if (pointerVertical === 'Center') {
    // Align Center Vertical
    style.top = `calc(50% - ${width}px)`
  }

  if (pointerVertical === 'Bottom' &&
     (targetHorizontal === 'Left' || targetHorizontal === 'Right')) {
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

export default Theme('Pointer', defaultTheme)(Pointer)
