import React from 'react'
import { storiesOf } from '@kadira/storybook'
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

  handleChange = (key, val) => {
    const propKeyValue = this.state.propKeyValues
      .find((propKeyValue) => propKeyValue.key === key)
    const index = this.state.propKeyValues.indexOf(propKeyValue)
    const newPropKeyValues = [...this.state.propKeyValues]
    newPropKeyValues[index].value = val
    this.setState({ propKeyValues: newPropKeyValues })
  }

  render() {
    return (
      <TextEditor
        componentName='Comment'
        propKeyValues={this.state.propKeyValues}
        onChange={this.handleChange}
      />
    )
  }
}
