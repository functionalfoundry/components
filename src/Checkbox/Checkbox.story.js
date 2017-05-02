import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Checkbox from '.'
import View from '../View'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'

storiesOf('Checkbox', module).add('Regular', () => (
  <PreviewContainer shade="dark" height={1500}>
    <Preview label="Unchecked">
      <Checkbox onChange={action('onChange')} />
    </Preview>
    <Preview label="Checked">
      <Checkbox checked onChange={action('onChange')} />
    </Preview>
  </PreviewContainer>
))

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: true }
  }

  render() {
    const { value } = this.state
    return (
      <View style={styles.container}>
        <Checkbox />
      </View>
    )
  }
}

const styles = {
  buttonWrapper: {
    padding: 20,
  },
  container: {},
}
