import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Text from './Text'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Text', module)
  .add('Tiny', () => (
    <PreviewContainer
      shade='light'
    >
      <Preview
        label='Huge'
      >
        <Text
          size='huge'
        >
          {'Content Text'}
        </Text>
      </Preview>
      <Preview
        label='Large'
      >
        <Text
          size='large'
        >
          {'Content Text'}
        </Text>
      </Preview>
      <Preview
        label='Base'
      >
        <Text
          size='base'
        >
          {'Content Text'}
        </Text>
      </Preview>
      <Preview
        label='Small'
      >
        <Text
          size='small'
        >
          {'Content Text'}
        </Text>
      </Preview>
      <Preview
        label='Tiny'
      >
        <Text
          size='tiny'
        >
          {'Content Text'}
        </Text>
      </Preview>
    </PreviewContainer>
  ))
