import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Image from './Image'

storiesOf('Image', module)
  .add('Regular', () => (
    <div
      style={styles.container}
    >
      <Image
        src='https://pbs.twimg.com/profile_images/657199367556866048/EBEIl2ol.jpg'
      />
    </div>
  ))
  .add('Fixed width', () => (
    <div
      style={styles.container}
    >
      <Image
        src='https://pbs.twimg.com/profile_images/657199367556866048/EBEIl2ol.jpg'
        width={100}
        height={100}
      />
    </div>
  ))

const styles = {
  container: {
    width: '100%',
  },
}
