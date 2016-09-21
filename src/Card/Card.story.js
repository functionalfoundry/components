import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Card from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Card', module)
  .add('Sizes', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Tiny'
      >
        <Card
          size='tiny'
        />
      </Preview>
      <Preview
        label='Small'
      >
        <Card
          size='small'
        />
      </Preview>
      <Preview
        label='Base'
      >
        <Card
          size='base'
        />
      </Preview>
      <Preview
        label='Large'
      >
        <Card
          size='large'
        />
      </Preview>
      <Preview
        label='Huge'
      >
        <Card
          size='huge'
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('Floating', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Floating'
      >
        <Card
          floating
        />
      </Preview>
    </PreviewContainer>
  ))
