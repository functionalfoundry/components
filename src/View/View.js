/* @flow */
import React from 'react'
import Theme from 'js-theme'
import applyLayout from './modules/applyLayout'
import applyNativeMethods from './modules/applyNativeMethods'
import createDOMElement from './modules/createDOMElement'
import normalizeNativeEvent from './modules/normalizeNativeEvent'

type PointerEventsT = 'auto' | 'box-none' | 'box-only' | 'none'
type AccessibilityLiveRegionT = 'assertive' | 'off' | 'polite'
type EdgeInsetsT = {
  top: number,
   left: number,
   bottom: number,
   right: number,
}

type PropsT = {
  children?: React.Children,
  inline?: boolean,
  testID?: string,
  theme: Object,
  accessibilityLabel: string,
  accessibilityLiveRegion: AccessibilityLiveRegionT,
  accessibilityRole: string,
  accessible: bool,
  collapsable: bool,
  hitSlop: EdgeInsetsT,
  onClick: Function,
  onClickCapture: Function,
  onLayout: Function,
  onMoveShouldSetResponder: Function,
  onMoveShouldSetResponderCapture: Function,
  onResponderGrant: Function,
  onResponderMove: Function,
  onResponderReject: Function,
  onResponderRelease: Function,
  onResponderTerminate: Function,
  onResponderTerminationRequest: Function,
  onStartShouldSetResponder: Function,
  onStartShouldSetResponderCapture: Function,
  onTouchCancel: Function,
  onTouchCancelCapture: Function,
  onTouchEnd: Function,
  onTouchEndCapture: Function,
  onTouchMove: Function,
  onTouchMoveCapture: Function,
  onTouchStart: Function,
  onTouchStartCapture: Function,
  pointerEvents: PointerEventsT,
}

const defaultProps = {
  accessible: true,
  theme: {},
}

const View = ({
  inline,
  theme,
  collapsable, // eslint-disable-line
  hitSlop, // eslint-disable-line
  onLayout, // eslint-disable-line
  pointerEvents, // eslint-disable-line
  ...props,
}: PropsT) => {
  const normalizedEventHandlers = eventHandlerNames.reduce((handlerProps, handlerName) => {
    const handler = props[handlerName]
    if (typeof handler === 'function') {
      handlerProps[handlerName] = normalizeEventForHandler(handler, handlerName)
    }
    return handlerProps
  }, {})

  const component = inline ? 'span' : 'div'
  const finalProps = {
    ...props,
    ...theme.view,
    ...normalizedEventHandlers,
  }

  return createDOMElement(component, finalProps)
}

View.defaultProps = defaultProps
View.displayName = 'View'

const defaultTheme = ({
  inline,
  pointerEvents,
}: PropsT) => ({
  view: {
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    position: 'relative',
    // button and anchor reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    textDecorationLine: 'none',
    // list reset
    listStyle: 'none',
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0,
    ...getFlexStyle(inline || false), // TODO: Change to default?
    ...getPointerEventsStyle(pointerEvents),
  },
})

const getFlexStyle = (inline: boolean) => {
  if (inline) {
    return {}
  }
  return {
    alignItems: 'stretch',
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
  }
}

const getPointerEventsStyle = (pointerEvents: PointerEventsT) => {
  if (pointerEvents) {
    return { pointerEvents }
  }
  return {}
}

const eventHandlerNames = [
  'onClick',
  'onClickCapture',
  'onMoveShouldSetResponder',
  'onMoveShouldSetResponderCapture',
  'onResponderGrant',
  'onResponderMove',
  'onResponderReject',
  'onResponderRelease',
  'onResponderTerminate',
  'onResponderTerminationRequest',
  'onStartShouldSetResponder',
  'onStartShouldSetResponderCapture',
  'onTouchCancel',
  'onTouchCancelCapture',
  'onTouchEnd',
  'onTouchEndCapture',
  'onTouchMove',
  'onTouchMoveCapture',
  'onTouchStart',
  'onTouchStartCapture',
]

const normalizeEventForHandler = (handler, handlerName) => {
  // Browsers fire mouse events after touch events. This causes the
  // ResponderEvents and their handlers to fire twice for Touchables.
  // Auto-fix this issue by calling 'preventDefault' to cancel the mouse
  // events.
  const shouldCancelEvent = handlerName.indexOf('onResponder') === 0

  return (e) => {
    e.nativeEvent = normalizeNativeEvent(e.nativeEvent)
    const returnValue = handler(e)
    if (shouldCancelEvent && e.cancelable) {
      e.preventDefault()
    }
    return returnValue
  }
}

export default Theme('View', defaultTheme)(applyLayout(applyNativeMethods(View)))
