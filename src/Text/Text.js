/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'
import {
  Fonts,
} from '@workflo/styles'
import View from '../View'

type PropsT = {
  children?: React.Children,
  size: string,
  theme: Object,
}

const defaultProps = {
  size: 'base',
  theme: {},
}

const Text = ({
  children,
  theme,
  ...props,
}: PropsT) => (
  <View
    {...mergeProps(props, theme.text)}
  >
    {children}
  </View>
)

Text.defaultProps = defaultProps

const getFont = (size: string) => Fonts[size]

const defaultTheme = ({
  size,
}: PropsT) => ({
  text: {
    ...getFont(size),
    flex: '0 1',
  },
})

export default Theme('Text', defaultTheme)(Text)
