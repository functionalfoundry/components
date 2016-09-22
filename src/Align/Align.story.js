import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Align from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Align', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Align />
      </Preview>
    </PreviewContainer>
  ))
