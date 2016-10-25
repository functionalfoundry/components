/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Fonts,
  Spacing,
} from '@workflo/styles'
import View from '../View'

type PropsT = {
  label: string,
  children?: React.Children,
  theme: Object,
}

const defaultProps = {
  label: '',
}

const Preview = ({
  label,
  children,
  theme,
}: PropsT) => (
  <View
    {...theme.preview}
  >
    {label &&
      <View
        {...theme.label}
      >
        {label}
      </View>}
    {children &&
      <View>
        {children}
      </View>}
  </View>
)

const defaultTheme = {
  preview: {
    marginBottom: Spacing.base + Spacing.tiny,
  },
  label: {
    ...Fonts.base,
    marginBottom: Spacing.tiny,
  },
}

Preview.defaultProps = defaultProps
export default Theme('Preview', defaultTheme)(Preview)
