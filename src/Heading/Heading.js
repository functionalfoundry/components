/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Fonts,
} from '@workflo/styles'
import Text from '../Text'

type PropsT = {
  size: 'tiny' | 'small' | 'base' | 'large' | 'huge',
  testId?: string,
  theme: Object,
}

const defaultProps = {
  size: 'base',
  theme: {},
}

const Heading = ({
  size,
  testId, // eslint-disable-line no-unused-vars
  theme,
  ...props,
}: PropsT) => (
  <Text
    {...theme.heading}
    {...props}
    element={elementMap[size]}
  />
)

Heading.defaultProps = defaultProps

const defaultTheme = ({
  size,
}: PropsT) => ({
  heading: {
    ...Fonts[size],
  },
})

const elementMap = {
  tiny: 'h5',
  small: 'h4',
  base: 'h3',
  large: 'h2',
  huge: 'h1',
}

export default Theme('Heading', defaultTheme)(Heading)
