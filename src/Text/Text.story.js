import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Text from './Text'

storiesOf('Text', module)
  .add('Tiny', () => (
    <div
      style={styles.container}
    >
      <Text
        size='tiny'
      >
        {'Tiny'}
      </Text>
    </div>
  ))
  .add('Small', () => (
    <div
      style={styles.container}
    >
      <Text
        size='small'
      >
        {'Small'}
      </Text>
    </div>
  ))
  .add('Base', () => (
    <div
      style={styles.container}
    >
      <Text
        size='base'
      >
        {'Base'}
      </Text>
    </div>
  ))
  .add('Large', () => (
    <div
      style={styles.container}
    >
      <Text
        size='large'
      >
        {'Large'}
      </Text>
    </div>
  ))
  .add('Huge', () => (
    <div
      style={styles.container}
    >
      <Text
        size='huge'
      >
        {'Huge'}
      </Text>
    </div>
  ))

const styles = {
  container: {
    width: '100%',
  },
}
