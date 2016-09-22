import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Portal from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Portal', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Portal />
      </Preview>
    </PreviewContainer>
  ))
