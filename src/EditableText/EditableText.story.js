import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '../Preview'
import PreviewContainer from '../PreviewContainer'
import EditableText from './EditableText'

storiesOf('EditableText', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <EditableTextContainer />
        <EditableText
          size='Large'
          isEditing={true}
        >
          Hello
        </EditableText>
      </Preview>
    </PreviewContainer>
  ))

class EditableTextContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      text: 'Hello',
    }
  }

  render() {
    return (
      <EditableText
        size='Large'
        isEditing={this.state.isEditing}
        onStartEdit={() => this.setState({ isEditing: true })}
        onStopEdit={() => this.setState({ isEditing: false })}
        onChange={(text) => this.setState({ text })}
      >
        {this.state.text}
      </EditableText>
    )
  }
}
