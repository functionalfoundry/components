import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Popover from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

const element = (
  <div style={{ color: 'white', border: '1px solid white' }}>
    {'I popped over'}
  </div>
)

storiesOf('Popover', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Popover
          action={['click']}
          pointer={element}
          pointerAlign={{
            points: ['cl', 'cr'],
            overflow: {
              adjustX: true,
              adjustY: true,
            },
            useCssTransform: true,
            useCssRight: false,
            useCssBottom: false,
          }}
        >
          <button>{'Popover'}</button>
        </Popover>
      </Preview>
    </PreviewContainer>
  ))
