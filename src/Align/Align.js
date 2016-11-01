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
} from '../../types/PortalTypes'

type PropsT = {
  disabled: boolean,
  children: React.Children,
  portal: React.Element<any>,
  isOpen: boolean,
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
    monitorWindowResize: false,
    disabled: false,
    isOpen: true,
    horizontalOffset: 0,
    verticalOffset: 0,
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
      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime)
      this.resizeHandler = addEventListener(window, 'resize', this.bufferMonitor)
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
    if (!this._target || !this._portal) return
    console.log('forceAlign')
    const props = this.props
    const {
      portalVertical,
      portalHorizontal,
      targetVertical,
      targetHorizontal,
      horizontalOffset,
      verticalOffset,
    } = props
    if (!props.disabled) {
      const sourceNode = ReactDOM.findDOMNode(this._portal)
      const targetNode = this._target

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
      }
      setTimeout(() => {
        const { offsetStyle } = getAlignment(sourceNode, targetNode, align)
        this.setState({ offsetStyle })
      }, 0)
    }
  }

  render() {
    const {
      children,
      isOpen,
      portal,
      theme,
    } = this.props
    const { offsetStyle } = this.state
    const child = React.Children.only(children)
    return (
      <div style={{ position: 'relative', display: 'flex' }}>
        <div
          ref={(target) => this._target = target}
          {...theme.target}
        >
          {child}
        </div>
        <Portal
          isOpened={isOpen}
          onCreateNode={(portal) => {
            this._portal = portal
            this.forceAlign()
          }}
          theme={{
            portal: {
              ...offsetStyle,
              position: 'absolute',
              transition: 'all 0.5s',
              left: 0,
              top: 0,
            },
          }}
        >
          {portal}
        </Portal>
      </div>
    )
  }
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
  target: {
    flex: '0 1 auto',
    display: 'flex',
  },
})

export default Theme('Align', defaultTheme)(Align)
