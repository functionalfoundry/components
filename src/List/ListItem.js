/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import View from '../View'

const SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  datum?: any,
  size: SizeT,
  theme: Object,
}

const defaultProps = {
  datum: '',
  size: 'base',
}

/**
 *  TODO: Remove last borderBottom using not pseudo selector
 */

const ListItem = ({
  children,
  theme,
  ...props,
}: PropsT) => (
  <View
    {...props}
    {...theme.listItem}
  >
    {children}
  </View>
)

const defaultTheme = ({
  size,
}: PropsT) => ({
  listItem: {
    ...getPadding(size),
    ...Fonts.small,
    borderBottom: `1px solid ${Colors.grey300}`
  },
})

const getPadding = (size: SizeT) => {
  return {
    padding: Spacing.tiny,
  }
}

ListItem.defaultProps = defaultProps

const ThemedListItem = Theme('ListItem', defaultTheme)(ListItem)
export default ThemedListItem
