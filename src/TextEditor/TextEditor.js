/* @flow */
import React from 'react'
import Draft from 'draft-js'
import CodeUtils from 'draft-js-code'

import {
  Fonts,
  Spacing,
  Colors,
} from '@workflo/styles'

import View from '../View'

const {
    EditorState,
    convertFromRaw,
} = Draft

type PropsT = {
  text?: string,
  editorState: Object,
  decorator: any,
  onChange: Function,
  readOnly: boolean,
}

type StateT = {
  editorState: any,
}

const defaultProps = {
  readOnly: false,
}

export default class TextEditor extends React.Component {
  props: PropsT
  state: StateT
  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    const editorState = props.editorState || this.getEditorState(props)
    this.state = {
      editorState,
    }

    // this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleTab = this.handleTab.bind(this)
  }

  // onChange (editorState) {
  //   this.setState({
  //     editorState: editorState,
  //   })
  // }
  handleChange = (editorState: any) => {
    const { onChange } = this.props
    const content = editorState.getCurrentContent()
    const text = content.getFirstBlock().getText()

    this.setState({ editorState })

    if (content !== this.previousContent) {
      onChange({ text, editorState })
      this.previousContent = content
    }
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
      this.handleChange(newState)
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

    this.handleChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  handleTab (e) {
    const editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.handleChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  getEditorState = (props: PropsT) => {
    const { text, decorator } = props
    const contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text,
        },
      ],
    })
    return EditorState.createWithContent(contentState, decorator)
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (nextProps.text !== this.props.text) {
      this.setState({ editorState: this.getEditorState(nextProps) })
    }
  }

  render() {
    return (
      <View
        style={styles.editor}
      >
        <Draft.Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          onTab={this.handleTab}
          readOnly={this.props.readOnly}
        />
      </View>
    )
  }
}

const styles = {
  editor: {
    ...Fonts.base,
    lineHeight: '1.6em',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}
