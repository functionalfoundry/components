import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '../Preview'
import PreviewContainer from '../PreviewContainer'
import Search from './Search'
import Grid from '../Grid'

storiesOf('Search', module).add('Regular', () => (
  <PreviewContainer>
    <Preview label="Regular">
      <SearchContainer />
    </Preview>
  </PreviewContainer>
))

const data = [
  { name: 'Button' },
  { name: 'Checkbox' },
  { name: 'Grid' },
  { name: 'Icon' },
  { name: 'Overlay' },
]

const renderer = ({ name }) => (
  <div style={{ backgroundColor: 'white', flex: 1, color: 'black' }}>
    {name}
  </div>
)

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }

  render() {
    const lowerCaseSearch = (this.state.text || '').toLowerCase()
    return (
      <Search show onSearch={text => this.setState({ text })} text={this.state.text}>
        <Grid
          size="medium"
          data={data.filter(
            item => item.name.toLowerCase().indexOf(lowerCaseSearch) > -1
          )}
          renderer={renderer}
          onClickItem={action('clicked item')}
        />
      </Search>
    )
  }
}
