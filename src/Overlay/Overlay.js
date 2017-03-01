/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'
import {
  Colors,
} from '@workflo/styles'

type PropsT = {
  children: React$Element,
  theme: Object,
}

const defaultProps = {
  theme: {},
}

const Overlay = ({
  children,
  theme,
  ...restProps
}: PropsT) => (
  <View
    {...theme.overlay}
    {...restProps}
  >
    {children}
  </View>
)

const defaultTheme = {
  overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.9,
    color: 'white',
  },
}

Overlay.defaultProps = defaultProps

const ThemedOverlay = Theme('Overlay', defaultTheme)(Overlay)
export default ThemedOverlay
