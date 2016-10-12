import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Trigger from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Trigger', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Trigger
          triggerOn={['mouseenter']}
          onTrigger={() => console.log('onTrigger')}
        >
          <button>
            Trigger
          </button>
        </Trigger>
      </Preview>
    </PreviewContainer>
  ))
