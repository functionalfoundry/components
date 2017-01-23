/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import addEventListener from 'rc-util/lib/Dom/addEventListener'
import Portal from '../Portal'
import getAlignment from './DOMAlign'
import {
  HorizontalT,
  VerticalT,
} from '../types/PortalTypes'

type PropsT = {
  disabled: boolean,
  children: React.Children,
  portal: React.Element<any>,
  isOpen: boolean,
  onRealign: Function,
  targetHorizontal: HorizontalT,
  targetVertical: VerticalT,
  portalHorizontal: HorizontalT,
  portalVertical: VerticalT,
  horizontalOffset: number,
  verticalOffset: number,
  theme: Object,
}

type StateT = {
  offsetStyle: Object,
}

class Align extends React.Component {
  props: PropsT
  state: StateT
  resizeHandler: ?Function
  bufferMonitor: ?Function

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
  }

  componentDidMount() {
    const props = this.props
    // if parent ref not attached .... use document.getElementById
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize()
    }
  }

  componentDidUpdate(prevProps: PropsT) {
    const props = this.props

    if (!props.disabled && this._portal) {
      if (prevProps.disabled) {
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
      this.resizeHandler = addEventListener(window, 'resize', this.forceAlign.bind(this))
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
      portalVertical,
      portalHorizontal,
      targetVertical,
      targetHorizontal,
      horizontalOffset,
      verticalOffset,
      onRealign,
    } = props
    if (!props.disabled) {
      setTimeout(() => {
        const sourceNode = ReactDOM.findDOMNode(this._portal)
        const targetNode = ReactDOM.findDOMNode(this._target)

        const align = {
          offset: [horizontalOffset, verticalOffset],
          points: getPoints(portalVertical, portalHorizontal, targetVertical, targetHorizontal),
          overflow: {
            adjustX: true,
            adjustY: false,
          },
          useCssTransform: true,
          useCssRight: false,
          useCssBottom: false,
          onRealign,
        }

        const { offsetStyle } = getAlignment(sourceNode, targetNode, align)
        this.setState({ offsetStyle })
      }, 0)
    }
  }

  setTarget = (target) => {
    this._target = target
  }

  handleCreatePortal = (portal) => {
    const hadPortal = !!this._portal
    this._portal = portal
    !hadPortal && this.forceAlign()
  }

  render() {
    const {
      children,
      isOpen,
      portal,
      theme,
    } = this.props
    const { offsetStyle } = this.state
    const offsetStyleWithOpacity = {
      ...offsetStyle,
      opacity: offsetStyle.transform ? 1 : 0,
    }
    return (
      <span
        {...theme.align}
      >
        <span
          ref={this.setTarget}
          {...theme.target}
        >
          {children}
        </span>
        <Portal
          isOpened={isOpen}
          onCreateNode={this.handleCreatePortal}
          theme={{
            portal: {
              ...offsetStyleWithOpacity,
              position: 'absolute',
              transition: 'opacity 0.3s',
              // animationName: [bounceAnimation],
              // animationDuration: '3s, 1200ms',
              left: 0,
              top: 0,
            },
          }}
        >
          {portal}
        </Portal>
      </span>
    )
  }
}

const bounceAnimation = {
  '0%': { transform: 'scale(0)', opacity: 0 },
  '50%': { transform: 'scale(1.3)', opacity: 0.4 },
  '75%': { transform: 'scale(0.9)', opacity: 0.7 },
  '100%': { transform: 'scale(1)', opacity: 1 },
}

const getPoints = (
  portalVertical: VerticalT,
  portalHorizontal: HorizontalT,
  targetVertical: VerticalT,
  targetHorizontal: HorizontalT
) => {
  const portalAlign = `${verticalMap[portalVertical]}${horizontalMap[portalHorizontal]}`
  const targetAlign = `${verticalMap[targetVertical]}${horizontalMap[targetHorizontal]}`
  return [portalAlign, targetAlign]
}

const verticalMap = {
  Top: 't',
  Center: 'c',
  Bottom: 'b',
}

const horizontalMap = {
  Left: 'l',
  Center: 'c',
  Right: 'r',
}

function buffer(fn, ms) {
  let timer

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function bufferFn() {
    clear()
    timer = setTimeout(fn, ms)
  }

  bufferFn.clear = clear

  return bufferFn
}

const defaultTheme = () => ({
  align: {
    position: 'relative',
  },
  target: {},
})

const ThemedAlign = Theme('Align', defaultTheme)(Align)
export default ThemedAlign
