/* @flow */
import React from 'react'
import { Fonts } from '@workflo/styles'
import Slate from 'slate'

import Code from './components/Code'

/**
 * Prop types
 */

type PropsT = {
  state?: Slate.State,
  text?: string,
  onChange?: Function,
  onChangeState?: Function,
  readOnly?: boolean,
  plugins?: Array<Object>,
}

/**
 * Default properties
 */

const defaultProps = {
  text: '',
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
  const { text } = props
  return Slate.Raw.deserialize(
    {
      nodes: [
        {
          kind: 'block',
          type: 'code',
          nodes: [
            {
              kind: 'text',
              text,
            },
          ],
        },
      ],
    },
    { terse: true }
  )
}

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
      state: props.state || getEditorStateFromProps(props),
      schema: {
        nodes: {
          code: Code,
        },
      },
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (this.props.text !== nextProps.text) {
      this.setState({
        state: getEditorStateFromProps(nextProps),
      })
    }
  }

  render() {
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
    this.setState({ state })
    if (this.props.onChangeState) {
      this.props.onChangeState(state)
    }
  }

  handleDocumentChange = (document: Slate.Document, state: Slate.State) => {
    const text = Slate.Plain.serialize(state)
    if (text !== this.props.text && this.props.onChange) {
      this.props.onChange(text)
    }
  }
}

const styles = {
  editor: {
    ...Fonts.code,
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}
