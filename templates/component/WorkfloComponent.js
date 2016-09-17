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

const {{WorkfloComponent}} = ({
  theme,
  ...props,
}: PropsT) => (
  <View
    {...mergeProps(theme.{{WorkfloComponentCamel}}, props)}
  />
)

{{WorkfloComponent}}.defaultProps = defaultProps

const defaultTheme = {
  {{WorkfloComponentCamel}}: {
  },
}

export default Theme('{{WorkfloComponent}}', defaultTheme)({{WorkfloComponent}})
