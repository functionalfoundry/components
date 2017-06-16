/* @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import Animations from '@workflo/styles/lib/Animations'

import View from '../../View'

type SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  /** If set to `true` will be styled to simulate keyboard focus */
  isKeyboardFocused?: boolean,
  /** If set to `true` will be styled to appear selected */
  isSelected?: boolean,
  onClick?: Function,
  size: SizeT,
  theme: Object,
}

const defaultProps = {
  size: 'Base',
}

const ListItem = ({
  children,
  isKeyboardFocused, // eslint-disable-line
  isSelected, // eslint-disable-line
  onClick,
  theme,
  ...props
}: PropsT) => (
  <View {...props} {...theme.listItem} onClick={onClick}>
    {children}
  </View>
)

ListItem.defaultProps = defaultProps

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

const getBaseListItem = (size: SizeT) => ({
  ...getFont(size),
  padding: Spacing.tiny,
})

const getListItem = ({ size, isSelected, isKeyboardFocused }) => {
  if (isSelected) {
    return {
      ...getBaseListItem(size),
      backgroundColor: Colors.grey300,
    }
  }
  if (isKeyboardFocused) {
    return {
      ...getBaseListItem(size),
      backgroundColor: Colors.grey200,
    }
  }
  return {
    ...getBaseListItem(size),
    ':hover': {
      backgroundColor: Colors.grey200,
    },
    transition: `background-color ${Animations.Timing.t2.animationDuration}s ${Animations.Eases.entrance.animationTimingFunction}`, // eslint-disable-line
  }
}

const defaultTheme = ({ size, isSelected, isKeyboardFocused }) => ({
  listItem: getListItem({ size, isSelected, isKeyboardFocused }),
})

const ThemedListItem = Theme('ListItem', defaultTheme)(ListItem)
ThemedListItem.isSelectable = true
export default ThemedListItem
