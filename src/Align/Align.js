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
   * A ref of the element to align to. Used in cases where children is not
   * specified.
   */
  targetRef: any,
  /**
   * A DOM selector for the target which the portal element will be aligned to. Only
   * used in cases where Align is rendered without children and no targetRef is
   * specified. Selector should resolve a single DOM element.
   */
  targetSelector: string,
  theme: Object,
  /** Vertical offset in pixels applied to calculated position */
  verticalOffset: number,
}

type StateT = {
  offsetStyle: Object,
}

const initialOffsetStyle = {
  opacity: 0,
}

// TODO: In a future version of this component add an 'inline' prop to indicated
// how the wrapping should be done as as not to break layout.
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
      offsetStyle: initialOffsetStyle,
    }
    this.isUnmountingPortal = false
    this.isThrottlingResize = false
  }

  componentDidUpdate(prevProps) {
    if (this.isUnmountingPortal) return
    const props = this.props
    if (!shallowEqualObjects(props, prevProps)) {
      if (!props.disabled && this._portal) {
        this.forceAlign()
      }
    }

    if (props.monitorWindowResize && !props.disabled) {
      // this.startMonitorWindowResize()
    } else {
      this.stopMonitorWindowResize()
    }
  }

  componentWillUnmount() {
    this.stopMonitorWindowResize()
  }

  startMonitorWindowResize() {
    if (!this.resizeHandler) {
      // OPTIMIZE: Make buffering more agressive
      this.resizeHandler = window.addEventListener('resize', this.throttleHandler)
    }
  }

  throttleHandler = () => {
    if (this.isThrottlingResize) {
      return
    }
    this.isThrottlingResize = true
    requestAnimationFrame(() => {
      this.forceAlign()
      this.isThrottlingResize = false
    })
  }

  stopMonitorWindowResize() {
    window.removeEventListener('resize', this.throttleHandler)
    if (this.resizeHandler && this.resizeHandler.remove && this.bufferMonitor) {
      this.bufferMonitor.clear()
      this.resizeHandler.remove()
      this.resizeHandler = null
    }
  }

  forceAlign = () => {
    if (!this._portal || !this._target) return
    const props = this.props
    const { gravity, horizontalOffset, onRealign, position, verticalOffset } = props

    /**
     *  If we're already queueing a timeout, clear it before losing the reference
     *  to this.forceAlignTimeout
     */
    if (this.forceAlignTimeout) {
      clearTimeout(this.forceAlignTimeout)
    }
    if (!props.disabled) {
      this.forceAlignTimeout = setTimeout(() => {
        /* eslint-disable react/no-find-dom-node */
        const sourceNode: any = ReactDOM.findDOMNode(this._portal)
        const targetNode: any = this.getTargetNode(props)

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

  /** Finds the target DOM Node to align to */
  getTargetNode(props: PropsT) {
    const { children, targetRef, targetSelector } = props
    if (children) {
      return ReactDOM.findDOMNode(this._target)
    }
    if (targetRef) {
      return ReactDOM.findDOMNode(targetRef)
    }
    if (targetSelector) {
      return document.querySelector(targetSelector)
    }
    return null
  }

  setTarget = (target: any) => {
    this._target = target
  }

  handleCreatePortal = (portal: any) => {
    const hadPortal = !!this._portal
    this.justCreatedPortal = hadPortal
    this._portal = portal
    if (!hadPortal && this.state.offsetStyle !== initialOffsetStyle) {
      this.forceAlign()
    }
    const props = this.props
    // TODO: if parent ref not attached .... use document.getElementById
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize()
    }
  }

  handleClose = () => {
    this.isUnmountingPortal = true
    clearTimeout(this.forceAlignTimeout)
    this.stopMonitorWindowResize()
    this.setState({ offsetStyle: initialOffsetStyle })
  }

  /**
   *  Calling forceAlign from handleCreatePortal causes an infinite loop
   *  so we're doing this here to make sure that if a resize happens while the
   *  portal is close that we recalculate right after opening.
   */
  handleOpen = () => {
    this.forceAlign()
  }

  render() {
    const { children, isOpen, portal, theme } = this.props
    const { offsetStyle } = this.state
    /**
     * We shouldn't show the Portal until the position has been calculated (as
     * indicated by whether the transform attribute is present)
     */
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
              onOpen={this.handleOpen}
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
