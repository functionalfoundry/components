import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Trigger from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

const element = (
  <div style={{ color: 'white', border: '1px solid white' }}>
    {'I popped over'}
  </div>
)

storiesOf('Trigger', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Trigger
          action={['click']}
          popup={element}
          popupAlign={{
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
          <button>{'Trigger'}</button>
        </Trigger>
      </Preview>
    </PreviewContainer>
  ))
