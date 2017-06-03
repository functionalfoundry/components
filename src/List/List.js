/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import Animations from '@workflo/styles/lib/Animations'
import View from '../View'
import ListItem from './ListItem'

type SizeT = 'Small' | 'Base' | 'Large'

type PropsT = {
  children?: React.Children,
  data: Array<any>,
  onSelect: Function,
  selectedIndex?: number,
  renderer: ReactClass<*>,
  size: SizeT,
  theme: Object,
}

type RendererPropsT = {
  datum: any,
  isSelected: boolean,
  onClick: Function,
  size: SizeT,
  theme: Object,
}

const defaultProps = {
  data: [],
  renderer: ({ datum, isSelected, onClick, size, theme }: RendererPropsT) => (
    <ListItem isSelected={isSelected} onClick={onClick} size={size} theme={theme}>
      {datum}
    </ListItem>
  ),
  size: 'base',
}

const List = ({
  children,
  theme,
  data,
  onSelect,
  selectedIndex,
  renderer,
  size,
  ...props
}: PropsT) => {
  const Renderer = renderer
  return (
    <View {...props} {...theme.list}>
      {data.map((datum, index) => (
        <Renderer
          datum={datum}
          isSelected={index === selectedIndex}
          key={index}
          onClick={() => onSelect(index)}
          size={size}
          theme={theme}
        />
      ))}
      {children}
    </View>
  )
}

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

const defaultTheme = ({ size }) => ({
  list: {
    backgroundColor: 'white',
    color: Colors.grey900,
  },
  listItem: {
    ...getFont(size),
    padding: Spacing.tiny,
    ':hover': {
      backgroundColor: Colors.grey200,
    },
    transition: `background-color ${Animations.Timing.t2.animationDuration}s ${Animations.Eases.entrance.animationTimingFunction}`, // eslint-disable-line
  },
  selectedListItem: {
    ...getFont(size),
    backgroundColor: Colors.grey300,
    padding: Spacing.tiny,
  },
})

List.defaultProps = defaultProps

const ThemedList = Theme('List', defaultTheme)(List)
export default ThemedList
