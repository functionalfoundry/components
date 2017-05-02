/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors } from '@workflo/styles'
import View from '../View'

type ShadeT = 'light' | 'dark'

type PropsT = {
  color: string,
  children?: React.Children,
  flush: boolean,
  shade: ShadeT,
}

const defaultProps = {
  flush: false,
  shade: 'dark',
}
// HACK: For storybook
document.getElementsByTagName('body')[0].setAttribute('style', 'margin:0;')

const PreviewContainer = ({ children, color, flush, shade, theme }: PropsT) => (
  <View {...theme.previewContainer}>
    {/*
    <Heading size={'large'}>
      {'Hello'}
    </Heading> */}
    <View {...theme.children}>
      {children}
    </View>
  </View>
)

const defaultTheme = ({ color, flush, shade }) => ({
  previewContainer: {
    ...containerStyle(color, flush, shade),
    flex: '1 1 auto',
  },
  children: {
    display: 'flex',
    flex: 1,
  },
})

const containerStyle = (color: string, flush: boolean, shade: ShadeT) => ({
  ...getColorStyle(color, shade),
  ...getFlushStyle(flush),
})

const getColorStyle = (color: string, shade: ShadeT) => {
  if (color) return { backgroundColor: color }
  switch (shade) {
    case 'light':
      return {
        backgroundColor: Colors.grey50,
      }
    case 'dark':
      return {
        backgroundColor: Colors.grey900,
        // THINK: Is setting color on the PreviewContainer too big of a side effect?
        color: Colors.grey100,
      }
    default:
      return {}
  }
}

const getFlushStyle = (flush: boolean) => {
  if (flush) {
    return {}
  }
  return {
    padding: 20,
  }
}

PreviewContainer.defaultProps = defaultProps
const ThemedPreviewContainer = Theme('PreviewContainer', defaultTheme)(PreviewContainer)
export default ThemedPreviewContainer
