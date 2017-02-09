import React from 'react'
import { storiesOf } from '@kadira/storybook'
import List from './List'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('List', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <List
          data={items}
        />
      </Preview>
    </PreviewContainer>
  ))

const items = ['List', 'ListItem', 'Radio', 'RadioGroup']
