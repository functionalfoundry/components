import React from 'react'
import { action, storiesOf } from '@kadira/storybook'
import Select from './Select'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Select', module)
  .add('Select', () => (
    <PreviewContainer shade="dark">
      <Preview label="Regular">
        <SelectContainer />
      </Preview>
    </PreviewContainer>
  ))

const items = [
  { id: 'apple', label: 'Apple' },
  { id: 'apricot', label: 'Apricot' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry' },
  { id: 'grapefruit', label: 'Grapefruit' },
  { id: 'kiwi', label: 'Kiwi' },
  { id: 'lemon', label: 'Lemon' },
  { id: 'orange', label: 'Orange' },
  { id: 'rhaspberry', label: 'Rhaspberry' },
  { id: 'strawberry', label: 'Strawberry' },
]

class SelectContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      value: 'Apple',
    }
  }

  handleChange = newValue => {
    console.log('on change called with: ', newValue)
    this.setState({
      value: newValue,
    })
  }

  render() {
    const { value } = this.state
    console.log('value is: ', value)
    return (
      <Select
        options={items}
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}
