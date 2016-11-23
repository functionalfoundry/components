/* @flow */
import React from 'react'

import { codeDecoratorFactory } from './CodeDecorator'
import View from '../View'
import TextEditor from '../TextEditor'

export type CodePropKeyValueTypeT = 'string' | 'variable' | 'number'

export type CodePropKeyValueT = {
  type: CodePropKeyValueTypeT,
  key: string,
  value: any,
  options: Array<string>,
}

type PropsT = {
  componentName: string,
  propKeyValues: Array<CodePropKeyValueT>,
  onChange: Function,
}

const defaultProps = {
  onChange: () => {},
}

export default class Code extends React.Component {
  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    this.state = {
      text: this.getText(props),
      decorator: this.getDecorator(props),
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (nextProps.propKeyValues !== this.props.propKeyValues) {
      this.setState({
        text: this.getText(nextProps),
        decorator: this.getDecorator(nextProps),
      })
    }
  }

  getText = ({ componentName, propKeyValues }: PropsT) =>
    getCodeString(componentName, propKeyValues)

  getDecorator = ({ propKeyValues }: PropsT) =>
    codeDecoratorFactory(propKeyValues, this.handleChange)

  handleChange = (key, value) => {
    const {
      onChange,
      propKeyValues,
    } = this.props
    // this.setState({})
    const propKeyValue = propKeyValues
      .find((propKeyValue) => propKeyValue.key === key)
    const index = propKeyValues.indexOf(propKeyValue)
    const newPropKeyValues = [...propKeyValues]
    newPropKeyValues[index].value = value
    onChange(newPropKeyValues)
  }

  render() {
    return (
      <View
        style={styles.code}
      >
        <TextEditor
          text={this.state.text}
          decorator={this.state.decorator}
        />
      </View>
    )
  }
}

const getCodeString = (componentName, propKeyValues) => {
  const props = propKeyValues
    .map((propKeyValue) => {
      const { key, value, type } = propKeyValue
      switch (type) {
        case 'variable':
          return `  ${key}={${value}}`
        case 'string':
          return `  ${key}='${value}'`
        case 'number':
          return `  ${key}={${value}}`
        default:
          return `  ${key}={${value}}`
      }
    })
    .join('\n')
  return `<${componentName}\n${props}\n/>`
}


const styles = {
  code: {
  },
}
