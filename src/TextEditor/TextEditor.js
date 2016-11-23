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
  text: any,
  decorator: any,
  onChange: Function,
}

type StateT = {
  editorState: any,
}

export default class TextEditor extends React.Component {
  props: PropsT
  state: StateT

  constructor(props: PropsT) {
    super(props)
    this.state = {
      editorState: this.getEditorState(props),
    }

    // this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleTab = this.handleTab.bind(this)
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (nextProps.text !== this.props.text || nextProps.decorator !== this.props.decorator) {
      this.setState({
        editorState: this.getEditorState(nextProps),
      })
    }
  }

  // onChange (editorState) {
  //   this.setState({
  //     editorState: editorState,
  //   })
  // }
  handleChange(editorState: any) {
    const { onChange } = this.props
    const content = editorState.getCurrentContent()
    const text = content.getFirstBlock().getText()

    if (content !== this.previousContent) {
      onChange(text)
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
          readOnly={true}
        />
      </View>
    )
  }
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
