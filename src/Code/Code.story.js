import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Code from './Code'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Code', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Code'
      >
        <StoryContainer />
      </Preview>
    </PreviewContainer>
  ))

class StoryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      propKeyValues: [
        {
          key: 'comment',
          type: 'variable',
          value: 'comment',
          options: [
            'comment',
            'description',
            'user',
          ],
        },
        {
          key: 'description',
          type: 'variable',
          value: 'description',
          options: [
            'comment',
            'description',
            'user',
          ],
        },
        {
          key: 'size',
          type: 'string',
          value: 'Base',
          options: [
            'Tiny',
            'Small',
            'Base',
            'Large',
            'Huge',
          ],
        },
        {
          key: 'likeCount',
          type: 'number',
          value: 21,
        },
      ]
    }
  }

  handleChange = (propKeyValues) => {
    this.setState({ propKeyValues })
  }

  render() {
    return (
      <Code
        componentName='Comment'
        propKeyValues={this.state.propKeyValues}
        onChange={this.handleChange}
      />
    )
  }
}
