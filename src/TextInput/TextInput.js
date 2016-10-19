/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type PropsT = {
  theme: Object,
  value: String,
  onChange: Function,
}

type StateT = {
  refInput: ?React.Element,
}

class TextInput extends React.Component {

  static defaultProps = {
    theme: {},
    id: -1,
    onChange: () => {},
    value: ''
  }

  constructor(props: PropsT) {
    super(props)
    this.state = {
      refInput: null,
    }
  }

  state: StateT
  props: PropsT

  focus() {
    this._textInput.focus()
  }

  handleChange = (event: MouseEvent) => {
    this.props.onChange(event.target.value)
  }

  render() {
    const {
      theme,
      value,
      ...props,
    } = this.props

    return (
      <input
        {...props}
        {...theme.textInput}
        value={value}
        onChange={this.handleChange}
        ref={(ref: any) => this._textInput = ref}
      />
    )
  }
}

const inputReset = {
  border: 0,
  width: '100%',
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
  },
}

const defaultTheme = {
  textInput: {
    ...inputReset,
    borderBottom: '1px solid black',
    padding: `${Spacing.tiny}px ${Spacing.micro}px`,
    flex: '1 1',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${Colors.grey300}`,
    color: Colors.grey300,
    alignItems: 'center',
    padding: Spacing.tiny,
    ...Fonts.base,
    marginBottom: Spacing.base,
  },
}

export default Theme('TextInput', defaultTheme)(TextInput)
