/* @flow */
import React from 'react'
import View from '../View'

type SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  isSelected: boolean,
  onClick: Function,
  size: SizeT,
  theme: Object,
}

const defaultProps = {
  size: 'Base',
}

/**
 *  TODO: Remove last borderBottom using not pseudo selector
 */

const ListItem = ({ children, isSelected, onClick, theme, ...props }: PropsT) => (
  <View
    {...props}
    {...(isSelected ? theme.selectedListItem : theme.listItem)}
    onClick={onClick}
  >
    {children}
  </View>
)

ListItem.defaultProps = defaultProps

export default ListItem
