import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import addEventListener from 'rc-util/lib/Dom/addEventListener'
import Portal from '../Portal'
import getAlignment from './DOMAlign'
import isWindow from './modules/isWindow'

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

class Align extends React.Component {
  static propTypes = {
    childrenProps: PropTypes.object,
    align: PropTypes.object.isRequired,
    target: PropTypes.func,
    onAlign: PropTypes.func,
    monitorBufferTime: PropTypes.number,
    monitorWindowResize: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.any,
    portal: PropTypes.any,
  }

  static defaultProps = {
    target() {
      return window
    },
    onAlign() {
    },
    monitorBufferTime: 50,
    monitorWindowResize: false,
    disabled: false,
  }

  constructor (props) {
    super(props)
    this.state = {
      offsetStyle: {},
    }
  }

  componentDidMount() {
    const props = this.props
    // if parent ref not attached .... use document.getElementById
    this.forceAlign()
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize()
    }
  }

  componentDidUpdate(prevProps) {
    let reAlign = false
    const props = this.props

    if (!props.disabled) {
      if (prevProps.disabled || prevProps.align !== props.align) {
        reAlign = true
      } else {
        const lastTarget = prevProps.target()
        const currentTarget = props.target()
        if (isWindow(lastTarget) && isWindow(currentTarget)) {
          reAlign = false
        } else if (lastTarget !== currentTarget) {
          reAlign = true
        }
      }
    }

    if (reAlign) {
      this.forceAlign()
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
    if (this.resizeHandler) {
      this.bufferMonitor.clear()
      this.resizeHandler.remove()
      this.resizeHandler = null
    }
  }

  forceAlign() {
    const props = this.props
    if (!props.disabled) {
      // const source = ReactDOM.findDOMNode(this)
      setTimeout(() => {
        console.log('find out how to  remove timeout')
        const { offsetStyle } = getAlignment(this._source, this.getTarget(), props.align)
        this.setState({ offsetStyle })
      }, 0)

      // console.log('ALIGN: ', align(source, props.target(), props.align))
      // props.onAlign(source, align(source, props.target, props.align))
    }
  }

  getTarget() {
    return this.refs.target
  }

  render() {
    const { children, portal } = this.props
    const { offsetStyle } = this.state
    const child = React.Children.only(children)
    return (
      <div style={{ position: 'relative', display: 'flex' }}>
        <div
          ref='target'
          style={{
            flex: '0 1 auto',
            display: 'flex',
          }}
        >
          {child}
        </div>
        <Portal
          isOpened={true}
          onCreateNode={(portal) => this._source = portal}
          theme={{
            portal: {
              ...offsetStyle,
              backgroundColor: 'purple',
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

    // if (childrenProps) {
    //   const newProps = {}
    //   for (const prop in childrenProps) {
    //     if (childrenProps.hasOwnProperty(prop)) {
    //       newProps[prop] = this.props[childrenProps[prop]]
    //     }
    //   }
    //   return React.cloneElement(child, newProps)
    // }
    // return child
  }
}

export default Align
