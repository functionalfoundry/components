import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Grid from './Grid'

const data = [
  { name: 'Yaniv' },
  { name: 'Jannis' },
  { name: 'Brandon' },
  { name: 'Carl' },
  { name: 'Dan' },
  { name: 'Lisa' },
]

const renderer = ({ name }) => (
  <div style={{ backgroundColor: 'magenta', flex: 1 }}>
    {name}
  </div>
)

storiesOf('Grid', module)
  .add('Regular', () => (
    <div
      style={styles.container}
    >
      <Grid
        size='medium'
        data={data}
        renderer={renderer}
        onClickItem={action('clicked item')}
      />
    </div>
  ))

const styles = {
  container: {
    width: '100%',
    height: 900,
    backgroundColor: 'rgb(247, 247, 247)',
  },
}
