/* @flow */
import React from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'

type PropsT = {
  children: React.Children,
  openByClickOn: React.Element,
  closeOnEsc: bool,
  closeOnOutsideClick: bool,
  isOpened: bool,
  onOpen: Function,
  onClose: Function,
  beforeClose: Function,
  onUpdate: Function,
}

const defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  onUpdate: () => {},
}

export default class Portal extends React.Component {
  defaultProps: defaultProps
  constructor() {
    super()
    this.state = { active: false }
    this.handleWrapperClick = this.handleWrapperClick.bind(this)
    this.closePortal = this.closePortal.bind(this)
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.portal = null
    this.node = null
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown)
    }

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick)
      document.addEventListener('touchstart', this.handleOutsideMouseClick)
    }

    if (this.props.isOpened) {
      this.openPortal()
    }
  }

  componentWillReceiveProps(newProps: PropsT) {
    // portal's 'is open' state is handled through the prop isOpened
    if (typeof newProps.isOpened !== 'undefined') {
      if (newProps.isOpened) {
        if (this.state.active) {
          this.renderPortal(newProps)
        } else {
          this.openPortal(newProps)
        }
      }
      if (!newProps.isOpened && this.state.active) {
        this.closePortal()
      }
    }

    // portal handles its own 'is open' state
    if (typeof newProps.isOpened === 'undefined' && this.state.active) {
      this.renderPortal(newProps)
    }
  }

  shouldComponentUpdate(nextProps: PropsT, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown)
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick)
      document.removeEventListener('touchstart', this.handleOutsideMouseClick)
    }

    this.closePortal(true)
  }

  props: PropsT

  handleWrapperClick(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    if (this.state.active) { return }
    this.openPortal()
  }

  openPortal(props: PropsT = this.props) {
    this.setState({ active: true })
    this.renderPortal(props)
    this.props.onOpen(this.node)
  }

  closePortal(isUnmounted = false) {
    const resetPortalState = () => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node)
        document.body.removeChild(this.node)
      }
      this.portal = null
      this.node = null
      if (isUnmounted !== true) {
        this.setState({ active: false })
      }
    }

    if (this.state.active) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState)
      } else {
        resetPortalState()
      }

      this.props.onClose()
    }
  }

  handleOutsideMouseClick(e) {
    if (!this.state.active) { return }

    const root = findDOMNode(this.portal)
    if (root.contains(e.target) || (e.button && e.button !== 0)) { return }

    e.stopPropagation()
    this.closePortal()
  }

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
      this.closePortal()
    }
  }

  renderPortal(props) {
    if (!this.node) {
      this.node = document.createElement('div')
      // apply CSS before the node is added to the DOM to avoid needless reflows
      // this.applyClassNameAndStyle(props)
      document.body.appendChild(this.node)
    } else {
      // update CSS when new props arrive
      // this.applyClassNameAndStyle(props)
    }

    let children = props.children
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, { closePortal: this.closePortal })
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate
    )
  }

  render() {
    if (this.props.openByClickOn) {
      return React.cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick })
    }
    return null
  }
}

const KEYCODES = {
  ESCAPE: 27,
}
