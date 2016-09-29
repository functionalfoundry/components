import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AlignedPointer from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('AlignedPointer', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <AlignedPointer />
      </Preview>
    </PreviewContainer>
  ))
