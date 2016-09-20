import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Icon from '.'

storiesOf('Icon', module)
  .add('Regular', () => (
    <div
      style={styles.container}
    >
      <Icon
        name='logo'
        size='huge'
      />
    </div>
  ))

const styles = {
  container: {
    width: '100%',
  },
}
