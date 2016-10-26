/* @flow */
import React from 'react'
import Theme from 'js-theme'
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
    {...theme.{{WorkfloComponentCamel}}}
  />
)

{{WorkfloComponent}}.defaultProps = defaultProps

const defaultTheme = {
  {{WorkfloComponentCamel}}: {
  },
}

export default Theme('{{WorkfloComponent}}', defaultTheme)({{WorkfloComponent}})
