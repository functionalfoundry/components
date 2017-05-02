/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Corners, Spacing, Shadows } from '@workflo/styles'
import View from '../View'

type PropsT = {
  children?: React.Children,
  size: string,
  testId?: string,
  theme: Object,
  flush: boolean,
  floating: boolean,
}

const defaultProps = {
  size: 'base',
  theme: {},
  flush: false,
  floating: false,
}

const Card = ({
  children,
  theme,
  flush, // eslint-disable-line no-unused-vars
  floating, // eslint-disable-line no-unused-vars
  testId, // eslint-disable-line no-unused-vars
  ...props
}: PropsT) => (
  <View {...props} {...theme.card}>
    {children}
  </View>
)

Card.defaultProps = defaultProps

const getFloating = ({ floating }: PropsT) => {
  if (floating) {
    return Shadows.base
  }
  return {}
}

const getSize = ({ size }: PropsT) => {
  switch (size) {
    case 'tiny':
      return {
        width: 100,
        height: 60,
      }
    case 'small':
      return {
        width: 200,
        height: 180,
      }
    case 'base':
      return {
        width: 280,
        height: 240,
      }
    case 'large':
      return {
        width: 320,
        height: 260,
      }
    case 'huge':
      return {
        width: 400,
        height: 400,
      }
    default:
      return {}
  }
}

const defaultTheme = (props: PropsT) => ({
  card: {
    ...Corners.rounded,
    ...getSize(props),
    ...getFloating(props),
    ...getPadding(props.flush),
    backgroundColor: 'white',
  },
})

const getPadding = (flush: boolean) => {
  if (flush) {
    return {
      padding: 0,
    }
  }
  return {
    padding: Spacing.small,
  }
}

const ThemedCard = Theme('Card', defaultTheme)(Card)
export default ThemedCard
