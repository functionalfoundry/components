import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Heading from './Heading'

storiesOf('Heading', module)
  .add('Sizes', () => (
    <div
      style={styles.container}
    >
      <Heading
        size='huge'
      >
        {'huge'}
      </Heading>
      <Heading
        size='large'
      >
        {'large'}
      </Heading>
      <Heading
        size='base'
      >
        {'base'}
      </Heading>
      <Heading
        size='small'
      >
        {'small'}
      </Heading>
      <Heading
        size='tiny'
      >
        {'tiny'}
      </Heading>
    </div>
  ))

const styles = {
  container: {
    width: '100%',
  },
}
