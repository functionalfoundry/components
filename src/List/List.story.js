import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import List from './List'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('List', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Default">
      <List
        onSelect={index => action('onSelect')(index)}
        selectedIndex={2}
        data={items}
      />
    </Preview>
    <Preview label="Small">
      <List data={items} size="Small" />
    </Preview>
    <Preview label="Base">
      <List data={items} size="Base" />
    </Preview>
    <Preview label="Large">
      <List data={items} size="Large" />
    </Preview>
  </PreviewContainer>
))

const items = ['List', 'ListItem', 'Radio', 'RadioGroup']
