import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import List, { Divider, ListItem } from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

const items = ['List', 'ListItem', 'Radio', 'RadioGroup']

storiesOf('List', module)
  .add('Basic', () => (
    <PreviewContainer shade="dark">
      <Preview label="Default">
        <List>
          <ListItem>Animation</ListItem>
          <ListItem>Button</ListItem>
          <ListItem>Card</ListItem>
          <Divider />
          <ListItem>Add Component</ListItem>
        </List>
      </Preview>
      <Preview label="Keyboard focus">
        <List isKeyboardFocused>
          <ListItem>Animation</ListItem>
          <ListItem>Button</ListItem>
          <ListItem>Card</ListItem>
        </List>
      </Preview>
      <Preview label="Selected">
        <List>
          <ListItem>Animation</ListItem>
          <ListItem isSelected>Button</ListItem>
          <ListItem>Card</ListItem>
        </List>
      </Preview>
    </PreviewContainer>
  ))
  .add('With data prop', () => (
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
  .add('Keyboard Navigation', () => (
    <PreviewContainer>
      <Preview label="Base">
        <List
          data={items}
          isKeyboardFocused
          onSelect={action('Selected Index: ')}
          size="Base"
        />
      </Preview>
    </PreviewContainer>
  ))
