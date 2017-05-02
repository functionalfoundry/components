import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Tooltip from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Tooltip', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Right" theme={{ content: styles.preview }}>
      <Tooltip position="Right" portal={<div>Portal here</div>}>
        Click Me
      </Tooltip>
    </Preview>
    <Preview label="Bottom" theme={{ content: styles.preview }}>
      <Tooltip position="Bottom" portal={<div>Portal here</div>}>
        Click Me
      </Tooltip>
    </Preview>
    <Preview label="Left" theme={{ content: styles.preview }}>
      <Tooltip position="Left" portal={<div>Portal here</div>}>
        Click Me
      </Tooltip>
    </Preview>
    <Preview label="Top" theme={{ content: styles.preview }}>
      <Tooltip position="Top" portal={<div>Portal here</div>}>
        Click Me
      </Tooltip>
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
