import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AutoSizer from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('AutoSizer', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <AutoSizer>
          {() => 'Hello'}
        </AutoSizer>
      </Preview>
    </PreviewContainer>
  ))
