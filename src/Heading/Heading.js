/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Fonts,
} from '@workflo/styles'
import Text from '../Text'
import View from '../View'

type PropsT = {
  size: 'micro' | 'tiny' | 'small' | 'base' | 'huge',
  testId?: string,
  theme: Object,
}

const defaultProps = {
  size: 'base',
  theme: {},
}

const Heading = ({
  size, // eslint-disable-line no-unused-vars
  testId, // eslint-disable-line no-unused-vars
  theme,
  ...props,
}: PropsT) => (
  <View
    {...theme.heading}
    inline
  >
    <Text
      {...props}
    />
  </View>
)

Heading.defaultProps = defaultProps

const defaultTheme = ({
  size,
}: PropsT) => ({
  heading: {
    ...Fonts[size],
  },
})

export default Theme('Heading', defaultTheme)(Heading)
