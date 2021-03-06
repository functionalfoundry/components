/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'

export type EventT =
  | 'Click inside'
  | 'Click outside'
  | 'Mouse enter'
  | 'Mouse leave'
  | 'Hit Escape'
  | 'Blur'
  | 'Focus'

type PropsT = {
  children: React.Children,
  triggerOn: Array<EventT>,
  onTrigger: Function,
  getTriggerDisabled: Function,
}

const defaultProps = {
  children: <div />,
  triggerOn: [],
  onTrigger: () => {},
  getTriggerDisabled: () => false,
}

// TODO: Use PureComponent
class Trigger extends React.Component {
  props: PropsT
  static defaultProps = defaultProps
  node: ?Node

  componentDidMount() {
    this.bindEvents()
  }

  willReceiveProps(nextProps) {
    // TODO
  }

  componentWillUnmount() {
    const { shouldTrigger } = this
    if (shouldTrigger('Click outside')) {
      document.removeEventListener('mouseup', this.handleDocumentClick, true)
      document.removeEventListener('touchstart', this.handleDocumentClick, true)
    }
    if (shouldTrigger('Hit escape')) {
      document.removeEventListener('keydown', this.handleKeyDown, true)
    }
  }

  bindEvents = () => {
    const { shouldTrigger } = this
    if (shouldTrigger('Click outside')) {
      // Clicking out should only fire after mouse up to prevent accidental closes
      document.addEventListener('mouseup', this.handleDocumentClick, true)
      document.addEventListener('touchstart', this.handleDocumentClick, true)
    }

    if (shouldTrigger('Escape')) {
      document.addEventListener('keydown', this.handleKeyDown, true)
    }
  }

  handleDocumentClick = (event: MouseEvent) => {
    const node = this.node || {}
    if (!node.contains(event.target)) {
      this.trigger()
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === KEYCODES.ESCAPE) {
      this.trigger()
    }
  }

  trigger = e => {
    const { getTriggerDisabled } = this.props
    if (!getTriggerDisabled()) {
      this.props.onTrigger(e)
    }
  }

  shouldTrigger = (val: EventT) => this.props.triggerOn.indexOf(val) !== -1

  render() {
    const {
      children,
      triggerOn, // eslint-disable-line no-unused-vars
      onTrigger, // eslint-disable-line no-unused-vars
      getTriggerDisabled, // eslint-disable-line no-unused-vars
      ...props
    } = this.props
    const { shouldTrigger, trigger } = this

    const child = React.Children.only(children)
    const childProps = {
      ...props,
      ref: (node: Node) => {
        this.node = ReactDOM.findDOMNode(node)
        if (child.ref && typeof child.ref === 'function') {
          child.ref(node)
        }
      },
    }

    if (shouldTrigger('Click inside')) {
      // TODO: Call original handlers
      childProps.onClick = trigger
    }
    if (shouldTrigger('Mouse enter')) {
      childProps.onMouseEnter = trigger
    }
    if (shouldTrigger('Mouse leave')) {
      childProps.onMouseLeave = trigger
    }
    if (shouldTrigger('Blur')) {
      childProps.onBlur = trigger
    }
    if (shouldTrigger('Focus')) {
      childProps.onFocus = trigger
    }

    return React.cloneElement(child, childProps)
  }
}

const KEYCODES = {
  ESCAPE: 27,
}

export default Trigger
