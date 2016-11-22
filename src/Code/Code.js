/* @flow */
import React from 'react'
import Draft from 'draft-js'

import { codeDecoratorFactory } from './CodeDecorator'
import {
  PropKeyValueT,
} from '../TextEditor/Types'
import View from '../View'
import TextEditor from '../TextEditor'

const {
    EditorState,
    convertFromRaw,
} = Draft

type PropsT = {
  componentName: string,
  propKeyValues: Array<PropKeyValueT>,
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
      editorState: this.getEditorState(props),
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (nextProps.propKeyValues !== this.props.propKeyValues) {
      this.setState({
        editorState: this.getEditorState(nextProps),
      })
    }
  }

  getEditorState = (props: PropsT) => {
    const {
      componentName,
      propKeyValues,
    } = props
    const contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: getCodeString(componentName, propKeyValues)
        }
      ]
    })
    console.log('new factory with: ', propKeyValues)
    return EditorState.createWithContent(contentState, codeDecoratorFactory(propKeyValues, this.handleChange))
  }

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
    console.log('the newness: ', newPropKeyValues)
    onChange(newPropKeyValues)
  }

  handleChangeEditorState = (editorState) => {
    console.log('change editor state')
    this.setState({
      editorState,
    })
  }

  render() {
    console.log('rerender')
    return (
      <View
        style={styles.code}
      >
        <TextEditor
          editorState={this.state.editorState}
          onChange={this.handleChangeEditorState}
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
