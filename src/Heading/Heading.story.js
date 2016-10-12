import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Heading from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Heading', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Huge'
      >
        <Heading
          size='huge'
        >
          {'Heading text'}
        </Heading>
      </Preview>
      <Preview
        label='Large'
      >
        <Heading
          size='large'
        >
          {'Heading text'}
        </Heading>
      </Preview>
      <Preview
        label='Base'
      >
        <Heading
          size='base'
        >
          {'Heading text'}
        </Heading>
      </Preview>
      <Preview
        label='Small'
      >
        <Heading
          size='small'
        >
          {'Heading text'}
        </Heading>
      </Preview>
      <Preview
        label='Tiny'
      >
        <Heading
          size='tiny'
        >
          {'Heading text'}
        </Heading>
      </Preview>
    </PreviewContainer>
  ))
