import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '../Preview'
import PreviewContainer from '../PreviewContainer'
import Search from './Search'

storiesOf('Search', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <SearchContainer />
      </Preview>
    </PreviewContainer>
  ))

class SearchContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: null,
    }
  }

  render () {
    return (
      <Search
        show
        onSearch={(text) => this.setState({ text })}
        text={this.state.text}
      />
    )
  }
}
