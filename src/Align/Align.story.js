import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf } from '@kadira/storybook'
import Align from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Align', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <AlignWrapper />
      </Preview>
    </PreviewContainer>
  ))

class AlignWrapper extends React.Component {

  render() {
    return (
      <div>
        <Align
          align={{
            points: ['tl', 'br'],
            offset: [0, 0],
            overflow: {
              adjustX: true,
              adjustY: true,
            },
            useCssTransform: true,
            useCssRight: false,
            useCssBottom: false,
          }}
          portal={<div>Tooltip</div>}
          // target={this.getNode}
        >
          <div>Some content</div>
        </Align>
      </div>
    )
  }
}
