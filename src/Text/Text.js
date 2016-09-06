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
  testId?: string,
  theme: Object,
}

const defaultProps = {
  size: 'base',
  theme: {},
}

const Text = ({
  children,
  testId,
  theme,
  ...props,
}: PropsT) => (
  <View
    {...mergeProps(props, theme.text)}
    testId={testId}
  >
    {children}
  </View>
)

Text.defaultProps = defaultProps

const getFont = (size: string) => Fonts[size]

const defaultTheme = (props: PropsT) => ({
  text: {
    ...getFont(props.size),
  },
})

export default Theme('Text', defaultTheme)(Text)
