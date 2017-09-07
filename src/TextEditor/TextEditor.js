/** @flow */

import React from 'react'
import Theme from 'js-theme'
import { Fonts } from '@workflo/styles'
import Slate from 'slate'

/**
 * Code block rendering
 */

type CodePropsT = {
  attributes: any,
  children: React.Children,
  theme: any,
}

const Code = ({ theme, ...props }: CodePropsT) => (
  <div {...theme.container} {...props.attributes}>
    <code {...theme.code}>{props.children}</code>
  </div>
)

const defaultCodeTheme = {
  container: {},
  code: {
    ...Fonts.code,
  },
}

const ThemedCode = Theme('Code', defaultCodeTheme)(Code)

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
  theme?: any,
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

const getEditorStateFromProps = ({ text }: PropsT) =>
  Slate.Raw.deserialize(
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
      state: getEditorStateFromProps(this.props),
      schema: {
        nodes: {
          code: ThemedCode,
        },
      },
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (!nextProps.state) {
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
        onChange={this.handleChange}
      />
    )
  }

  handleChange = ({ state }: Slate.Change) => {
    this.setState({ state })
    const { onChange } = this.props
    if (onChange) {
      onChange(Slate.Plain.serialize(state), state)
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
