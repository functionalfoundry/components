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
      </Preview>
    </PreviewContainer>
  ))
