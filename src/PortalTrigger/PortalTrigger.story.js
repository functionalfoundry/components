import React from 'react'
import { storiesOf } from '@kadira/storybook'
import PortalTrigger from '.'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('PortalTrigger', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <PortalTrigger
          portal={portalElement}
          openOn={['Click inside']}
          closeOn={['Mouse leave']}
        >
          <button>Portal Trigger</button>
        </PortalTrigger>
      </Preview>
    </PreviewContainer>
  ))

const portalElement = <div>Portal element</div>
