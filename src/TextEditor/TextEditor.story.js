import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TextEditor from '.'
// import DataEditor from './DataEditor'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('TextEditor', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='TextEditor'
      >
      <TextEditor
        text='Hello'
        onChange={action('onChange')}
      />
      </Preview>
    </PreviewContainer>
  ))