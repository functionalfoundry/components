import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {{WorkfloComponent}} from '.'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'

storiesOf('{{WorkfloComponent}}', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <{{WorkfloComponent}} />
      </Preview>
    </PreviewContainer>
  ))
