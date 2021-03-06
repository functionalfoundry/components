import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'

type PropsT = {
  children: any,
  value: boolean,
  checked: boolean,
  label: ?string,
  disabled: boolean,
  onChange: Function,
  theme: Object,
}

const defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => {},
}

class Radio extends React.Component {
  props: PropsT

  constructor(props: PropsT) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const { checked, value, disabled, onChange } = this.props
    if (disabled) {
      return
    }
    if (!checked) {
      onChange(value) // TODO: Wrap this in a closure in RadioGroup
    }
  }

  render() {
    const { checked, label, disabled, theme } = this.props

    return (
      <div {...theme.container} onClick={this.handleClick}>
        <input
          {...theme.input}
          readOnly
          ref="input"
          type="radio"
          checked={checked}
          disabled={disabled}
        />
        <span {...theme.outer}>
          {checked &&
            <svg
              {...theme.inner}
              viewBox="0 0 120 120"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="50" />
            </svg>}
        </span>
        {label &&
          <span {...theme.label}>
            {label}
          </span>}
      </div>
    )
  }
}

Radio.defaultProps = defaultProps

const defaultTheme = ({ checked }: PropsT) => ({
  container: {
    ...Fonts.base,
    display: 'flex',
    cursor: 'pointer',
    color: Colors.grey200,
    marginBottom: 3, // TODO: Remove when we can target children from RadioGroup
  },
  input: {
    display: 'none',
    width: '100%',
    height: '100%',
  },
  outer: {
    ...getBackground(checked),
    // boxShadow: `inset 0 2px 2px rgba(25,28,32, .3)`,
    position: 'relative',
    display: 'inline-block',
    // background: 'white',
    // border: '1px solid #989A9B',
    borderRadius: '50%',
    transition: '.25s',
    cursor: 'pointer',
    overflow: 'visible',
    width: 21,
    height: 21,
    marginRight: Spacing.tiny,
    ':focus': {
      outline: 0,
    },
    ':hover': {
      boxShadow: `0 0 0 5px ${Colors.grey700}`,
      transition: 'all 0.3s linear',
    },
  },
  inner: {
    fill: Colors.primary,
    overflow: 'visible !important',
    width: 9,
    height: 9,
    position: 'absolute',
    left: 10, // TODO: Use PI
    top: 10,
  },
  label: {
    alignSelf: 'center',
    cursor: 'pointer',
  },
})

const getBackground = checked => {
  if (checked) {
    return {
      backgroundColor: 'rgba(73,79,82, .6)',
      border: 'rgba(73,79,82, .6)',
    }
  }
  return {
    backgroundColor: 'rgba(73,79,82, .75)',
    border: 'rgba(73,79,82, .75)',
  }
}

const ThemedRadio = Theme('Radio', defaultTheme)(Radio)
export default ThemedRadio
