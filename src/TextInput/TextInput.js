/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import mergeProps from 'js-theme/lib/mergeProps'
import { Power3, TweenMax } from 'gsap'

type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge'
type ShadeT = 'Light' | 'Dark'

type PropsT = {
  theme: Object,
  size: SizeT,
  value: string,
  label: string,
  onBlur: Function,
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

  props: PropsT
  textInput: HTMLInputElement
  label: HTMLLabelElement

  componentDidMount() {
    if (this.props.value !== '') {
      this.elevateLabel()
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.elevateLabel()
    }
  }

  select = () => {
    this.textInput.select()
  }

  focus = () => {
    this.textInput.focus()
  }

  elevateLabel = () => {
    TweenMax.set(this.label, {
      transformOrigin: '0% 100%',
    })

    TweenMax.to(this.label, 0.25, {
      y: -25,
      scale: 0.8,
      ease: Power3.easeOut,
    })
  }

  handleBlur = () => {
    const { value, onBlur } = this.props
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
    if (onBlur) onBlur()
  }

  handleChange = (event: MouseEvent) => {
    this.props.onChange(event.target.value)
  }

  render() {
    const { theme, value, label, shade, disableUnderline, ...props } = this.props

    return (
      <span {...theme.inputContain}>
        <input
          {...mergeProps(theme.textInput, { className: 'inputfield' })}
          {...props}
          value={value}
          onChange={this.handleChange}
          onFocus={this.elevateLabel}
          onBlur={this.handleBlur}
          ref={(ref: any) => (this.textInput = ref)}
        />
        <label {...theme.inputLabel} htmlFor="inputfield">
          <div ref={c => (this.label = c)}>{label}</div>
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

const LABEL_MOVE_DISTANCE = 1.2

const defaultTheme = ({ size, shade, disableUnderline }: PropsT) => ({
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
    flex: '1 1',
    backgroundColor: 'rgba(0,0,0,0)',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    ...getSizeStyle(size),
    ...getShadeStyle(shade),
    position: 'relative',
    border: 'none',
    padding: `${LABEL_MOVE_DISTANCE * 0.8}rem 0rem 0.85rem 0rem`,
    display: 'flex',
    WebkitAppearance: 'none' /* for box shadows to show on iOS */,
    width: '100%',
    background: 'transparent',
    ':focus + .inputlabel::after': {
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
    },
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
    height: `calc(100% - ${LABEL_MOVE_DISTANCE}rem)`,
    pointerEvents: 'none',
    fontFamily: 'Khula',
    '::before': {
      ...pseudoStyle(disableUnderline),
    },
    '::after': getUnderlineStyle(disableUnderline),
  },
})

const getUnderlineStyle = (disableUnderline: boolean) => {
  if (disableUnderline) return {}
  return Object.assign({}, pseudoStyle(disableUnderline), {
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: Colors.primary,
    transform: 'translate3d(-100%, 0, 0)',
    transition: 'transform 0.3s cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  })
}

const pseudoStyle = (disableUnderline: boolean) => ({
  content: '" "',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'calc(100% - 10px)',
  borderBottomWidth: disableUnderline ? 0 : 1,
  borderBottomStyle: 'solid',
  borderBottomColor: '#B9C1CA',
})

const getSizeStyle = (size: SizeT) => {
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
