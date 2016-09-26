import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Trigger2 from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Trigger2', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Trigger2 />
      </Preview>
    </PreviewContainer>
  ))
