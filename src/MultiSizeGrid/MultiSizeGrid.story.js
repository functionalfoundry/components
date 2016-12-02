import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import MultiSizeGrid from './MultiSizeGrid'

const seedData = [
  {
    value: { name: 'Yaniv' },
    descriptor: {
      size: {
        horizontal: 'Small',
      },
      isSelected: false,
    },
  },
  {
    value: { name: 'Jannis' },
    descriptor: {
      size: {
        horizontal: 'Small',
      },
      isSelected: true,
    },
  },
  {
    value: { name: 'Brandon' },
    descriptor: {
      size: {
        horizontal: 'Small',
      },
      isSelected: false,
    },
  },
  {
    value: { name: 'Cory' },
    descriptor: {
      size: {
        horizontal: 'Small',
      },
      isSelected: false,
    },
  },
  {
    value: { name: 'Carl' },
    descriptor: {
      size: {
        horizontal: 'Base',
      },
      isSelected: false,
    },
  },
  {
    value: { name: 'Dan' },
    descriptor: {
      size: {
        horizontal: 'Base',
      },
      isSelected: false,
    },
  },
  {
    value: { name: 'Lisa' },
    descriptor: {
      size: {
        horizontal: 'Large',
      },
      isSelected: false,
    },
  },
]

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: seedData,
    }
  }

  render() {
    const { name } = this.props
    return (
      <div style={{ backgroundColor: 'magenta', flex: 1 }}>
        {name}
      </div>
    )
  }
}

storiesOf('MultiSizeGrid', module)
  .add('Regular', () => (
    <div
      style={styles.container}
    >
      <GridContainer
        data={seedData}
        renderer={Item}
      />
    </div>
  ))

  class GridContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: seedData,
      }
    }

    render() {
      const { renderer } = this.props
      const { data } = this.state
      return (
        <MultiSizeGrid
          data={data}
          renderer={renderer}
          onChange={(data) => {
            this.setState({ data })
            action('handleChange')(data)
          }}
        />
      )
    }
  }

const styles = {
  container: {
    width: '100%',
    height: 900,
    backgroundColor: 'rgb(247, 247, 247)',
  },
}
