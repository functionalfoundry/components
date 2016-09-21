import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Button from '.'
import Preview from '../Preview'
import PreviewContainer from '../Preview/PreviewContainer'

storiesOf('Button', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Button
          label='Click Me'
        />
      </Preview>
      <Preview
        label='Regular Ghost'
      >
        <Button
          label='Click Me'
          ghost
        />
      </Preview>
      <Preview
        label='Secondary'
      >
        <Button
          label='Click Me'
          kind='secondary'
        />
      </Preview>
      <Preview
        label='Secondary Ghost'
      >
        <Button
          label='Click Me'
          kind='secondary'
          ghost
        />
      </Preview>
      {/* <Preview
        label='Hero'
      >
        <Button
          label='Click Me'
          kind='hero'
        />
      </Preview> */}
      <Preview
        label='Hero Ghost'
      >
        <Button
          label='Click Me'
          kind='hero'
          ghost
        />
      </Preview>
    </PreviewContainer>
  ))
