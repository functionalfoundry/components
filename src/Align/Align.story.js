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
  getNode = () => {
    return this._thing || window
  }
  render() {
    return (
      <div>
        <div
          ref={(thing) => this._thing = thing}
        >
          {'Something else'}
        </div>
        <Align
          align={{
            points: ['tl', 'cr'],
            offset: [0, 0],
            overflow: {
              adjustX: true,
              adjustY: true,
            },
            useCssTransform: true,
            useCssRight: false,
            useCssBottom: false,
          }}
          // target={this.getNode}
        >
          <div>Some content</div>
        </Align>
      </div>
    )
  }
}
