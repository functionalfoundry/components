import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Portal from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Portal', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <PortalWrapper />
      </Preview>
    </PreviewContainer>
  ))

class PortalWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          Toggle
        </button>
        <Portal
          isOpened={this.state.isOpen}
          theme={{
            portal: {
              color: 'white',
              position: 'absolute',
              top: 0,
              right: 0,
            },
          }}
        >
          <div>Portal thing exists</div>
        </Portal>
      </div>
    )
  }
}
