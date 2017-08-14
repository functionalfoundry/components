/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import View from '../View'
import KEYCODES from '../constants/KEYCODES'
import ListItem from './components/ListItem'

type PropsT = {
  children?: React.Children,
  data: Array<any>,
  /**
   * Simulates keyboard navigation w/ up and down arrows. Does not actually focus
   * the keyboard.
   */
  isKeyboardFocused: boolean,
  onSelect: Function,
  selectedIndex?: number,
  renderer: ReactClass<*>,
  theme: Object,
}

type StateT = {
  /** The index of the row in focus through keyboard navigation */
  keyboardFocusedIndex: ?number,
}

type RendererPropsT = {
  datum: any,
  isSelected: boolean,
  onClick: Function,
  theme: Object,
}

/** Helper for finding the index of the next selectable child (i.e. ListItem) */
const findNextSelectableIndex = (currentIndex, children) => {
  const nextSelectableIndex = React.Children
    .toArray(children)
    .slice(currentIndex + 1)
    .reduce((result, child, index) => {
      if (result !== null) {
        return result
      }
      if (child.type.isSelectable) {
        return index + currentIndex + 1
      }
      return null
    }, null)
  /** If there are no more selectable children then return current index */
  return nextSelectableIndex || currentIndex
}

/** Helper for finding the index of the previous selectable child (i.e. ListItem) */
const findPreviousSelectableIndex = (currentIndex, children) => {
  const previousSelectableIndex = React.Children
    .toArray(children)
    .slice(0, currentIndex)
    .reverse()
    .reduce((result, child, index) => {
      if (result !== null) {
        return result
      }
      if (child.type.isSelectable) {
        return +currentIndex - 1 - index
      }
      return null
    }, null)
  /** If there are no more selectable children then return current index */
  return previousSelectableIndex !== null ? previousSelectableIndex : currentIndex
}

const defaultProps = {
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

  static defaultProps = defaultProps

  constructor(props: PropsT) {
    const { isKeyboardFocused } = props
    super(props)
    this.state = {
      keyboardFocusedIndex: isKeyboardFocused ? 0 : null,
    }
  }
  componentWillReceiveProps(nextProps: PropsT) {
    const { isKeyboardFocused } = this.props

    /** Toggle keyboard navigation focus */
    if (isKeyboardFocused !== nextProps.isKeyboardFocused) {
      this.setState(prevState => ({
        keyboardFocusedIndex: prevState.keyboardFocusedIndex ? 0 : null,
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

  handleKeyDown = event => {
    const { data, children } = this.props

    if (!this.props.isKeyboardFocused) {
      return
    }

    switch (event.keyCode) {
      case KEYCODES.ArrowUp:
        this.setState(prevState => ({
          /** Can't keyboard navigate past the top of the list */
          keyboardFocusedIndex: data
            ? Math.max(prevState.keyboardFocusedIndex - 1, 0)
            : findPreviousSelectableIndex(this.state.keyboardFocusedIndex, children),
        }))
        event.preventDefault()
        break
      case KEYCODES.ArrowDown: // eslint-disable-line
        this.setState(prevState => ({
          keyboardFocusedIndex: data
            ? Math.min(prevState.keyboardFocusedIndex + 1, data.length - 1)
            : findNextSelectableIndex(this.state.keyboardFocusedIndex, children),
        }))
        event.preventDefault()
        break
      case KEYCODES.Enter:
        this.handleSelect(this.state.keyboardFocusedIndex)
        event.preventDefault()
        break
      default:
        return
    }
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
      isKeyboardFocused, // eslint-disable-line
      onSelect, // eslint-disable-line
      renderer,
      selectedIndex,
      theme,
      ...props
    } = this.props
    const { keyboardFocusedIndex } = this.state
    const Renderer = renderer
    return data
      ? <View {...props} {...theme.list} ref={this.storeList}>
          {data.map((datum, index) => (
            <Renderer
              datum={datum}
              isKeyboardFocused={index === keyboardFocusedIndex}
              isSelected={index === selectedIndex}
              key={index}
              onClick={() => this.handleSelect(index)}
              theme={theme}
              storeRef={index === keyboardFocusedIndex ? this.storeFocusedListItem : null}
            />
          ))}
          {children}
        </View>
      : <View {...props} {...theme.list} ref={this.storeList}>
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              isKeyboardFocused: index === keyboardFocusedIndex,
              storeRef: index === keyboardFocusedIndex ? this.storeFocusedListItem : null,
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
