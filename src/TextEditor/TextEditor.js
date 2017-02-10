/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {Fonts, Spacing, Colors} from '@workflo/styles'
import View from '../View'
import Slate from 'slate'

/**
 * Code block rendering
 */

const Code = ({ theme, ...props }) => (
  <div
    {...theme.container}
    {...props.attributes}
  >
    <code {...theme.code}>{props.children}</code>
  </div>
)

const defaultCodeTheme = {
  container: {},
  code: {
    ...Fonts.monospace,
  },
}

const ThemedCode = Theme('Code', defaultCodeTheme)(Code)

/**
 * Prop types
 */

type PropsT = {
  text?: string,
  onChange?: Function,
  readOnly?: boolean,
  plugins?: Array<Object>,
}

/**
 * Default properties
 */

const defaultProps = {
  text: '',
  onChange: () => {},
  readOnly: false,
  plugins: [],
}

/**
 * State types
 */

type StateT = {
  state: Slate.State,
  schema: Slate.Schema,
}

/**
 * Utilities
 */

const getEditorStateFromProps = (props: PropsT) => {
  const {text} = props
  return Slate.Raw.deserialize({
    nodes: [
      {
        kind: 'block',
        type: 'code',
        nodes: [
          {
            kind: 'text',
            text: text,
          }
        ]
      }
    ]
  }, {
    terse: true,
  })
}

/**
 * TextEditor component
 */

export default class TextEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor (props: PropsT) {
    super(props)
    this.state = {
      state: getEditorStateFromProps(props),
      schema: {
        nodes: {
          code: ThemedCode,
        }
      }
    }
  }

  componentWillReceiveProps (nextProps: PropsT) {
    if (this.props.text !== nextProps.text) {
      this.setState({
        state: getEditorStateFromProps(nextProps)
      })
    }
  }

  render () {
    return (
      <Slate.Editor
        state={this.state.state}
        schema={this.state.schema}
        plugins={this.props.plugins} 
        style={styles.editor}
        readOnly={this.props.readOnly}
        spellCheck={false}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onDocumentChange={this.handleDocumentChange}
      />
    )
  }

  handleChange = (state: Slate.State) => {
    this.setState({state})
  }

  handleDocumentChange = (document: Slate.Document, state: Slate.State) => {
    const text = Slate.Plain.serialize(state)
    if (text !== this.props.text) {
      this.props.onChange && this.props.onChange(text)
    }
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
