import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TextInput from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('TextInput', module)
  .add('Regular', () => (
    <div>
      <PreviewContainer
        shade='dark'
      >
        <Preview
          label='Interactive with label'
        >
          <Container />
        </Preview>
        <Preview
          label='Interactive with label and existing value'
        >
          <Container value={'Initial value'}/>
        </Preview>
        <Preview
          label='Interactive with label and delayed value'
        >
          <Container value={'Initial value'} delayValue />
        </Preview>
        <Preview
          label='Regular'
        >
          <TextInput />
        </Preview>
        <Preview
          label='With value'
        >
          <TextInput
            value='Find something'
          />
        </Preview>
        <Preview
          label='Large'
        >
          <TextInput
            value='Find something'
            size='Large'
          />
        </Preview>
        <Preview
          label='Small'
        >
          <TextInput
            value='Find something'
            size='Small'
          />
        </Preview>
      </PreviewContainer>
      <PreviewContainer
        shade='light'
      >
        <Preview
          label='Regular'
        >
          <TextInput
            shade='Light'
          />
        </Preview>
        <Preview
          label='With value'
        >
          <TextInput
            value='Find something'
            shade='Light'
          />
        </Preview>
        <Preview
          label='Large'
        >
          <TextInput
            value='Find something'
            size='Large'
            shade='Light'
          />
        </Preview>
        <Preview
          label='Small'
        >
          <TextInput
            value='Find something'
            size='Small'
            shade='Light'
          />
        </Preview>
      </PreviewContainer>
    </div>
  ))

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: (!props.delayValue && props.value) || '',
    }
  }

  componentDidMount() {
    const { delayValue, value } = this.props
    if (delayValue) {
      setTimeout(() => {
        this.setState({ value })
      }, 500)
    }
  }

  handleChange = (value) => {
    this.setState({ value })
  }

  render() {
    return (
      <TextInput
        label='Add text here'
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}
