/** @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'
import Slate from 'slate'
import View from '../View'

/**
 * Property types
 */

type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge'

type PropsT = {
  /** When set to true EditableText will be rendered with inline elements */
  inline: boolean,
  isEditing?: boolean,
  isValid: boolean,
  multipleLines?: boolean,
  readOnly?: boolean,
  onChange?: Function,
  onStartEdit?: Function,
  onStopEdit?: Function,
  size: SizeT,
  theme: Object,
  value: String,
}

/**
 * Default properties
 */

const defaultProps = {
  isEditing: false,
  isValid: true,
  multipleLines: false,
  readOnly: false,
  size: 'Base',
  onChange: () => {},
  onStartEdit: () => {},
  onStopEdit: () => {},
}

/**
 * State type
 */

type StateT = {
  editorState: Slate.State,
  isFocused: boolean,
}

/**
 * EditableText component
 */

class EditableText extends React.Component {
  props: PropsT
  state: StateT
  editorRef: any
  isFocused: boolean = false

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = {
      editorState: Slate.Plain.deserialize(props.value || ''),
      isFocused: false,
    }
  }

  componentWillReceiveProps({ value }: PropsT) {
    if (this.props.value !== value) {
      this.setState({
        editorState: Slate.Plain.deserialize(value || ''),
      })
    }
  }

  componentDidUpdate() {
    this.removeBreakWhenEmpty()
  }

  componentDidMount() {
    this.removeBreakWhenEmpty()
  }

  blur = () => {
    this.setState({
      editorState: this.state.editorState.transform().blur().apply(),
    })
    this.editorRef.blur()
  }

  focus = () => {
    this.setState({
      editorState: this.state.editorState.transform().focus().apply(),
    })
    this.editorRef.focus()
  }

  getEditorStyle = () => {
    const { inline } = this.props
    const { editorState } = this.state
    const value = Slate.Plain.serialize(editorState)
    /** This makes space for the cursor even when empty */
    if (inline && !value) {
      return {
        display: 'inline-block',
        minWidth: 2,
      }
    }

    if (inline && value) {
      return {
        display: 'inline',
      }
    }

    return {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
    }
  }

  select = () => {
    this.setState({
      editorState: this.state.editorState.transform().selectAll().apply(),
    })
  }

  focusAndSelect = () => {
    this.editorRef.focus()
    this.setState({
      editorState: this.state.editorState.transform().selectAll().focus().apply(),
    })
  }

  /**
   * When Slate Editor is empty they insert a <br> which breaks layouts in cases
   * where Editor was menat to be rendered as an inline element. We remove it here,
   * as appropriate.
   */
  removeBreakWhenEmpty = () => {
    const { inline } = this.props
    const { editorState } = this.state
    const value = Slate.Plain.serialize(editorState)
    if (inline && !value) {
      const node = ReactDOM.findDOMNode(this.editorRef) // eslint-disable-line
      const br = node.querySelector('br')
      if (br) {
        br.remove()
      }
    }
  }

  storeEditor = ref => (this.editorRef = ref)

  render() {
    const {
      inline, // eslint-disable-line no-unused-vars
      isEditing, // eslint-disable-line no-unused-vars
      isValid, // eslint-disable-line no-unused-vars
      multipleLines, // eslint-disable-line no-unused-vars
      readOnly,
      value, // eslint-disable-line no-unused-vars
      size, // eslint-disable-line no-unused-vars
      theme,
      onChange, // eslint-disable-line no-unused-vars
      onStartEdit, // eslint-disable-line no-unused-vars
      onStopEdit, // eslint-disable-line no-unused-vars
      ...props
    } = this.props
    const { editorState } = this.state

    return (
      <View {...theme.text} {...props} inline onBlur={this.handleBlur}>
        <Slate.Editor
          onChange={this.handleChange}
          onDocumentChange={this.handleDocumentChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
          readOnly={readOnly}
          ref={this.storeEditor}
          state={editorState}
          style={this.getEditorStyle()}
          schema={{
            nodes: {
              line: props => (
                <span {...props.attributes}>
                  {props.children}
                </span>
              ),
            },
          }}
          spellCheck={false}
        />
      </View>
    )
  }

  handleKeyDown = (event, data, state) => {
    if (data.key == 'enter') {
      if (!this.props.multipleLines) {
        event.preventDefault()
        return state
      }
    }
    return null
  }

  handleFocus = () => {
    this.props.onStartEdit && this.props.onStartEdit()
  }

  handleBlur = () => {
    this.props.onStopEdit && this.props.onStopEdit()
  }

  handleChange = ({ state }: Slate.Change) => {
    this.setState({
      editorState: state,
    })
  }

  handleDocumentChange = (
    document: Slate.Document,
    { state }: { state: Slate.State }
  ) => {
    let text = Slate.Plain.serialize(state)
    this.props.onChange && this.props.onChange(text)
  }
}

/**
 * Theming
 */

const sizeStyles = {
  Tiny: {
    ...Fonts.tiny,
  },
  Small: {
    ...Fonts.small,
  },
  Base: {
    ...Fonts.base,
  },
  Large: {
    ...Fonts.large,
  },
  Huge: {
    ...Fonts.huge,
  },
}

const defaultTheme = ({ inline, isEditing, isValid, readOnly, size, value }: PropsT) => ({
  text: {
    display: inline ? 'inline' : 'inline-block',
    boxShadow: 'inset 0px -1px 0px 0px transparent',
    ...(readOnly
      ? {
          cursor: 'default',
        }
      : null),
    ...(!readOnly
      ? {
          ':hover': {
            boxShadow: `inset 0px -1px 0px 0px ${Colors.grey300}`,
          },
        }
      : null),
    ...(!value
      ? {
          minWidth: '0.1em',
        }
      : null),
    ...(isEditing
      ? {
          boxShadow: `inset 0px -1px 0px 0px ${Colors.grey300}`,
        }
      : null),
    ...(sizeStyles[size] || sizeStyles.Base),
    textDecoration: !isValid ? `underline wavy ${Colors.danger}` : null,
  },
})

/**
 * Exporting
 */

const ThemedEditableText = Theme('EditableText', defaultTheme, { withRef: true })(
  EditableText
)
export default ThemedEditableText
