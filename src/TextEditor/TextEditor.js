import React from 'react'
import Draft from 'draft-js'
import CodeUtils from 'draft-js-code'

import {
  Fonts,
  Spacing,
  Colors,
} from '@workflo/styles'

import { ReactDecoratorFactory } from './Decorators'
import {
  PropKeyValueT,
} from './Types'
import View from '../View'

const {
    EditorState,
    convertFromRaw,
} = Draft

type PropsT = {
  componentName: string,
  propKeyValues: Array<PropKeyValueT>,
}

export default class TextEditor extends React.Component {

  constructor(props: PropsT) {
    super(props)

    this.state = {
      editorState: this.getEditorState(props),
    }
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleTab = this.handleTab.bind(this)
  }

  onChange (editorState) {
    this.setState({
      editorState: editorState,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.propKeyValues !== this.props.propKeyValues) {
      this.setState({
        editorState: this.getEditorState(nextProps),
      })
    }
  }

  getEditorState = (props) => {
    const {
      componentName,
      propKeyValues,
      onChange,
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

    return EditorState.createWithContent(contentState, ReactDecoratorFactory(propKeyValues, onChange))
  }

  handleKeyCommand (command) {
    const { editorState } = this.state
    let newState
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command)
    }

    if (!newState) {
      newState = Draft.RichUtils.handleKeyCommand(editorState, command)
    }

    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  keyBindingFn (e) {
    const editorState = this.state.editorState
    let command
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e)
    }
    if (command) {
      return command
    }

    return Draft.getDefaultKeyBinding(e)
  }

  handleReturn (e) {
    const editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    // this.onChange(
    //   CodeUtils.handleReturn(e, editorState)
    // )
    return true
  }

  handleTab (e) {
    const editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  render () {
    return (
      <View
        style={styles.editor}
      >
        <Draft.Editor
          customStyleMap={styleMap}
          editorState={this.state.editorState}
          onChange={this.onChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          onTab={this.handleTab}
          readOnly={true}
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

const styleMap = {
  CODE: {
    backgroundColor: Colors.grey50,
    fontFamily: '"Open Sans", "Menlo", "Consolas", monospace',
    fontSize: 16,
    color: 'red',
    padding: 2,
  },
}

const styles = {
  editor: {
    ...Fonts.base,
    padding: Spacing.small,
    backgroundColor: 'white',
    color: Colors.grey600,
    lineHeight: '1.6em',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}
