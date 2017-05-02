import React from 'react'
import { storiesOf } from '@kadira/storybook'
import IconButtonGroup from './IconButtonGroup'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('IconButtonGroup', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Alignment">
      <Container
        icons={[
          {
            name: 'align-left',
            hint: 'Left',
          },
          {
            name: 'align-center',
            hint: 'Center',
          },
          {
            name: 'align-right',
            hint: 'Right',
          },
        ]}
      />
    </Preview>
    <Preview label="Size">
      <Container
        icons={[
          {
            name: 'size-small',
            hint: 'Left',
          },
          {
            name: 'size-base',
            hint: 'Center',
          },
          {
            name: 'size-large',
            hint: 'Right',
          },
        ]}
      />
    </Preview>
  </PreviewContainer>
))

class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIconName: 'align-right',
    }
  }

  handleChange = selectedIconName => this.setState({ selectedIconName })

  render() {
    return (
      <IconButtonGroup
        onChange={this.handleChange}
        icons={this.props.icons}
        selectedIconName={this.state.selectedIconName}
      />
    )
  }
}
