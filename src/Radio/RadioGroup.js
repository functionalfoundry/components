import React from 'react'
import Theme from 'js-theme'
import View from '../View'

type PropsT = {
  innerContainer: React.Element,
  children: any,
  value: Boolean,
  disabled: Boolean,
  onChange: Function,
  theme: Object,
}

const defaultProps = {
  innerContainer: null,
  value: false,
  disabled: false,
  onChange: () => {},
}

class RadioGroup extends React.Component {
  props: PropsT

  constructor(props: PropsT) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    if (this.props.disabled) {
      return
    }
    const { onChange } = this.props

    let newState = {
      value: value,
    }
    this.setState(newState, () => {
      onChange(value, this.state)
    })
  }

  render() {
    const { children, disabled, innerContainer, theme } = this.props
    const { value } = this.props

    const radios = React.Children.map(children, (child, index) => {
      // TODO check if child is Radio first
      return React.cloneElement(child, {
        key: index,
        checked: value === child.props.value,
        disabled: disabled || child.props.disabled,
        style: {
          marginRight: 40,
        },
        onChange: this.handleChange,
      })
    })

    return (
      <View {...theme.radioGroup}>
        {innerContainer &&
          React.cloneElement(innerContainer, {
            children: radios,
          })}
        {!innerContainer && radios}
      </View>
    )
  }
}

RadioGroup.defaultProps = defaultProps

const defaultTheme = {
  radioGroup: {
    justifyContent: 'left',
    flexDirection: 'column',
    ':child': {
      margin: 20,
    },
  },
}

const ThemedRadioGroup = Theme('RadioGroup', defaultTheme)(RadioGroup)
export default ThemedRadioGroup
