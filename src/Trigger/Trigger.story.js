import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Trigger from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Trigger', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Trigger />
      </Preview>
    </PreviewContainer>
  ))
