import React from 'react'
import { storiesOf } from '@kadira/storybook'
import View from './View'

storiesOf('View', module)
  .add('Regular', () => (
    <div
      style={styles.container}
    >
      <View>
        {'View'}
      </View>
    </div>
  ))
  .add('With theme', () => (
    <div
      style={styles.container}
    >
      <View
        theme={getTheme()}
      >
        {'View with styles'}
      </View>
    </div>
  ))
  .add('Inline', () => (
    <div
      style={styles.container}
    >
      <View
        theme={getTheme()}
        inline
      >
        {'Inline'}
      </View>
    </div>
  ))
  .add('Nested', () => (
    <div
      style={styles.container}
    >
      <View
        theme={getTheme()}
      >
        {'1'}
      </View>
      <View
        theme={getTheme('green')}
      >
        {'2'}
      </View>
      <View>
        <View
          theme={getTheme('yellow')}
        >
          {'3'}
        </View>
        <View
          theme={getTheme('red')}
        >
          {'4'}
        </View>
      </View>
    </div>
  ))
  .add('With test ID', () => (
    <div
      style={styles.container}
    >
      <View
        testId='View234'
      >
        {'View'}
      </View>
    </div>
  ))

const styles = {
  container: {
    width: '100%',
  },
}

const getTheme = (color = 'aqua') => ({
  view: {
    backgroundColor: color,
  },
})
