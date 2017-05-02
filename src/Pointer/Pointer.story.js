import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Pointer from '.'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'

storiesOf('Pointer', module).add('Regular', () => (
  <PreviewContainer shade="dark" height={1500}>
    <Preview label="Top">
      <Pointer position="Top">
        Content
      </Pointer>
    </Preview>
    <Preview label="Top Right, Gravity Top">
      <Pointer position="Top Right" gravity="Top">
        Content
      </Pointer>
    </Preview>
    <Preview label="Top Right, Gravity Right">
      <Pointer position="Top Right" gravity="Right">
        Content
      </Pointer>
    </Preview>
    <Preview label="Right">
      <Pointer position="Right">
        Content
      </Pointer>
    </Preview>
    <Preview label="Bottom Right, Gravity Right">
      <Pointer position="Bottom Right" gravity="Right">
        Content
      </Pointer>
    </Preview>
    <Preview label="Bottom Right, Gravity Bottom">
      <Pointer position="Bottom Right" gravity="Bottom">
        Content
      </Pointer>
    </Preview>
    <Preview label="Bottom">
      <Pointer position="Bottom">
        Content
      </Pointer>
    </Preview>
    <Preview label="Bottom Left, Gravity Bottom">
      <Pointer position="Bottom Left" gravity="Bottom">
        Content
      </Pointer>
    </Preview>
    <Preview label="Bottom Left, Gravity Left">
      <Pointer position="Bottom Left" gravity="Left">
        Content
      </Pointer>
    </Preview>
    <Preview label="Left">
      <Pointer position="Left">
        Content
      </Pointer>
    </Preview>
    <Preview label="Top Left, Gravity Left">
      <Pointer position="Top Left" gravity="Left">
        Content
      </Pointer>
    </Preview>
    <Preview label="Top Left, Gravity Top">
      <Pointer position="Top Left" gravity="Top">
        Content
      </Pointer>
    </Preview>
  </PreviewContainer>
))
