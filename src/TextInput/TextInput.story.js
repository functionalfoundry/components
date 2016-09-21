import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TextInput from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('TextInput', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <TextInput />
      </Preview>
      <Preview
        label='With value'
      >
        <TextInput
          value='Find something'
        />
      </Preview>
    </PreviewContainer>
  ))
