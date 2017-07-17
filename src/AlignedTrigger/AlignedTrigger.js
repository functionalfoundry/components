/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import View from '../View'
import Align from '../Align'
import Trigger, { EventT } from '../Trigger'
import bindTriggerEvents from '../utils/bindTriggerEvents'

type PositionT =
  | 'Top'
  | 'Top Right'
  | 'Right'
  | 'Bottom Right'
  | 'Bottom'
  | 'Bottom Left'
  | 'Left'
  | 'Top Left'

type GravityT = 'Top' | 'Right' | 'Bottom' | 'Left' | 'Corner'

type PropsT = {
  children: React.Children,
  closeTriggers: Array<EventT>,
  /** Forces portal open without being triggered */
  forceOpen: boolean,
  gravity: GravityT,
  horizontalOffset: number,
  onClose: Function,
  onOpen: Function,
  onRealign: Function,
  openTriggers: Array<EventT>,
  portal: React.Element<any>,
  position: PositionT,
  /** Triggers for closing the portal which will be attached to the target element */
  targetCloseTriggers: Array<EventT>,
  targetRef?: any,
  theme: Object,
  verticalOffset: number,
}

type DefaultPropsT = {
  closeTriggers: Array<EventT>,
  forceOpen: false,
  horizontalOffset: number,
  opened: boolean,
  openTriggers: Array<EventT>,
  targetCloseTriggers: Array<EventT>,
  theme: Object,
  verticalOffset: number,
}

type StateT = {
  isOpen: boolean,
}

const defaultProps = {
  closeTriggers: [],
  opened: true,
  openTriggers: [],
  theme: {},
  horizontalOffset: 0,
  targetCloseTriggers: [],
  verticalOffset: 0,
}

// TODO: Use PureComponent
class AlignedTrigger extends React.Component {
  props: PropsT
  state: StateT

  hoverTargetRect: Object
  portal: any
  subscriptions: Array<{ unsubscribe: Function }> = []
  target: any

  static defaultProps: DefaultPropsT = defaultProps
  static onCloseBuffer = null

  constructor(props: PropsT) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { targetRef } = nextProps
    if (targetRef !== this.props.targetRef) {
      this.bindTriggerEventsToTarget(nextProps)
    }
  }

  componentWillUnmount() {
    this.unsubscribeAll()
    this.close()
  }

  componentDidMount() {
    this.bindTriggerEventsToTarget(this.props)
  }

  bindTriggerEventsToTarget(props) {
    const { openTriggers, targetCloseTriggers, targetRef } = props
    this.unsubscribeAll()
    if (targetRef) {
      const node = ReactDOM.findDOMNode(targetRef) // eslint-disable-line
      if (node) {
        this.subscriptions.push(
          bindTriggerEvents(openTriggers, node).subscribe(this.handleOpenTriggers)
        )
        this.subscriptions.push(
          bindTriggerEvents(targetCloseTriggers, node).subscribe(this.handleCloseTriggers)
        )
      }
    }
  }

  handleCloseTriggers = () => {
    this.close()
  }

  handleOpenTriggers = () => {
    this.open()
  }

  storePortal = c => {
    this.portal = c
  }

  storeTarget = c => {
    this.target = c
  }

  open = () => {
    const { onOpen, closeTriggers, targetRef } = this.props
    const target = this.target || targetRef
    // If another AlignedTrigger instance is currently open
    if (AlignedTrigger.onCloseBuffer) {
      // Close open AlignedTrigger
      AlignedTrigger.onCloseBuffer()
    }

    this.setState({
      isOpen: true,
    })
    if (onOpen) {
      onOpen()
    }
    AlignedTrigger.onCloseBuffer = this.close

    if (closeTriggers.indexOf('Mouse leave') !== -1) {
      setTimeout(() => {
        if (
          target !== null &&
          target !== undefined &&
          this.portal !== null &&
          this.portal !== undefined
        ) {
          // Start listening so we an detect when the mouse leaves the target +
          // portal rectangle
          const maybeTargetNode = ReactDOM.findDOMNode(target) // eslint-disable-line
          /** Guarantees that the targetNode exists and is of type Element */
          if (maybeTargetNode && maybeTargetNode.nodeType === 1) {
            const targetNode: any = maybeTargetNode
            const targetRect = targetNode.getBoundingClientRect()
            const portalRect = this.portal.node.getBoundingClientRect()
            this.hoverTargetRect = {
              top: Math.min(targetRect.top, portalRect.top),
              right: Math.max(targetRect.right, portalRect.right),
              bottom: Math.max(targetRect.bottom, portalRect.bottom),
              left: Math.min(targetRect.left, portalRect.left),
            }
            document.addEventListener(
              'mousemove',
              (this.handleMouseMove: MouseEventListener)
            )
          }
        }
      }, 30)
    }
  }

  handleMouseMove = e => {
    const x = e.clientX
    const y = e.clientY
    const { hoverTargetRect } = this
    if (
      x < hoverTargetRect.left ||
      x > hoverTargetRect.right ||
      y < hoverTargetRect.top ||
      y > hoverTargetRect.bottom
    ) {
      // The user moused out of the target + portal rectangle
      document.removeEventListener(
        'mousemove',
        (this.handleMouseMove: MouseEventListener)
      )
      this.close()
    }
  }

  close = () => {
    document.removeEventListener('mousemove', (this.handleMouseMove: MouseEventListener))
    this.setState({ isOpen: false })
    if (this.props.onClose) {
      this.props.onClose()
    }
    AlignedTrigger.onCloseBuffer = null
  }

  unsubscribeAll = () => {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
    this.subscriptions = []
  }

  render() {
    const {
      children,
      closeTriggers,
      forceOpen,
      gravity,
      horizontalOffset,
      onRealign,
      openTriggers,
      portal,
      position,
      targetRef,
      theme,
      verticalOffset,
      ...props
    } = this.props
    // Since we're listening to the document for mouse out we don't need to
    // listen for it from Trigger
    const finalCloseTriggers = closeTriggers.filter(trigger => trigger !== 'Mouse leave')
    return (
      <Align
        {...props}
        {...theme.alignedTrigger}
        position={position}
        gravity={gravity}
        horizontalOffset={horizontalOffset}
        verticalOffset={verticalOffset}
        isOpen={this.state.isOpen || forceOpen}
        onRealign={onRealign}
        portal={
          <Trigger
            triggerOn={finalCloseTriggers}
            onTrigger={this.handleCloseTriggers}
            ref={this.storePortal}
          >
            <View {...theme.portal}>
              {typeof portal === 'function' ? portal({ close: this.close }) : portal}
            </View>
          </Trigger>
        }
        targetRef={targetRef}
      >
        {children &&
          <Trigger
            triggerOn={openTriggers}
            onTrigger={this.handleOpenTriggers}
            ref={this.storeTarget}
          >
            <View inline {...theme.target}>
              {children}
            </View>
          </Trigger>}
      </Align>
    )
  }
}

const defaultTheme = {
  alignedTrigger: {},
  portal: {},
  trigger: {},
  target: {
    display: 'inline-block',
  },
}

export default Theme('AlignedTrigger', defaultTheme)(AlignedTrigger)
