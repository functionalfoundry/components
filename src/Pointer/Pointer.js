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
  theme: Object,
  targetHorizontal: HorizontalT,
  targetVertical: VerticalT,
  pointerHorizontal: HorizontalT,
  pointerVertical: VerticalT,
  arrowSize: SizeT,
}

const defaultProps = {
  theme: {},
}

const Pointer = ({
  pointerVertical, // eslint-disable-line no-unused-vars
  pointerHorizontal, // eslint-disable-line no-unused-vars
  targetVertical, // eslint-disable-line no-unused-vars
  targetHorizontal, // eslint-disable-line no-unused-vars
  theme,
  ...props,
}: PropsT) => (
  <View
    {...mergeProps(theme.pointer, props)}
  >
    <View
      {...mergeProps(theme.inner, theme.arrow)}
    >
      {'Hello'}
    </View>
  </View>
)

Pointer.defaultProps = defaultProps

const defaultTheme = ({
  targetHorizontal,
  targetVertical,
  pointerHorizontal,
  pointerVertical,
}: PropsT) => ({
  pointer: {
    backgroundColor: Colors.grey200,
    color: Colors.grey800,
    flex: '0 1',
  },
  inner: {
    padding: Spacing.small,
    paddingRight: Spacing.large, // TODO: Make side conditional on position?
    position: 'relative',
    flex: '0 1',
  },
  arrow: {
    ':after': {
      position: 'absolute',
      content: '" "',
      height: 0,
      width: 0,
      border: '7px solid transparent',
      ...getArrowStyle(pointerVertical, pointerHorizontal, targetVertical, targetHorizontal)
    },
  },
})

const getArrowStyle = (
  pointerVertical: VerticalT,
  pointerHorizontal: HorizontalT,
  targetVertical: VerticalT,
  targetHorizontal: HorizontalT
) => {
  const style = {}

  if (pointerHorizontal === 'Left' &&
     (pointerVertical === 'Center' || targetHorizontal === 'Right')) {
    // Pointing left
    style.right = '100%'
    style.borderRightColor = Colors.grey200
  }
  if (pointerHorizontal === 'Right' &&
     (pointerVertical === 'Center' || targetHorizontal === 'Left')) {
    // Pointing right
    style.right = '-14px'
    style.borderLeftColor = Colors.grey200
  }
  if (pointerVertical === 'Top' &&
     (pointerHorizontal === 'Center' || targetVertical === 'Bottom')) {
    // Pointing top
    style.top = '-14px'
    style.borderBottomColor = Colors.grey200
  }
  if (pointerVertical === 'Bottom' &&
     (pointerHorizontal === 'Center' || targetVertical === 'Top')) {
    // Pointing bottom
    style.bottom = '-14px'
    style.borderTopColor = Colors.grey200
  }

  if (pointerHorizontal === 'Left' &&
     (targetVertical === 'Top' || targetVertical === 'Bottom')) {
    // Align Left
    style.left = '8px'
  }

  if (pointerHorizontal === 'Right' &&
     (targetVertical === 'Top' || targetVertical === 'Bottom')) {
    // Align Right
    style.right = '8px'
  }

  if (pointerHorizontal === 'Center') {
    // Align Center Horizontal
    style.left = 'calc(50% - 8px)'
  }

  if (pointerVertical === 'Top' &&
     (targetHorizontal === 'Left' || targetHorizontal === 'Right')) {
    // Align Top
    style.top = '8px'
  }

  if (pointerVertical === 'Center') {
    // Align Center Vertical
    style.top = 'calc(50% - 8px)'
  }

  if (pointerVertical === 'Bottom' &&
     (targetHorizontal === 'Left' || targetHorizontal === 'Right')) {
    // Align Bottom
    style.bottom = '8px'
  }

  return style
}

export default Theme('Pointer', defaultTheme)(Pointer)
