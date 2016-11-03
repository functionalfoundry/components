import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TextInput from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('TextInput', module)
  .add('Regular', () => (
    <div>
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
        <Preview
          label='Large'
        >
          <TextInput
            value='Find something'
            size='Large'
          />
        </Preview>
        <Preview
          label='Small'
        >
          <TextInput
            value='Find something'
            size='Small'
          />
        </Preview>
      </PreviewContainer>
      <PreviewContainer
        shade='light'
      >
        <Preview
          label='Regular'
        >
          <TextInput
            shade='Light'
          />
        </Preview>
        <Preview
          label='With value'
        >
          <TextInput
            value='Find something'
            shade='Light'
          />
        </Preview>
        <Preview
          label='Large'
        >
          <TextInput
            value='Find something'
            size='Large'
            shade='Light'
          />
        </Preview>
        <Preview
          label='Small'
        >
          <TextInput
            value='Find something'
            size='Small'
            shade='Light'
          />
        </Preview>
      </PreviewContainer>
    </div>
  ))
