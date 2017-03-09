/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'
import Grid from './Grid'
const memoize = require('memoizee')

type SizeT = 'Micro' | 'Tiny' | 'Small' | 'Base' | 'Large'

type DescriptorT = {
  id: string,
  size: {
    horizontal: SizeT,
    vertical: SizeT,
  },
  isSelected: boolean,
}

type DataT = {
  value: any,
  descriptor: DescriptorT,
}

type PropsT = {
  renderer: Function,
  onChangeDatum: Function,
  data: Array<DataT>,
  theme: Object,
}

const MultiSizeGrid = ({
  theme,
  data = [],
  renderer,
  onChangeDatum,
  ...props
}: PropsT) => {
  const Item = renderer

  return (
    <View
      {...props}
      {...theme.multiSizeGrid}
    >
      {getGridForSize(data, renderer, onChangeDatum, theme, { horizontal: 'Small' })}
      {getGridForSize(data, renderer, onChangeDatum, theme, { horizontal: 'Base' })}
      {getGridForSize(data, renderer, onChangeDatum, theme, { horizontal: 'Large' })}
    </View>
  )
}

const getUpdatedData = (data, datum) => {
  const newData = [ ...data ]
  for (let i = 0; i < data.length; i++) {
    if (data[i] === datum) {
      newData[i] = datum
      console.log('newData: ', newData)
      return newData
    } else {
      return data
    }
  }
}

const transformedRenderer = (theme, Item) => {
  const MultiSizeGridItemRenderer = (datum) => (
    <View
      {...theme.multiSizeGridItem}
      key={datum.descriptor.id}
    >
      <Item {...datum.value} />
    </View>
  )
  return MultiSizeGridItemRenderer
}

const memoizedTransformedRenderer = memoize(transformedRenderer)

const getGridForSize = (data, renderer, onChangeDatum, theme, size) => {

  const transformedData = data
    .filter((datum) => datum.descriptor.size.horizontal === size.horizontal)

  if (transformedData.length < 1) return null
  // onDragEnter={() => onChange(getUpdatedData(data, datum))}

  // NOTE: This is using the interal Grid implementation of MultiSizeGrid,
  // not the top-level public Grid component
  return (
    <Grid
      data={transformedData}
      renderer={memoizedTransformedRenderer(theme, renderer)}
      size={size}
    />
  )
}

const defaultTheme = ({
  size,
  flush
}: PropsT) => ({
  multiSizeGrid: {
    display: 'flex',
    flexDirection: 'column',
  },
  multiSizeGridItem: {
    position: 'relative',
    display: 'flex',
    flex: 1,
  },
})

const ThemedMultiSizeGrid = Theme('MultiSizeGrid', defaultTheme)(MultiSizeGrid)
export default ThemedMultiSizeGrid
