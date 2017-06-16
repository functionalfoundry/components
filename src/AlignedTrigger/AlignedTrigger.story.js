import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AlignedTrigger from '.'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'
import Button from '../Button'

storiesOf('AlignedTrigger', module)
  .add('Regular', () => (
    <PreviewContainer shade="dark">
      <Preview label="Regular">
        <AlignedTrigger
          portal={portal}
          position="Right"
          openTriggers={['Click inside']}
          closeTriggers={['Click outside']}
        >
          {'Click Me'}
        </AlignedTrigger>
      </Preview>
      <Preview label="Hover and mouse leave">
        <AlignedTrigger
          portal={portal}
          position="Bottom Right"
          gravity="Corner"
          openTriggers={['Mouse enter']}
          closeTriggers={['Mouse leave']}
        >
          {'Hover on Me'}
        </AlignedTrigger>
      </Preview>
      <Preview label="Hover and mouse leave and click inside">
        <AlignedTrigger
          portal={portal}
          position="Bottom"
          openTriggers={['Mouse enter']}
          closeTriggers={['Mouse leave', 'Click inside']}
        >
          {'Hover on Me'}
        </AlignedTrigger>
      </Preview>
    </PreviewContainer>
  ))
  .add('targetRef', () => <AlignedTriggerWithTargetRef />)
  .add('Render Callback', () => (
    <PreviewContainer>
      <Preview label="Render Callback">
        <AlignedTrigger
          closeTriggers={['Click outside']}
          openTriggers={['Click inside']}
          portal={({ close }) => <Button onClick={close}>Close Portal</Button>}
          position="Right"
        >
          {'Click on Me'}
        </AlignedTrigger>
      </Preview>
    </PreviewContainer>
  ))

class AlignedTriggerWithTargetRef extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetRef: null,
    }
  }
  saveRefToTarget = targetRef => this.setState({ targetRef })
  render() {
    return (
      <PreviewContainer shade="dark">
        <Preview label="Hover and mouse leave and click inside">
          <div style={{ width: 50 }} ref={this.saveRefToTarget}>
            {'Hover on Me'}
          </div>
          <AlignedTrigger
            closeTriggers={['Mouse leave', 'Click inside']}
            openTriggers={['Mouse enter']}
            portal={portal}
            position="Bottom"
            targetRef={this.state.targetRef}
          />
        </Preview>
      </PreviewContainer>
    )
  }
}

const portal = (
  <div style={{ color: 'white', backgroundColor: 'purple', padding: 10 }}>
    Portal Here
  </div>
)
