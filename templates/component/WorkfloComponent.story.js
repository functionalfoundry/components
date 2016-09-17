import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {{WorkfloComponent}} from '.'

storiesOf('{{WorkfloComponent}}', module)
  .add('Regular', () => (
    <div
      style={styles.container}
    >
      <{{WorkfloComponent}} />
    </div>
  ))

const styles = {
  container: {
    width: '100%',
  },
}
