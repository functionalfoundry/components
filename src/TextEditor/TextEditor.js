/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Fonts, Spacing, Colors } from '@workflo/styles'
import View from '../View'
import Slate from 'slate'

/**
 * Code block rendering
 */

const Code = ({ theme, ...props }) => (
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

  handleChange = (state: Slate.State) => {
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
