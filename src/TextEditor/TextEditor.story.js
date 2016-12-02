import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TextEditor from '.'
// import DataEditor from './DataEditor'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('TextEditor', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='TextEditor'
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

  render() {
    return (
      <TextEditor
        componentName='Comment'
        text='Hello'
        onChange={action('onChange')}
      />
    )
  }
}
