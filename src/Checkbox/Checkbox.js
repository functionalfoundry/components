import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
} from '@workflo/styles'

// TODO: Internal state doesn't work properly due to a js theme bug.
// Only works with a controlled component
class Checkbox extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
  }
  static defaultProps = {
    type: 'checkbox',
    defaultChecked: false,
    readOnly: false,
    onFocus() {},
    onBlur() {},
    onChange() {},
  }
  constructor(props) {
    super(props)
    let checked = false
    if ('checked' in props) {
      checked = props.checked
    } else {
      checked = props.defaultChecked
    }
    this.state = {
      checked,
      focus: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      })
    }
  }

  // shouldComponentUpdate(...args) {
  //   return PureRenderMixin.shouldComponentUpdate.apply(this, args)
  // }

  handleFocus = (e) => {
    this.setState({ focus: true })
    this.props.onFocus(e)
  }

  handleBlur = (e) => {
    this.setState({ focus: false })
    this.props.onBlur(e)
  }

  handleChange = (e) => {
    if (!('checked' in this.props)) {
      this.setState({
        checked: e.target.checked,
      })
    }
    this.props.onChange({
      target: {
        ...this.props,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation()
      },
      preventDefault() {
        e.preventDefault()
      },
    })
  }

  render() {
    const props = { ...this.props }
    const { theme } = props
    // Remove React warning.
    // Warning: Input elements must be either controlled or uncontrolled
    // (specify either the value prop, or the defaultValue prop, but not both).
    delete props.defaultChecked

    const state = this.state
    let checked = state.checked
    if (typeof checked === 'boolean') {
      checked = checked ? 1 : 0
    }
    // const className = classNames({
    //   [props.className]: !!props.className,
    //   [prefixCls]: 1,
    //   [`${prefixCls}-checked`]: checked,
    //   [`${prefixCls}-checked-${checked}`]: !!checked,
    //   [`${prefixCls}-focused`]: state.focus,
    //   [`${prefixCls}-disabled`]: props.disabled,
    // })
    return (
      <span
        {...theme.checkbox}
      >
        <span
          {...theme.inner}
        />
        <input
          {...theme.input}
          name={props.name}
          type={props.type}
          readOnly={props.readOnly}
          disabled={props.disabled}
          tabIndex={props.tabIndex}
          checked={!!checked}
          onClick={this.props.onClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      </span>
    )
  }
}

const defaultTheme = (props) => {
  const { disabled, checked } = props
  return {
    checkbox: {
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      outline: 'none',
      display: 'inline-block',
      position: 'relative',
      lineHeight: 1,
      verticalAlign: 'middle',
    },
    inner: {
      ...getInnerStyle(checked),
    },
    input: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 9999,
      cursor: 'pointer',
      opacity: 0,
      width: 28,
      height: 28,
      margin: 0,
    },
  }
}

const getInnerStyle = (checked) => {
  let style = {
    position: 'relative',
    display: 'inline-block',
    width: 28,
    height: 28,
    borderWidth: 0,
    borderRadius: 28,
    // borderColor: '#d9d9d9',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), background-color 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  }
  const common = {
    transform: 'rotate(45deg)',
    position: 'absolute',
    left: 10,
    top: 6,
    display: 'table',
    width: 6,
    height: 12,
    borderTop: 0,
    borderLeft: 0,
    content: '" "',
    animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    animationDuration: '0.3s',
    animationName: 'amCheckboxOut',
  }
  if (!checked) {
    style.backgroundColor = '#ffffff'
    style.boxShadow = `inset 0 2px 2px ${Colors.grey400}`
    style[':after'] = {
      border: '2px solid #ffffff',
      ...common,
    }
  } else {
    style.backgroundColor = Colors.grey800
    style.boxShadow = `inset 0 2px 2px #0c0c0c`
    style[':after'] = {
      border: `2px solid ${Colors.primary}`,
      ...common,
    }
  }
  return style
}

const ThemedCheckbox = Theme('Checkbox', defaultTheme)(Checkbox)
export default ThemedCheckbox
