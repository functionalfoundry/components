/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations'
import Theme from 'js-theme'

type PropsT = {
  beforeClose: Function,
  children: React.Children,
  isOpened: bool,
  onClose: Function,
  onOpen: Function,
  onUpdate: Function,
  theme: Object,
}

type StateT = {
  isActive: boolean,
}

const defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  onUpdate: () => {},
  onCreateNode: () => {},
  theme: {},
}

class Portal extends React.Component {
  props: PropsT
  state: StateT
  node: ?Node
  portal: ?React.Element<any>
  static defaultProps = defaultProps

  constructor() {
    super()
    this.state = { isActive: false }
    this.node = null
    this.portal = null
  }

  componentDidMount() {
    if (this.props.isOpened) {
      this.openPortal()
    }
  }

  componentWillReceiveProps(newProps: PropsT) {
    // portal's 'is open' state is handled through the prop isOpened
    if (typeof newProps.isOpened !== 'undefined') {
      if (newProps.isOpened) {
        if (this.state.isActive) {
          this.renderPortal(newProps)
        } else {
          this.openPortal(newProps)
        }
      }
      if (!newProps.isOpened && this.state.isActive) {
        this.closePortal()
      }
    }

    // portal handles its own 'is open' state
    if (typeof newProps.isOpened === 'undefined' && this.state.isActive) {
      this.renderPortal(newProps)
    }
  }

  shouldComponentUpdate(nextProps: PropsT, nextState: StateT) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillUnmount() {
    this.closePortal(true)
  }

  openPortal = (props: PropsT = this.props) => {
    this.setState({ isActive: true })
    this.renderPortal(props)
    this.props.onOpen(this.node)
  }

  closePortal = (isUnmounted: boolean = false) => {
    const resetPortalState = () => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node)
        document.body.removeChild(this.node)
      }
      this.portal = null
      this.node = null
      if (isUnmounted !== true) {
        this.setState({ isActive: false })
      }
    }

    if (this.state.isActive) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState)
      } else {
        resetPortalState()
      }

      this.props.onClose()
    }
  }

  applyTheme = (props) => {
    const { theme } = props
    if (theme.portal && theme.portal.className && this.node) {
      this.node.className = theme.portal.className
    }
    if (theme.portal && theme.portal.style) {
      // React 15.1.0+ requires third parameter in debug mode
      /* eslint-disable no-underscore-dangle */
      CSSPropertyOperations.setValueForStyles(this.node,
                                              theme.portal.style,
                                              this._reactInternalInstance)
    }
  }

  renderPortal = (props: PropsT) => {
    if (!this.node) {
      this.node = document.createElement('div')
      // apply CSS before the node is added to the DOM to avoid needless reflows
      this.applyTheme(props)
      document.body.appendChild(this.node)
    } else {
      // update CSS when new props arrive
      this.applyTheme(props)
    }

    let children = props.children
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    // if (typeof props.children.type === 'function') {
      // children = React.cloneElement(props.children, { closePortal: this.closePortal })
    // }
    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate,
    )
    this.props.onCreateNode(this.portal)
  }

  render() {
    return null
  }
}

const defaultTheme = {
  portal: {
    zIndex: 1000, // TODO: Get from patterns
  },
}

export default Theme('Portal', defaultTheme)(Portal)
