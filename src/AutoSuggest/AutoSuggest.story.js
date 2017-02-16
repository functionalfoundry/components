import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ItemsList from './ItemsList'
import Item from './Item'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('AutoSuggest', module)
  .add('Item', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Item'
      >
        <Item
          item={{ name: 'Apple' }}
          renderItem={({ name }) => name}
          renderItemData={{}}
          itemIndex={0}
        />
        <Item
          item={{ name: 'Orange' }}
          renderItem={({ name }) => name}
          renderItemData={{}}
          itemIndex={1}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('ItemsList', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Item'
      >
        <ItemsList
          items={[{ name: 'Apple' }, { name: 'Orange' }]}
          renderItem={({ name }) => name}
          renderItemData={{}}
          getItemId={(sectionIndex, itemIndex) => itemIndex}
          onFocusedItemChange={() => {}}
          focusedItemIndex={1}
        />
      </Preview>
    </PreviewContainer>
  ))
