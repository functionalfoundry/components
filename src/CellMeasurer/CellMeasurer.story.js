import React from 'react'
import { storiesOf } from '@kadira/storybook'
import CellMeasurer from '.'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'

storiesOf('CellMeasurer', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Regular">
      <CellMeasurer />
    </Preview>
  </PreviewContainer>
))
