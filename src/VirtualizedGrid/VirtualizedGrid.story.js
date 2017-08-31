import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import VirtualizedGrid from './VirtualizedGrid'

const data = Array.from(Array(58).keys()).map(index => ({ name: `Cell ${index}` }))
const BADGE_URL = 'https://storage.googleapis.com/component-bundles/Badge.js'

class Renderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      badge: '',
    }
  }
  componentWillMount() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({ badge: xhr.responseText })
      }
    }
    xhr.open('GET', BADGE_URL, true)
    xhr.send()
  }

  componentDidUpdate() {
    if (this.state.badge) {
      window.React = React
      window.production = 'production'
      // eval(this.state.badge)
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

storiesOf('VirtualizedGrid', module).add('Regular', () => (
  <div style={styles.container}>
    <VirtualizedGrid
      size="medium"
      data={data}
      renderer={Renderer}
      onClickItem={action('clicked item')}
      rowHeight={300}
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
