/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'

type SizeT = 'small' | 'base' | 'large'

type Props = {
  renderer: Function,
  onClickItem: Function,
  size: SizeT,
  flush: boolean,
  data: Array<any>,
  theme: Object,
}

const Grid = ({
  theme,
  size = 'base',
  flush = false,
  data = [],
  renderer,
  onClickItem = () => {},
  ...props,
}: Props) => {
  const Item = renderer

  return (
    <View
      {...props}
      {...theme.grid}
    >
      {data.map((datum, index) => (
        <View
          {...theme.item}
          key={index}
          onClick={() => onClickItem(datum)}
        >
          {/* Hack because className and style don't get merged */}
          <Item
            {...datum}
          />
        </View>
      ))}
      {([...Array(10).keys()]).map((placeholder, index) => (
        <View
          {...theme.item}
          key={index}
        />
      ))}
    </View>
  )
}

const defaultTheme = ({
  size,
  flush
}: Props) => ({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: 0,
  },
  item: {
    flex: `1 0 ${dimensions(size)}px`,
    height: dimensions(size),
    // TODO: This margin is screwing up the last row since it has margin 0
    // Fix so that we don't have to put a margin on the renderer card itself
    // margin: Spacing.base,
    margin: 0,
    ':empty': {
      height: 0,
      border: 'none',
    },
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    boxSizing: 'border-box',
  },
})

const dimensions = (size: string) => {
  switch (size) {
    case 'small':
      return 200
    case 'base':
      return 320
    case 'large':
      return 400
    default:
      return 320
  }
}

export default Theme('Grid', defaultTheme)(Grid)
