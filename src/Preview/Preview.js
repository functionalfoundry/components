/* @flow */
import React from 'react'
import {
  Fonts,
  Spacing,
} from '@workflo/styles'
import View from '../View'

type PropsT = {
  label: string,
  children?: React.Children,
}

const defaultProps = {
  label: '',
}

const Preview = ({
  label,
  children,
}: PropsT) => (
  <View
    theme={{
      view: previewStyle,
    }}
  >
    {label &&
      <View
        theme={{
          view: labelStyle,
        }}
      >
        {label}
      </View>}
    {children &&
      <View>
        {children}
      </View>}
  </View>
)

const previewStyle = {
  marginBottom: Spacing.base,
  flex: '0 1',
}

const labelStyle = {
  ...Fonts.base,
}

Preview.defaultProps = defaultProps
export default Preview
