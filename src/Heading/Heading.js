/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Fonts,
} from '@workflo/styles'
import Text from '../Text'

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
  <Text
    {...theme.heading}
    {...props}
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

export default Theme('Heading', defaultTheme)(Heading)
