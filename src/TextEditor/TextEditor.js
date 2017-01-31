/* @flow */
import React from 'react'
import Draft from 'draft-js'
import CodeUtils from 'draft-js-code'
import {Fonts, Spacing, Colors} from '@workflo/styles'
import View from '../View'

const {
    EditorState,
    convertFromRaw,
} = Draft

/**
 * Prop types
 */

type PropsT = {
  text?: string,
  decorator?: Object,
  onChange?: Function,
  readOnly?: boolean,
}

/**
 * Default properties
 */

const defaultProps = {
  text: '',
  decorator: null,
  onChange: () => {},
  readOnly: false,
}

/**
 * State types
 */

type StateT = {
  editorState: Draft.EditorState,
}

/**
 * Utilities
 */

const getEditorStateFromProps = (props: PropsT) => {
  const {text, decorator} = props
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

const prepareTextForPasting = (text: string) => (
  // Replace all soft newlines (\n) with hard newlines (\r\n)
  text.replace(/(?:\r\n|\r|\n)/g, '\r\n')
)

/**
 * TextEditor component
 */

export default class TextEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    this.state = {
      editorState: getEditorStateFromProps(props),
    }
  }

  handleChange = (editorState: Draft.EditorState) => {
    const text = editorState.getCurrentContent().getPlainText()
    if (text !== this.props.text) {
      if (this.props.onChange) {
        this.props.onChange(text)
      }
    }
    this.setState({editorState})
  }

  handleKeyCommand = (command: string) => {
    const editorState =
      (CodeUtils.hasSelectionInBlock(this.state.editorState)
       && CodeUtils.handleKeyCommand(this.state.editorState, command))
      || Draft.RichUtils.handleKeyCommand(this.state.editorState, command)
      
    if (editorState) {
      this.setState({editorState})
      return 'handled'
    }
  }

  keyBindingFn = (e: React.SyntheticEvent) => {
    return (CodeUtils.hasSelectionInBlock(this.state.editorState)
            && CodeUtils.getKeyBinding(e))
           || Draft.getDefaultKeyBinding(e)
  }

  handleReturn = (e: React.SyntheticEvent) => {
    if (CodeUtils.hasSelectionInBlock(this.state.editorState)) {
      this.setState({
        editorState: CodeUtils.handleReturn(e, this.state.editorState)
      })
      return 'handled'
    }
  }

  handleTab = (e: React.SyntheticEvent) => {
    if (CodeUtils.hasSelectionInBlock(this.state.editorState)) {
      this.setState({
        editorState: CodeUtils.handleTab(e, this.state.editorState)
      })
    }
  }

  handlePastedText = (text: string, html?: string) => {
    if (text) {
      const pasteableText = prepareTextForPasting(text)
      const editorState = this.state.editorState
      this.setState({
        editorState: EditorState.push(
          editorState,
          Draft.Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            pasteableText
          ),
          'insert-fragment')
      })
      return 'handled'
    }
  }

  componentWillReceiveProps (nextProps: PropsT) {
    if (nextProps.text !== this.props.text) {
      this.setState({
        editorState: getEditorStateFromProps(nextProps)
      })
    }
  }

  render () {
    return (
      <View
        style={styles.editor}
      >
        <Draft.Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handlePastedText={this.handlePastedText}
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
