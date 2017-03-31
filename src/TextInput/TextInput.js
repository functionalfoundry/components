/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import mergeProps from 'js-theme/lib/mergeProps'
import { Power3, TweenMax } from 'gsap'

type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge'
type ShadeT = 'Light' | 'Dark'

type PropsT = {
  theme: Object,
  size: SizeT,
  value: string,
  label: string,
  onChange: Function,
  shade: ShadeT,
  disableUnderline: boolean,
}

class TextInput extends React.Component {

  static defaultProps = {
    theme: {},
    id: -1,
    onChange: () => {},
    label: '',
    value: '',
    size: 'Base',
    shade: 'Dark',
    disableUnderline: false,
  }

  constructor(props: PropsT) {
    super(props)
  }

  props: PropsT
  textInput: HTMLInputElement
  label: HTMLLabelElement

  componentDidMount() {
    if (this.props.value !== '') {
      this.handleFocus()
    }
  }

  select = () => {
    this.textInput.select()
  }

  focus = () => {
    this.textInput.focus()
  }

  handleFocus = () => {
    TweenMax.set(this.label, {
      transformOrigin: "0% 100%"
    });

    TweenMax.to(this.label, 0.25, {
      y: -25,
      scale: 0.8,
      ease: Power3.easeOut
    });
  }

  handleBlur = () => {
    const { value } = this.props
    if (value === '') {
      TweenMax.set(this.label, {
        transformOrigin: '0% 100%',
      })

      TweenMax.to(this.label, 0.25, {
        y: 0,
        scale: 1,
        ease: Power3.easeIn,
      })
    }
  }

  handleChange = (event: MouseEvent) => {
    this.props.onChange(event.target.value)
  }

  render() {
    const {
      theme,
      value,
      label,
      ...props
    } = this.props

    return (
      <span {...theme.inputContain}>
        <input
          {...mergeProps(theme.textInput, { className: 'inputfield' })}
          {...props}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={(ref: any) => this.textInput = ref}
        />
        <label {...theme.inputLabel} for="inputfield">
          <div ref={c => this.label = c}>{label}</div>
        </label>
      </span>
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
  disableUnderline,
}: PropsT) => ({
  inputContain: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-block',
    maxWidth: 300,
    width: 'calc(100% - 2em)',
    overflow: 'hidden',
  },
  textInput: {
    ...inputReset,
    padding: Spacing.micro,
    flex: '1 1',
    backgroundColor: 'rgba(0,0,0,0)',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    ...getSizeStyle(size),
    ...getShadeStyle(shade),
    position: 'relative',
    display: 'block',
    border: 'none',
    WebkitAppearance: 'none', /* for box shadows to show on iOS */
    padding: '0.85rem 0.15rem',
    width: '100%',
    background: 'transparent',
    ':focus + .inputlabel::after': {
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
    }
  },
  inputLabel: {
    ...getShadeStyle(shade),
    display: 'inline-block',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTouchCallout: 'none',
    userSelect: 'none',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 1rem)',
    pointerEvents: 'none',
    fontFamily: 'Khula',
    '::before': {
      ...pseudoStyle(disableUnderline),
    },
    '::after': getUnderlineStyle(disableUnderline),
  },
})

const getUnderlineStyle = (disableUnderline) => {
  if (disableUnderline) return {}
  return Object.assign({}, pseudoStyle(disableUnderline), {
    borderBottom: `2px solid ${Colors.primary}`,
    transform: 'translate3d(-100%, 0, 0)',
    transition: 'transform 0.3s cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  })
}

const pseudoStyle = (disableUnderline) => ({
  content: '" "',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'calc(100% - 10px)',
  borderBottom: (disableUnderline ? 'none' : '1px solid #B9C1CA'),
})

const getSizeStyle = (size) => {
  switch (size) {
    case 'Tiny':
      return Fonts.tiny
    case 'Small':
      return Fonts.small
    case 'Base':
      return Fonts.base
    case 'Large':
      return {
        ...Fonts.large,
        lineHeight: '40px',
        paddingBottom: 0,
      }
    case 'Huge':
      return {
        ...Fonts.huge,
        lineHeight: '40px',
        paddingBottom: 0,
      }
    default:
      return Fonts.base
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

const ThemedTextInput = Theme('TextInput', defaultTheme, { withRef: true })(TextInput)
export default ThemedTextInput
