/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import shallowEqualObjects from 'shallow-equal/objects'
import Portal from '../Portal'
import getAlignment from './modules/getAlignment'
import { PositionT, GravityT } from '../types/AlignTypes'

type PropsT = {
  disabled: boolean,
  /** Align will wrap and align its portal element to its child component */
  children: React.Children,
  /** Specifies how the aligned element will be positioned relative to where it is anchored */
  gravity: GravityT,
  isOpen: boolean,
  onRealign: Function,
  /** The element to render inside of a Portal component and align to the target */
  portal: React$Element<any>,
  /** Specifies where on the target element the aligned element will be anchored */
  position: PositionT,
  /** Horizontal offset in pixels applied to calculated position */
  horizontalOffset: number,
  /**
   * A DOM selector for the target which the portal element will be aligned to. Only
   * used in cases where Align is rendered without children. Selector should resolve
   * a single DOM element.
   */
  targetSelector: string,
  theme: Object,
  /** Vertical offset in pixels applied to calculated position */
  verticalOffset: number,
}

type StateT = {
  offsetStyle: Object,
}

class Align extends React.Component {
  props: PropsT
  state: StateT
  bufferMonitor: ?Function
  isUnmountingPortal: boolean
  resizeHandler: ?Function
  _portal: any
  _target: any

  static defaultProps = {
    monitorBufferTime: 50,
    monitorWindowResize: true,
    disabled: false,
    isOpen: true,
    horizontalOffset: 0,
    verticalOffset: 0,
    onRealign: () => {},
  }

  constructor(props: PropsT) {
    super(props)
    this.state = {
      offsetStyle: {
        opacity: 0,
      },
    }
    this.isUnmountingPortal = false
  }

  componentDidMount() {
    const props = this.props
    // if parent ref not attached .... use document.getElementById
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize()
    }
  }

  componentDidUpdate(nextProps: PropsT) {
    if (this.isUnmountingPortal) return
    const props = this.props
    if (!shallowEqualObjects(props, nextProps)) {
      if (!props.disabled && this._portal) {
        this.forceAlign()
      }
    }

    if (props.monitorWindowResize && !props.disabled) {
      this.startMonitorWindowResize()
    } else {
      this.stopMonitorWindowResize()
    }
  }

  componentWillUnmount() {
    this.stopMonitorWindowResize()
  }

  startMonitorWindowResize() {
    if (!this.resizeHandler) {
      // TODO: Add buffering back in and clean up monitor
      // this.bufferMonitor = buffer(this.forceAlign.bind(this), this.props.monitorBufferTime)
      // this.resizeHandler = addEventListener(window, 'resize', this.bufferMonitor.bind(this))
      // this.resizeHandler = addEventListener(window, 'resize', this.forceAlign.bind(this))
    }
  }

  stopMonitorWindowResize() {
    if (this.resizeHandler && this.resizeHandler.remove && this.bufferMonitor) {
      this.bufferMonitor.clear()
      this.resizeHandler.remove()
      this.resizeHandler = null
    }
  }

  forceAlign() {
    if (!this._portal || !this._target) return
    const props = this.props
    const {
      children,
      gravity,
      horizontalOffset,
      onRealign,
      position,
      targetSelector,
      verticalOffset,
    } = props
    if (!props.disabled) {
      setTimeout(() => {
        /* eslint-disable react/no-find-dom-node */
        const sourceNode: any = ReactDOM.findDOMNode(this._portal)
        const targetNode: any = children
          ? ReactDOM.findDOMNode(this._target)
          : document.querySelector(targetSelector)
        /* eslint-enable react/no-find-dom-node */

        const sourceElement: ?Element = sourceNode && sourceNode.nodeType === 1
          ? sourceNode
          : null
        const targetElement: ?Element = targetNode && targetNode.nodeType === 1
          ? targetNode
          : null

        if (sourceElement && targetElement) {
          const offsetStyle = getAlignment(sourceElement, targetElement, {
            gravity,
            horizontalOffset,
            onRealign,
            position,
            verticalOffset,
          })

          this.setState({ offsetStyle })
        }
      }, 0)
    }
  }

  setTarget = (target: any) => {
    this._target = target
  }

  handleCreatePortal = (portal: any) => {
    const hadPortal = !!this._portal
    this._portal = portal
    if (!hadPortal) {
      this.forceAlign()
    }
  }

  handleClose = () => {
    this.isUnmountingPortal = true
  }

  render() {
    const { children, isOpen, portal, theme } = this.props
    const { offsetStyle } = this.state
    const offsetStyleWithOpacity = {
      ...offsetStyle,
      opacity: offsetStyle.transform ? 1 : 0,
    }

    return (
      <span {...theme.align}>
        <span ref={this.setTarget} {...theme.target}>
          {children}
        </span>
        {portal
          ? <Portal
              isOpened={isOpen}
              onCreateNode={this.handleCreatePortal}
              onClose={this.handleClose}
              theme={{
                portal: {
                  ...offsetStyleWithOpacity,
                  position: 'absolute',
                  transition: 'opacity 0.3s',
                  left: 0,
                  top: 0,
                },
              }}
            >
              {portal}
            </Portal>
          : null}
      </span>
    )
  }
}

const defaultTheme = () => ({
  align: {
    position: 'relative',
  },
  target: {
    display: 'inline-block',
  },
})

const ThemedAlign = Theme('Align', defaultTheme)(Align)
export default ThemedAlign
