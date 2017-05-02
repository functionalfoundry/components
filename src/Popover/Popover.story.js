import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Popover from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Popover', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Right" theme={{ content: styles.preview }}>
      <Popover
        position="Right"
        portal={<div>Portal here</div>}
        onClose={action('onClose')}
      >
        Click Me
      </Popover>
    </Preview>
    <Preview label="Bottom" theme={{ content: styles.preview }}>
      <Popover position="Bottom" portal={<div>Portal here</div>}>
        Click Me
      </Popover>
    </Preview>
    <Preview label="Left" theme={{ content: styles.preview }}>
      <Popover position="Left" portal={<div>Portal here</div>}>
        Click Me
      </Popover>
    </Preview>
    <Preview label="Top" theme={{ content: styles.preview }}>
      <Popover position="Top" portal={<div>Portal here</div>}>
        Click Me
      </Popover>
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
