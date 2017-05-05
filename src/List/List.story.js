import React from 'react'
import { storiesOf } from '@kadira/storybook'
import List from './List'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('List', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Default">
      <List data={items} />
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
