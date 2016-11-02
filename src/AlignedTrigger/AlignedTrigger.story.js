import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AlignedTrigger from '.'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'

storiesOf('AlignedTrigger', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <AlignedTrigger
          portal={portal}
          portalVertical='Top'
          portalHorizontal='Left'
          targetVertical='Bottom'
          targetHorizontal='Right'
          targetTriggers={['Click inside']}
          portalTriggers={['Click outside']}
        >
          {'Click Me'}
        </AlignedTrigger>
      </Preview>
      <Preview
        label='Hover and mouse leave'
      >
        <AlignedTrigger
          portal={portal}
          portalVertical='Center'
          portalHorizontal='Left'
          targetVertical='Center'
          targetHorizontal='Right'
          targetTriggers={['Hover']}
          portalTriggers={['Mouse leave']}
        >
          {'Hover on Me'}
        </AlignedTrigger>
      </Preview>
      <Preview
        label='Hover and mouse leave and click inside'
      >
        <AlignedTrigger
          portal={portal}
          portalVertical='Center'
          portalHorizontal='Left'
          targetVertical='Center'
          targetHorizontal='Right'
          targetTriggers={['Hover']}
          portalTriggers={['Mouse leave', 'Click inside']}
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
