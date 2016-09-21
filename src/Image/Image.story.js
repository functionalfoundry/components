import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Image from './Image'
import PreviewContainer from '../Preview/PreviewContainer'
import Preview from '../Preview'

storiesOf('Image', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Image
          src='https://pbs.twimg.com/profile_images/657199367556866048/EBEIl2ol.jpg'
          width={180}
          height={180}
        />
      </Preview>
    </PreviewContainer>
  ))
