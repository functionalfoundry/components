import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Radio from '.'
import RadioGroup from './RadioGroup'
import View from '../View'
import PreviewContainer from '../PreviewContainer'
import Preview from '../Preview'

storiesOf('Radio', module).add('Regular', () => (
  <PreviewContainer shade="dark" height={1500}>
    <Preview label="Unchecked">
      <Radio value={false} label="Deselected Option" />
    </Preview>
    <Preview label="Checked">
      <Radio label="Selected option" checked />
    </Preview>
    <Preview label="Group">
      <Container />
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
        <RadioGroup value={value} onChange={value => this.setState({ value })}>
          <Radio label="true" value={true} />
          <Radio label="false" value={false} />
        </RadioGroup>
      </View>
    )
  }
}

const styles = {
  buttonWrapper: {
    padding: 20,
  },
}
