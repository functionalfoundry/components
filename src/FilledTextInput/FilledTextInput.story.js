import React from 'react'
import { storiesOf } from '@kadira/storybook'
import FilledTextInput from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'
import {
  Spacing,
} from '@workflo/styles'

storiesOf('FilledTextInput', module)
  .add('Regular', () => (
    <PreviewContainer shade="dark">
      <Preview label="Regular">
        <Container />
      </Preview>
    </PreviewContainer>
  ))

class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      width: '768',
      height: 400,
    }
  }

  handleChangeWidth = (width) => {
    this.setState({ width })
  }

  handleChangeHeight = (height) => {
    this.setState({ height })
  }

  render() {
    const { width, height } = this.state
    return (
      <div
        style={{ display: 'flex' }}
      >
        <div
          style={{ marginRight: Spacing.tiny, display: 'flex' }}
        >
          <FilledTextInput
            label='Width'
            onChange={this.handleChangeWidth}
            value={width}
            width={60}
          />
        </div>
        <div
          style={{ display: 'flex' }}
        >
          <FilledTextInput
            label='Height'
            onChange={this.handleChangeHeight}
            value={height}
            width={60}
          />
        </div>
      </div>
    )
  }
}
