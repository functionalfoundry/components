import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Theme from 'js-theme'
import Preview from '../Preview'
import PreviewContainer from '../PreviewContainer'
import View from '../View'
import EditableText from './EditableText'

class EditingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialValue: 'Edit Me',
      isEditing: false,
    }
  }

  render() {
    return (
      <EditableText
        {...this.props}
        value={this.state.initialValue}
        isEditing={this.state.isEditing}
        onChange={this.handleChange.bind(this)}
        onStartEdit={this.handleStartEdit.bind(this)}
        onStopEdit={this.handleStopEdit.bind(this)}
        onBlur={action('onBlur')}
      />
    )
  }

  handleChange(newValue) {
    action('onChange').call(null, newValue)
    this.setState({ value: newValue })
  }

  handleStartEdit() {
    action('onStartEdit').call()
    this.setState({ isEditing: true })
  }

  handleStopEdit() {
    action('onStopEdit').call()
    this.setState({ isEditing: false })
  }
}

const EditableTextContainer = ({ theme, ...props }) => (
  <View {...theme.editableText}>
    <EditableText {...props} />
  </View>
)

const defaultTheme = {
  editableText: {
    color: 'green',
  },
}

const ThemedEditableTextContainer = Theme('EditableTextContainer', defaultTheme)(
  EditableTextContainer
)

storiesOf('EditableText', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview label="Tiny">
        <EditableText
          size="Tiny"
          value="Edit Me"
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
        />
      </Preview>
      <Preview label="Small">
        <EditableText
          size="Small"
          value="Edit Me"
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
        />
      </Preview>
      <Preview label="Base">
        <EditableText
          size="Base"
          value="Edit Me"
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
        />
      </Preview>
      <Preview label="Large">
        <EditableText
          size="Large"
          value="Edit Me"
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
        />
      </Preview>
      <Preview label="Huge">
        <EditableText
          size="Huge"
          value="Edit Me"
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('Editing', () => (
    <PreviewContainer>
      <Preview label="Tiny">
        <EditingContainer size="Tiny" />
      </Preview>
      <Preview label="Small">
        <EditingContainer size="Small" />
      </Preview>
      <Preview label="Base">
        <EditingContainer size="Base" />
      </Preview>
      <Preview label="Large">
        <EditingContainer size="Large" />
      </Preview>
      <Preview label="Huge">
        <EditingContainer size="Huge" />
      </Preview>
    </PreviewContainer>
  ))
  .add('Read-only', () => (
    <PreviewContainer>
      <EditableText
        readOnly
        value="Edit Me"
        onChange={action('onChange')}
        onStartEdit={action('onStartEdit')}
        onStopEdit={action('onStopEdit')}
      />
    </PreviewContainer>
  ))
  .add('Multiple lines', () => (
    <PreviewContainer>
      <Preview label="Multiple lines">
        <EditableText
          multipleLines
          value="Try pressing return in here"
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('Themed', () => (
    <PreviewContainer>
      <Preview label="Themed">
        <ThemedEditableTextContainer
          multipleLines
          value="I should be green"
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('With errors', () => (
    <PreviewContainer>
      <Preview label="Regular">
        <EditableText
          isValid={false}
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
          value="I have an error"
        />
      </Preview>
      <Preview label="Large">
        <EditableText
          isValid={false}
          onChange={action('onChange')}
          onStartEdit={action('onStartEdit')}
          onStopEdit={action('onStopEdit')}
          size="Large"
          value="I have an error"
        />
      </Preview>
    </PreviewContainer>
  ))
