/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'

type PropsT = {
  alt: string,
  testId?: string,
  theme: Object,
}

const defaultProps = {
  theme: {},
}

const Image = ({
  alt,
  testId, // eslint-disable-line no-unused-vars
  theme,
  ...props,
}: PropsT) => (
  <img
    alt={alt}
    {...mergeProps(theme.image, props)}
  />
)

Image.defaultProps = defaultProps

const defaultTheme = {
  image: {
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    minHeight: 0,
    minWidth: 0,
  },
}

export default Theme('Image', defaultTheme)(Image)
