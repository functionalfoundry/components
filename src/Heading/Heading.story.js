import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Heading from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Heading', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Huge">
      <Heading size="Huge">
        {'Heading text'}
      </Heading>
    </Preview>
    <Preview label="Large">
      <Heading size="Large">
        {'Heading text'}
      </Heading>
    </Preview>
    <Preview label="Base">
      <Heading size="Base">
        {'Heading text'}
      </Heading>
    </Preview>
    <Preview label="Small">
      <Heading size="Small">
        {'Heading text'}
      </Heading>
    </Preview>
    <Preview label="Tiny">
      <Heading size="Tiny">
        {'Heading text'}
      </Heading>
    </Preview>
    <EditableStory />
  </PreviewContainer>
))

class EditableStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
  }

  render() {
    return (
      <Preview label="Large Editable">
        <Heading
          size="Large"
          onPress={() => this.setState({ isEditing: !this.state.isEditing })}
          isEditing={this.state.isEditing}
        >
          {'Heading text'}
        </Heading>
      </Preview>
    )
  }
}
