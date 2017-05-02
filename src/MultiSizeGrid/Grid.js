/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Spacing } from '@workflo/styles'
import View from '../View'

type SizeT = 'Micro' | 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge'

type Props = {
  renderer: Function,
  size: SizeT,
  data: Array<any>,
  theme: Object,
}

// TODO: Replace top level Grid component

const Grid = ({ theme, size = 'Small', data = [], renderer, ...props }: Props) => {
  const Item = renderer

  return (
    <View {...props} {...theme.grid}>
      {data.map((datum, index) => (
        <View {...theme.item} key={`data-${index}`}>
          <Item {...datum} />
        </View>
      ))}
      {[...Array(10).keys()].map((placeholder, index) => (
        <View {...theme.item} key={`blank-${index}`} />
      ))}
    </View>
  )
}

const defaultTheme = ({ size, flush }: Props) => ({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: 0,
    // margin: -1 * Spacing.tiny,
  },
  item: {
    flex: `1 0 ${getWidth(size.horizontal)}`,
    height: getHeight(size.vertical), // TODO: Change
    // TODO: This margin is screwing up the last row since it has margin 0
    // Fix so that we don't have to put a margin on the renderer card itself
    // margin: Spacing.tiny,
    // margin: 0,
    ':empty': {
      height: 0,
      margin: 0,
      border: 'none',
    },
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    boxSizing: 'border-box',
  },
})

const getWidth = (size: string) => {
  switch (size) {
    case 'Small':
      return '33%'
    case 'Base':
      return '50%'
    case 'Large':
      return '100%'
    default:
      return '50%'
  }
}

const getHeight = (size: string) => {
  switch (size) {
    case 'Tiny':
      return '50px'
    case 'Small':
      return '100px'
    case 'Base':
      return '300px'
    case 'Large':
      return '600px'
    case 'Huge':
      return '1200px'
    default:
      return '300px'
  }
}

const ThemedGrid = Theme('Grid', defaultTheme)(Grid)
export default ThemedGrid
