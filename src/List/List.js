/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Colors } from '@workflo/styles'
import View from '../View'
import ListItem from './ListItem'

type SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  data: Array<any>,
  renderer: React.Component<RendererPropsT, any>,
  size: SizeT,
  theme: Object,
}

type RendererPropsT = {
  datum: any,
  size: SizeT,
  children: React.Children,
}

const defaultProps = {
  data: [],
  renderer: ({ datum, size, children }: RendererPropsT) => (
    <ListItem size={size}>{datum}{children}</ListItem>
  ),
  size: 'base',
}

const List = ({ children, theme, data, renderer, size, ...props }: PropsT) => {
  const Renderer = renderer
  return (
    <View {...props} {...theme.list}>
      {data.map((datum, index) => <Renderer datum={datum} size={size} key={index} />)}
      {children}
    </View>
  )
}

const defaultTheme = {
  list: {
    backgroundColor: 'white',
    color: Colors.grey900,
  },
}

List.defaultProps = defaultProps

const ThemedList = Theme('List', defaultTheme)(List)
export default ThemedList
