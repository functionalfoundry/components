/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Corners,
  Spacing,
  Shadows,
} from '@workflo/styles'
import View from '../View'
import ListItem from './ListItem'

const SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  data?: Array<any>,
  renderer: React.Component,
  size: SizeT,
  theme: Object,
}

const defaultProps = {
  data: [],
  renderer: ({ datum, size, children }) => (
    <ListItem size={size}>{datum}{children}</ListItem>
  ),
  size: 'base',
}

const List = ({
  children,
  theme,
  data,
  renderer,
  size,
  ...props,
}: PropsT) => {
  const Render = renderer
  return (
    <View
      {...props}
      {...theme.list}
    >
      {data.map((datum, index) => (
        <Render
          datum={datum}
          size={size}
          key={index}
        />
      ))}
      {children}
    </View>
  )
}

const defaultTheme = ({
}: PropsT) => ({
  list: {
    backgroundColor: 'white',
    color: Colors.grey900,
  },
})


List.defaultProps = defaultProps

const ThemedList = Theme('List', defaultTheme)(List)
export default ThemedList
