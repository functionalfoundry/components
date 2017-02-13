import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Item from './Item'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('AutoSuggest', module)
  .add('Regular', () => (
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
