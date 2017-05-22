import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TextEditor from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

const defaultText = `const foo = {
  bar: 'baz',
}

const bar = {
  baz: 'ruux',
}
`

class TextEditorContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialText: defaultText,
      state: null,
    }
  }

  handleChange = (text, state) => {
    action('onChange')(text, state)
    setTimeout(() => {
      this.setState({ state })
    }, 250)
  }

  handleClick = () => {
    this.setState({ state: null })
  }

  render() {
    return (
      <div>
        <TextEditor
          text={this.state.initialText}
          state={this.state.state}
          onChange={this.handleChange}
        />
        <div>
          <button onClick={this.handleClick}>Reset</button>
        </div>
      </div>
    )
  }
}

storiesOf('TextEditor', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="TextEditor">
      <TextEditorContainer />
    </Preview>
  </PreviewContainer>
))
