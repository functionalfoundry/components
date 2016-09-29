import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Pointer from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Pointer', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
      height={1500}
    >
      <Preview
        label='Center Left * *'
      >
        <Pointer
          pointerVertical='Center'
          pointerHorizontal='Left'
        />
      </Preview>
      <Preview
        label='Top Left * Right'
      >
        <Pointer
          pointerVertical='Top'
          pointerHorizontal='Left'
          targetHorizontal='Right'
        />
      </Preview>
      <Preview
        label='Top Left Bottom *'
      >
        <Pointer
          pointerVertical='Top'
          pointerHorizontal='Left'
          targetVertical='Bottom'
        />
      </Preview>
      <Preview
        label='Top Center * *'
      >
        <Pointer
          pointerVertical='Top'
          pointerHorizontal='Center'
        />
      </Preview>
      <Preview
        label='Top Right Bottom *'
      >
        <Pointer
          pointerVertical='Top'
          pointerHorizontal='Right'
          targetVertical='Bottom'
        />
      </Preview>
      <Preview
        label='Top Right * Left'
      >
        <Pointer
          pointerVertical='Top'
          pointerHorizontal='Right'
          targetHorizontal='Left'
        />
      </Preview>
      <Preview
        label='Center Right * *'
      >
        <Pointer
          pointerVertical='Center'
          pointerHorizontal='Right'
        />
      </Preview>
      <Preview
        label='Bottom Right * Left'
      >
        <Pointer
          pointerVertical='Bottom'
          pointerHorizontal='Right'
          targetHorizontal='Left'
        />
      </Preview>
      <Preview
        label='Bottom Right Top *'
      >
        <Pointer
          pointerVertical='Bottom'
          pointerHorizontal='Right'
          targetVertical='Top'
        />
      </Preview>
      <Preview
        label='Bottom Center * *'
      >
        <Pointer
          pointerVertical='Bottom'
          pointerHorizontal='Center'
        />
      </Preview>
      <Preview
        label='Bottom Left Top *'
      >
        <Pointer
          pointerVertical='Bottom'
          pointerHorizontal='Left'
          targetVertical='Top'
        />
      </Preview>
      <Preview
        label='Bottom Left * Right'
      >
        <Pointer
          pointerVertical='Bottom'
          pointerHorizontal='Left'
          targetHorizontal='Right'
        />
      </Preview>
    </PreviewContainer>
  ))
