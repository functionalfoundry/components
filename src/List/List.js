/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import View from '../View'
import KEYCODES from '../constants/KEYCODES'
import ListItem from './components/ListItem'

type PropsT = {
  /**
   * If set to true, then List will not prevent keyboard events from bubbling that
   * it responds to.
   */
  bubbleKeyboardEvents: boolean,
  children?: React.Children,
  data: Array<any>,
  /**
   * **DEPRECATED - use enableKeyboardNavigation instead **
   * Simulates keyboard navigation w/ up and down arrows. Does not actually focus
   * the keyboard.
   */
  isKeyboardFocused: boolean,
  /**
   * If set to true, user can use keyboard (up, down arrows) to change what
   * list item is in focus.
   */
  enableKeyboardNavigation: boolean,
  /**
   * If set to true, then hovering a list item with the mouse will focus that
   * list item.
   */
  enableMouseNavigation: boolean,
  /**
   * Sets the index of the list item which should be focused. If set to anything
   * other than `undefined`, then the List will behave in a 'controlled' mode with
   * regards to focusing items in the list, either through mouse or keyboard interactions.
   */
  focusedIndex?: number,
  /**
   * Determines what the focusedIndex should be on initial render, and also resets
   * the focusedIndex anytime this prop value changes. Does not put component into
   * a controlled mode. Does not do anything if component is controlled.
   */
  initialFocusedIndex: number,
  /**
   * Invoked when a new list item is focused through either the user navigating the list
   * with the keyboard or hovering with the mouse.
   */
  onFocus: (index: ?number, event: Event) => void,
  /**
   * Invoked when a list item is selected either through clicking on a list item
   * or hitting enter while focused on a list item.
   */
  onSelect: Function,
  /**
   * Indicates the currently selected list item in the list. Different from focus,
   * this is semantically equivalent to what the user sets by clicking or hitting
   * 'enter' on a list item.
   */
  selectedIndex?: number,
  /** Renderer is passed in RendererPropsT*/
  renderer: ReactClass<*>,
  /** js-theme theme*/
  theme: Object,
}

type StateT = {
  /** The index of the row in focus through keyboard navigation */
  focusedIndex: ?number,
}

type RendererPropsT = {
  datum: any,
  isSelected: boolean,
  onClick: Function,
  theme: Object,
}

// TODO: Replace both of these helpers w/ a helper to generate a doubly linked list
// which encapsulates the traversal logic.
/** Helper for finding the index of the next selectable child (i.e. ListItem) */
const findNextFocusableIndex = (currentIndex: number, children) => {
  const nextSelectableIndex = React.Children
    .toArray(children)
    .slice(currentIndex + 1)
    .reduce((result, child, index) => {
      if (result !== null) {
        return result
      }
      if (child.type.isFocusable) {
        return index + currentIndex + 1
      }
      return null
    }, null)
  /** If there are no more selectable children then return current index */
  return nextSelectableIndex || currentIndex
}

/** Helper for finding the index of the previous selectable child (i.e. ListItem) */
const findPreviousFocusableIndex = (currentIndex: number, children) => {
  const previousSelectableIndex = React.Children
    .toArray(children)
    .slice(0, currentIndex)
    .reverse()
    .reduce((result, child, index) => {
      if (result !== null) {
        return result
      }
      if (child.type.isFocusable) {
        return currentIndex - 1 - index
      }
      return null
    }, null)
  /** If there are no more selectable children then return current index */
  return previousSelectableIndex !== null ? previousSelectableIndex : currentIndex
}

/** Helper for determining the initially focused list item index based on props */
const getInitialFocusedIndex = (props: PropsT): ?number => {
  const {
    isKeyboardFocused,
    enableKeyboardNavigation,
    initialFocusedIndex,
    focusedIndex,
  } = props
  if (focusedIndex) {
    return focusedIndex
  }
  if (initialFocusedIndex) {
    return initialFocusedIndex
  }
  if (isKeyboardFocused || enableKeyboardNavigation) {
    return 0
  }
  return null
}

const defaultProps = {
  bubbleKeyboardEvents: false,
  enableKeyboardNavigation: false,
  enableMouseNavigation: false,
  isKeyboardFocused: false,
  renderer: ({ datum, ...props }: RendererPropsT) => (
    <ListItem {...props}>
      {datum}
    </ListItem>
  ),
}

class List extends React.Component {
  props: PropsT
  state: StateT
  keyboardFocusedListItem: any
  list: any
  /**
   * Tracks whether we should respond to mouseenter events for navigation. Useful
   * because if user is scrolling with keyboard, may trigger erroneous moustenter
   * events as list is scrolled.
   */
  _isMouseNavigating: boolean

  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    this.state = {
      focusedIndex: getInitialFocusedIndex(props),
    }
  }
  componentWillReceiveProps(nextProps: PropsT) {
    const { focusedIndex, isKeyboardFocused } = nextProps
    if (typeof focusedIndex !== 'undefined') {
      this.setState({ focusedIndex })
    }

    /** Toggle keyboard navigation focus */
    if (isKeyboardFocused !== this.props.isKeyboardFocused) {
      this.setState(prevState => ({
        focusedIndex: prevState.focusedIndex ? 0 : null,
      }))
    }
  }

  componentDidUpdate() {
    this.adjustScroll()
  }

  componentWillMount() {
    document.addEventListener(
      'keydown',
      (this.handleKeyDown: KeyboardEventListener),
      true
    )
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      (this.handleKeyDown: KeyboardEventListener),
      true
    )
  }

  /**
   * If they list item focused by keyboard navigation is not in view, then we scroll
   * the list container so that it is visible.
   */
  adjustScroll() {
    const focusedListItemNode = ReactDOM.findDOMNode(this.keyboardFocusedListItem) // eslint-disable-line
    const listNode = ReactDOM.findDOMNode(this.list) // eslint-disable-line

    if (listNode && focusedListItemNode) {
      const listHeight = listNode.clientHeight
      const listTop = listNode.scrollTop
      const listBottom = listTop + listHeight
      const listItemHeight = focusedListItemNode.offsetHeight
      const listItemTop = focusedListItemNode.offsetTop
      const listItemBottom = listItemTop + listItemHeight
      if (listItemTop < listTop) {
        listNode.scrollTop = listItemTop
      }
      if (listItemBottom > listBottom) {
        listNode.scrollTop = listItemBottom - listHeight
      }
    }
  }

  focusListItem = (index: number, event: Event) => {
    const { focusedIndex, onFocus } = this.props
    if (onFocus) {
      onFocus(index, event)
    }
    /** Only update when not in controlled mode */
    if (typeof focusedIndex === 'undefined') {
      this.setState({
        focusedIndex: index,
      })
    }
  }

  handleKeyDown = event => {
    const {
      bubbleKeyboardEvents,
      data,
      isKeyboardFocused,
      enableKeyboardNavigation,
      children,
    } = this.props
    if (
      (!isKeyboardFocused && !enableKeyboardNavigation) ||
      this.state.focusedIndex === null
    ) {
      return
    }
    const focusedIndex: number = this.state.focusedIndex || 0
    this._isMouseNavigating = false
    const previousIndex = data
      ? Math.max(focusedIndex - 1, 0)
      : findPreviousFocusableIndex(focusedIndex, children)
    const nextIndex = data
      ? Math.min(focusedIndex + 1, data.length - 1)
      : findNextFocusableIndex(focusedIndex, children)

    switch (event.keyCode) {
      case KEYCODES.ArrowUp:
        this.focusListItem(previousIndex, event)
        if (!bubbleKeyboardEvents) {
          event.preventDefault()
        }
        break
      case KEYCODES.ArrowDown:
        this.focusListItem(nextIndex, event)
        if (!bubbleKeyboardEvents) {
          event.preventDefault()
        }
        break
      case KEYCODES.Enter:
        this.handleSelect(this.state.focusedIndex)
        if (!bubbleKeyboardEvents) {
          event.preventDefault()
        }
        break
      default:
        return
    }
  }

  handleMouseEnter = (index: number, syntheticEvent: SyntheticEvent) => {
    const { enableMouseNavigation } = this.props
    if (this._isMouseNavigating && enableMouseNavigation) {
      this.focusListItem(index, syntheticEvent.nativeEvent)
    }
  }

  handleMouseMove = () => {
    this._isMouseNavigating = true
  }

  handleSelect = index => {
    const { onSelect } = this.props
    if (typeof onSelect === 'function') {
      onSelect(index)
    }
  }

  storeFocusedListItem = ref => (this.keyboardFocusedListItem = ref)
  storeList = ref => (this.list = ref)

  render() {
    const {
      children,
      data,
      enableKeyboardNavigation, // eslint-disable-line
      enableMouseNavigation, // eslint-disable-line
      isKeyboardFocused, // eslint-disable-line
      onSelect, // eslint-disable-line
      renderer,
      selectedIndex,
      theme,
      ...props
    } = this.props
    const focusedIndex = this.state.focusedIndex
    const Renderer = renderer
    return data
      ? <View
          {...props}
          {...theme.list}
          onMouseMove={this.handleMouseMove}
          ref={this.storeList}
        >
          {data.map((datum, index) => (
            <Renderer
              datum={datum}
              isFocused={index === focusedIndex}
              isSelected={index === selectedIndex}
              key={index}
              onClick={() => this.handleSelect(index)}
              onMouseEnter={event => this.handleMouseEnter(index, event)}
              theme={theme}
              storeRef={index === focusedIndex ? this.storeFocusedListItem : null}
            />
          ))}
          {children}
        </View>
      : <View
          {...props}
          {...theme.list}
          onMouseMove={this.handleMouseMove}
          ref={this.storeList}
        >
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              onMouseEnter: event => this.handleMouseEnter(index, event),
              isFocused: index === focusedIndex,
              storeRef: index === focusedIndex ? this.storeFocusedListItem : null,
            })
          )}
        </View>
  }
}

const defaultTheme = {
  list: {
    backgroundColor: 'white',
    color: Colors.grey900,
    overflow: 'scroll',
  },
}

const ThemedList = Theme('List', defaultTheme)(List)
export default ThemedList
