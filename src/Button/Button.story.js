import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Button from '.'
import Preview from '../Preview'
import PreviewContainer from '../PreviewContainer/PreviewContainer'

storiesOf('Button', module).add('Regular', () => (
  <div>
    <PreviewContainer shade="dark">
      <Preview label="Regular">
        <Button label="Click Me" />
      </Preview>
      <Preview label="Regular Ghost">
        <Button label="Click Me" ghost />
      </Preview>
      <Preview label="Secondary">
        <Button label="Click Me" kind="secondary" />
      </Preview>
      <Preview label="Secondary Ghost">
        <Button label="Click Me" kind="secondary" ghost />
      </Preview>
      {/* <Preview
        label='Hero'
      >
        <Button
          label='Click Me'
          kind='hero'
        />
      </Preview> */}
      <Preview label="Hero Ghost">
        <div style={{ display: 'block' }}>
          <Button kind="hero" ghost>
            Click me
          </Button>
        </div>
      </Preview>
    </PreviewContainer>
  </div>
))
