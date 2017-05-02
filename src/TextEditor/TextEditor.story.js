import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TextEditor from '.'
// import DataEditor from './DataEditor'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

const defaultText = `const foo = {
  bar: 'baz',
}

const bar = {
  baz: 'ruux',
}
`

storiesOf('TextEditor', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="TextEditor">
      <TextEditor text={defaultText} onChange={action('onChange')} />
    </Preview>
  </PreviewContainer>
))
