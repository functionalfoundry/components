/* @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import View from '../View'
import KEYCODES from '../constants/KEYCODES'
import ListItem from './ListItem'

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

const defaultProps = {
  renderer: ({ datum, ...props }: RendererPropsT) => (
    <ListItem {...props}>
      {datum}
    </ListItem>
  ),
}

const getSelectableChildren = children => React.Children.toArray(children)

class List extends React.Component {
  props: PropsT
  state: StateT

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

  handleKeyDown = event => {
    const { data, children } = this.props
    const selectableChildLength = data
      ? data.length
      : getSelectableChildren(children).length

    if (!this.props.isKeyboardFocused) {
      return
    }
    event.preventDefault()
    switch (event.keyCode) {
      case KEYCODES.ArrowUp:
        this.setState(prevState => ({
          /** Can't keyboard navigate past the top of the list */
          keyboardFocusedIndex: Math.max(prevState.keyboardFocusedIndex - 1, 0),
        }))
        break
      case KEYCODES.ArrowDown:
        this.setState(prevState => ({
          /** Can't keyboard navigate past the bottom of the list */
          keyboardFocusedIndex: Math.min(
            prevState.keyboardFocusedIndex + 1,
            selectableChildLength - 1
          ),
        }))
        break
      case KEYCODES.Enter:
        this.handleSelect(this.state.keyboardFocusedIndex)
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
      ? <View {...props} {...theme.list}>
          {data.map((datum, index) => (
            <Renderer
              datum={datum}
              isKeyboardFocused={index === keyboardFocusedIndex}
              isSelected={index === selectedIndex}
              key={index}
              onClick={() => this.handleSelect(index)}
              theme={theme}
            />
          ))}
          {children}
        </View>
      : <View {...props} {...theme.list}>
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              isKeyboardFocused: index === keyboardFocusedIndex,
            })
          )}
        </View>
  }
}

const defaultTheme = {
  list: {
    backgroundColor: 'white',
    color: Colors.grey900,
  },
}

const ThemedList = Theme('List', defaultTheme)(List)
export default ThemedList
