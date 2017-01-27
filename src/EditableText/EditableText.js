/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {Colors, Fonts, Spacing} from '@workflo/styles'
import {ContentState, Editor, EditorState} from 'draft-js'
import Trigger from '../Trigger'
import View from '../View'

/**
 * Property types
 */

type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge'

type PropsT = {
  isEditing?: boolean,
  multipleLines?: boolean,
  readOnly?: boolean,
  onChange?: Function,
  onStartEdit?: Function,
  onStopEdit?: Function,
  size?: SizeT,
  theme: Object,
  value: String,
}

/**
 * Default properties
 */

const defaultProps = {
  isEditing: false,
  multipleLines: false,
  readOnly: false,
  size: 'Base',
  isEditing: false,
  onChange: () => {},
  onStartEdit: () => {},
  onStopEdit: () => {},
}

/**
 * EditableText component
 */

class EditableText extends React.Component {
  props: PropsT

  static defaultProps = defaultProps

  state = {
    editorState: null
  }

  constructor (props) {
    super(props)
    let editorState = this.getEditorStateFromValue(props.value || '')
    this.state = {editorState}
  }

  render () {
    const {
      multipleLines,
      theme,
      readOnly,
    } = this.props

    const {
      editorState,
    } = this.state

    return (
      <View {...theme.text}>
        <Editor
          editorState={editorState}
          readOnly={readOnly}
          onChange={this.handleChange.bind(this)}
          handleReturn={multipleLines ? null : () => 'handled'}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
      </View>
    )
  }

  handleFocus () {
    if (this.props.onStartEdit) {
      this.props.onStartEdit()
    }
  }

  handleBlur () {
    if (this.props.onStopEdit) {
      this.props.onStopEdit()
    }
  }

  handleChange (editorState: EditorState) {
    this.setState({editorState})

    let oldText = this.getTextFromEditorState(this.state.editorState)
    let newText = this.getTextFromEditorState(editorState)
    if (oldText !== newText) {
      if (this.props.onChange) {
        this.props.onChange(newText)
      }
    }
  }

  getEditorStateFromValue (value) {
    return EditorState.createWithContent(
      ContentState.createFromText(value)
    )
  }

  getTextFromEditorState (editorState: EditorState) {
    return editorState.getCurrentContent().getPlainText()
  }
}

/**
 * Theming
 */

const sizeStyles = {
  'Tiny': {
    ...Fonts.tiny,
  },
  'Small': {
    ...Fonts.small,
  },
  'Base': {
    ...Fonts.base,
  },
  'Large': {
    ...Fonts.large,
  },
  'Huge': {
    ...Fonts.huge,
  }
}

const defaultTheme = ({isEditing, readOnly, size, value}: PropsT) => ({
  text: {
    boxShadow: 'inset 0px -1px 0px 0px transparent',
    ...(readOnly && {
      cursor: 'default',
    }),
    ...(!readOnly && {
      ':hover': {
        boxShadow: `inset 0px -1px 0px 0px ${Colors.grey300}`,
      },
    }),
    ...(!value && {
      minWidth: '5em',
    }),
    ...(isEditing && {
      boxShadow: `inset 0px -1px 0px 0px ${Colors.grey300}`,
    }),
    ...sizeStyles[size] || sizeStyles['Base'],
  }
})

/**
 * Exporting
 */

const ThemedEditableText = Theme('EditableText', defaultTheme)(EditableText)
export default ThemedEditableText