/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Fonts,
} from '@workflo/styles'
import Text from '../Text'

type PropsT = {
  size: 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge',
  testId?: string,
  theme: Object,
}

const defaultProps = {
  size: 'Base',
  theme: {},
}

const Heading = ({
  size,
  testId, // eslint-disable-line no-unused-vars
  theme,
  ...props
}: PropsT) => (
  <Text
    {...theme.heading}
    {...props}
    size={size}
    element={elementMap[size]}
  />
)

Heading.defaultProps = defaultProps

const defaultTheme = ({
  size,
}: PropsT) => ({
  heading: {
    ...Fonts[size.toLowerCase()],
  },
})

const elementMap = {
  Tiny: 'h5',
  Small: 'h4',
  Base: 'h3',
  Large: 'h2',
  Huge: 'h1',
}

export default Theme('Heading', defaultTheme)(Heading)
