/* @flow */
import React from 'react'
import {
  Colors,
} from '@workflo/styles'
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

const Preview = ({
  children,
  color,
  flush,
  shade,
}: PropsT) => (
  <View
    theme={{
      view: containerStyle(color, flush, shade),
    }}
  >
    {children}
  </View>
)

const containerStyle = (color: string, flush: boolean, shade: ShadeT) => ({
  height: '1000px',
  ...getColorStyle(color, shade),
  ...getFlushStyle(flush),
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
})

const getColorStyle = (color: string, shade: ShadeT) => {
  if (color) return { backgroundColor: color }
  switch (shade) {
    case 'light':
      return {
        backgroundColor: Colors.grey200,
      }
    case 'dark':
      return {
        backgroundColor: Colors.grey900,
        // THINK: Is setting color on the Preview too big of a side effect?
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

Preview.defaultProps = defaultProps
export default Preview
