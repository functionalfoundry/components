/* @flow */
import React from 'react'
import View from '../View'

type PropsT = {
  children?: React.Children,
  /** If set to `true` will be styled to simulate keyboard focus */
  isKeyboardFocused?: boolean,
  /** If set to `true` will be styled to appear selected */
  isSelected?: boolean,
  onClick?: Function,
  theme: Object,
}

const defaultProps = {
  size: 'Base',
}

// TODO Figure out a better way to merge themes in js-theme
const getTheme = ({ isKeyboardFocused, isSelected, theme }) => {
  if (isSelected) {
    return theme.selectedListItem
  }
  if (isKeyboardFocused) {
    return theme.focusedListItem
  }
  return theme.listItem
}

const ListItem = ({
  children,
  isKeyboardFocused,
  isSelected,
  onClick,
  theme,
  ...props
}: PropsT) => (
  <View
    {...props}
    {...getTheme({ isKeyboardFocused, isSelected, theme })}
    onClick={onClick}
  >
    {children}
  </View>
)

ListItem.defaultProps = defaultProps

export default ListItem
