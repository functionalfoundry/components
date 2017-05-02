/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import HoverIcon from './HoverIcon'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('HoverIcon', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Regular">
      <HoverIcon stroke="white" name="back" hoverName="back-hover" size="large" />
    </Preview>
  </PreviewContainer>
))
