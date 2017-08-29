/* @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import Animations from '@workflo/styles/lib/Animations'

import View from '../../View'

type SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  /** If set to `true` will be styled to indicate focus */
  isFocused?: boolean,
  /** If set to `true` will be styled to appear selected */
  isSelected?: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  size: SizeT,
  /** A ref callback that wont be stolen by HOCs */
  storeRef: Function,
  theme: Object,
}

const defaultProps = {
  size: 'Base',
}

const ListItem = ({
  children,
  isFocused, // eslint-disable-line
  isSelected, // eslint-disable-line
  onClick,
  onMouseEnter,
  theme,
  storeRef,
  ...props
}: PropsT) => (
  <View
    {...props}
    {...theme.listItem}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    ref={storeRef}
  >
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

const getListItem = ({ size, isSelected, isFocused }) => {
  if (isSelected) {
    return {
      ...getBaseListItem(size),
      backgroundColor: Colors.grey300,
    }
  }
  if (isFocused) {
    return {
      ...getBaseListItem(size),
      backgroundColor: Colors.grey200,
    }
  }
  return {
    ...getBaseListItem(size),
    transition: `background-color ${Animations.Timing.t2.animationDuration}s ${Animations.Eases.entrance.animationTimingFunction}`, // eslint-disable-line
  }
}

const defaultTheme = ({ size, isSelected, isFocused }) => ({
  listItem: getListItem({ size, isSelected, isFocused }),
})

const ThemedListItem = Theme('ListItem', defaultTheme)(ListItem)
ThemedListItem.isFocusable = true
export default ThemedListItem
