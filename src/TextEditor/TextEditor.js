/* @flow */
import React from 'react'
import Draft from 'draft-js'
import CodeUtils from 'draft-js-code'

import {
  Fonts,
  Spacing,
  Colors,
} from '@workflo/styles'

import {
  PropKeyValueT,
} from './Types'
import View from '../View'

type PropsT = {
  componentName: string,
  propKeyValues: Array<PropKeyValueT>,
}

export default class TextEditor extends React.Component {

  constructor(props: PropsT) {
    super(props)

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
      this.props.onChange(newState)
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

    this.props.onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  render () {
    return (
      <View
        style={styles.editor}
      >
        <Draft.Editor
          editorState={this.props.editorState}
          onChange={this.props.onChange}
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
