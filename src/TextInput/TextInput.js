/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type SizeT = 'Small' | 'Base' | 'Large'
type ShadeT = 'Light' | 'Dark'

type PropsT = {
  theme: Object,
  size: SizeT,
  value: string,
  onChange: Function,
  shade: ShadeT,
}

type StateT = {
  refInput: ?React.Element,
}

class TextInput extends React.Component {

  static defaultProps = {
    theme: {},
    id: -1,
    onChange: () => {},
    value: '',
    size: 'Base',
    shade: 'Dark',
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
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
  },
}

const defaultTheme = ({
  size,
  shade,
}: PropsT) => ({
  textInput: {
    ...inputReset,
    ...getSizeStyle(size),
    ...getShadeStyle(shade),
    padding: Spacing.micro,
    flex: '1 1',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${Colors.grey300}`,
    alignItems: 'center',
  },
})

const getSizeStyle = (size) => {
  switch (size) {
    case 'Small':
      return {
        ...Fonts.small,
      }
    case 'Base':
      return {
        ...Fonts.base,
      }
    case 'Large':
      return {
        ...Fonts.large,
      }
    default:
      return {
        ...Fonts.base,
      }
  }
}

const getShadeStyle = (shade: ShadeT) => {
  if (shade === 'Dark') {
    return {
      color: Colors.grey300,
    }
  }
  return {
    color: Colors.grey800,
  }
}

export default Theme('TextInput', defaultTheme, { withRef: true })(TextInput)
