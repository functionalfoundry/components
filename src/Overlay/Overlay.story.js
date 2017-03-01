import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Overlay from './Overlay'

storiesOf('Overlay', module)
  .add('Regular', () => (
    <Overlay>
      Test from Overlay
    </Overlay>
  ))
