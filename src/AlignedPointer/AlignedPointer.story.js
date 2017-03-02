import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AlignedPointer from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('AlignedPointer', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Right'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          position='Right'
          portal={<div>Portal here</div>}
          openTriggers={['Click inside']}
          closeTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
      <Preview
        label='Bottom'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          position='Bottom'
          portal={<div>Portal here</div>}
          openTriggers={['Click inside']}
          closeTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
      <Preview
        label='Left'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          position='Left'
          portal={<div>Portal here</div>}
          openTriggers={['Click inside']}
          closeTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
      <Preview
        label='Top'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          position='Top'
          portal={<div>Portal here</div>}
          openTriggers={['Click inside']}
          closeTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
    </PreviewContainer>
  ))

const commonStyle = {
  padding: 8,
  color: '#232323',
  fontFamily: 'sans-serif',
}

const styles = {
  target: {
    ...commonStyle,
    backgroundColor: 'cyan',
  },
  portal: {
    ...commonStyle,
    backgroundColor: 'purple',
    color: 'white',
    height: 40,
    fontSize: 12,
  },
  preview: {
    alignItems: 'center',
  },
}
