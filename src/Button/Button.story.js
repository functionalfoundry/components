import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {
  Colors,
} from '@workflo/styles'
import Button from '.'

storiesOf('Button', module)
  .add('Regular', () => (
    <div
      style={styles.darkContainer}
    >
      <Button
        label='Click Me'
      />
    </div>
  ))

const styles = {
  container: {
    width: '100%',
  },
  darkContainer: {
    width: '100%',
    height: 500,
    backgroundColor: Colors.grey900,
  },
}
