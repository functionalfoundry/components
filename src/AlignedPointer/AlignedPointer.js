/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'
import View from '../View'

type PropsT = {
  theme: Object,
}

const defaultProps = {
  theme: {},
}

const AlignedPointer = ({
  theme,
  ...props,
}: PropsT) => (
  <View
    {...mergeProps(theme.alignedPointer, props)}
  />
)

AlignedPointer.defaultProps = defaultProps

const defaultTheme = {
  alignedPointer: {
  },
}

export default Theme('AlignedPointer', defaultTheme)(AlignedPointer)
