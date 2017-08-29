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
          <Divider />
          <ListItem>Add Component</ListItem>
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
          bubbleKeyboardEvents
          data={items}
          enableKeyboardNavigation
          onSelect={action('Selected Index: ')}
          size="Base"
        />
      </Preview>
      <Preview label="Controlled navigation">
        <ListContainer />
      </Preview>
      <Preview label="Long">
        <List
          enableKeyboardNavigation
          enableMouseNavigation
          initialFocusedIndex={2}
          theme={{
            list: {
              maxHeight: 200,
            },
          }}
        >
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
          <ListItem>Item 4</ListItem>
          <ListItem>Item 5</ListItem>
          <ListItem>Item 6</ListItem>
          <ListItem>Item 7</ListItem>
          <ListItem>Item 8</ListItem>
          <ListItem>Item 9</ListItem>
          <ListItem>Item 10</ListItem>
        </List>
      </Preview>
    </PreviewContainer>
  ))

class ListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedIndex: 0,
    }
  }

  render() {
    return (
      <List
        bubbleKeyboardEvents
        data={items}
        enableKeyboardNavigation
        focusedIndex={this.state.focusedIndex}
        onSelect={action('Selected Index: ')}
        onFocus={focusedIndex => this.setState({ focusedIndex })}
        size="Base"
      />
    )
  }
}
