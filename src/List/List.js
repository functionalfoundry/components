/* @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import Animations from '@workflo/styles/lib/Animations'

import View from '../View'
import KEYCODES from '../constants/KEYCODES'
import ListItem from './ListItem'

type SizeT = 'Small' | 'Base' | 'Large'

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
  size: SizeT,
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
  size: SizeT,
  theme: Object,
}

const defaultProps = {
  data: [],
  renderer: ({ datum, ...props }: RendererPropsT) => (
    <ListItem {...props}>
      {datum}
    </ListItem>
  ),
  size: 'base',
}

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

  componentWillUnMount() {
    document.removeEventListener(
      'keydown',
      (this.handleKeyDown: KeyboardEventListener),
      true
    )
  }

  handleKeyDown = event => {
    const { data } = this.props
    if (!this.props.isKeyboardFocused) {
      return
    }
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
            data.length - 1
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
      size,
      theme,
      ...props
    } = this.props
    const { keyboardFocusedIndex } = this.state
    const Renderer = renderer
    return (
      <View {...props} {...theme.list}>
        {data.map((datum, index) => (
          <Renderer
            datum={datum}
            isKeyboardFocused={index === keyboardFocusedIndex}
            isSelected={index === selectedIndex}
            key={index}
            onClick={() => this.handleSelect(index)}
            size={size}
            theme={theme}
          />
        ))}
        {children}
      </View>
    )
  }
}

const getFont = (size: SizeT) => {
  switch (size) {
    case 'Small':
      return Fonts.small
    case 'Large':
      return Fonts.large
    case 'Base':
    default:
      return Fonts.base
  }
}

const defaultTheme = ({ size }) => ({
  list: {
    backgroundColor: 'white',
    color: Colors.grey900,
  },
  listItem: {
    ...getFont(size),
    padding: Spacing.tiny,
    ':hover': {
      backgroundColor: Colors.grey200,
    },
    transition: `background-color ${Animations.Timing.t2.animationDuration}s ${Animations.Eases.entrance.animationTimingFunction}`, // eslint-disable-line
  },
  selectedListItem: {
    ...getFont(size),
    backgroundColor: Colors.grey300,
    padding: Spacing.tiny,
  },
  focusedListItem: {
    ...getFont(size),
    backgroundColor: Colors.grey200,
    padding: Spacing.tiny,
  },
})

const ThemedList = Theme('List', defaultTheme)(List)
export default ThemedList
