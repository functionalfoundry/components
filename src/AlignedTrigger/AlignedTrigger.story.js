import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AlignedTrigger from '.'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'

storiesOf('AlignedTrigger', module).add('Regular', () => (
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
        {'Hover on Me'}i
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

const portal = (
  <div style={{ color: 'white', backgroundColor: 'purple', padding: 10 }}>
    Portal Here
  </div>
)
