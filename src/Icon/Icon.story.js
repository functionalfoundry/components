import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Icon from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Icon', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Icon
          name='logo'
          size='huge'
        />
      </Preview>
      <Preview
        label='With fill'
      >
        <Icon
          name='twitter'
          size='huge'
          fill='blue'
        />
        <Icon
          name='duplicate'
          size='large'
          stroke='blue'
        />
        <Icon
          name='delete'
          size='large'
          stroke='blue'
        />
        <Icon
          name='alignment'
          size='large'
          stroke='blue'
          fill='blue'
        />
        <Icon
          name='theme'
          size='large'
          stroke='blue'
        />
        <Icon
          name='size'
          size='large'
          stroke='blue'
        />
        <Icon
          name='more-horizontal'
          size='large'
          stroke='blue'
        />
      </Preview>
    </PreviewContainer>
  ))
