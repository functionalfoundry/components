/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import View from '../View'

type SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  size: SizeT,
  theme: Object,
}

const defaultProps = {
  size: 'Base',
}

/**
 *  TODO: Remove last borderBottom using not pseudo selector
 */

const ListItem = ({ children, theme, ...props }: PropsT) => (
  <View {...props} {...theme.listItem}>
    {children}
  </View>
)

const defaultTheme = ({ size }: PropsT) => ({
  listItem: {
    ...getFont(size),
    padding: Spacing.tiny,
    borderBottom: `1px solid ${Colors.grey300}`,
  },
})

const getFont = (size: SizeT) => {
  switch (size) {
    case 'Small':
      return Fonts.small
    case 'Large':
      return Fonts.large
    case 'Base':
    default:
      return Fonts.base
  }
}

ListItem.defaultProps = defaultProps

const ThemedListItem = Theme('ListItem', defaultTheme)(ListItem)
export default ThemedListItem
