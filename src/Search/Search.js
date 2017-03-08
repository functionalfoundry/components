/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import Portal from '../Portal'
import Icon from '../Icon'
import View from '../View'
import TextInput from '../TextInput'

import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type PropsT = {
  // Pass the search results in as children
  children: React.Children,
  show: boolean,
  text: string,
  onSearch: Function,
  onClose: Function,
  theme: Object,
}

type StateT = {
  isFocused: boolean,
}

class Search extends React.Component {
  props: PropsT
  state: StateT
  windowListener: any

  constructor (props: PropsT) {
    super(props)
    this.state = {
      isFocused: false,
    }
  }

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('click', this.handleWindowClick)
    }
  }

  handleClickSearch = () => {
    this.setState({
      isFocused: true,
    }, () => {
      if (window) {
        setTimeout(() => {
          this.windowListener = window.addEventListener('click', this.handleWindowClick)
          this.refs.textInput.getWrappedInstance().focus()
        })
      }
    })
  }

  handleClickOutside = () => {
    this.setState({
      isFocused: false,
    })
    if (window) {
      window.removeEventListener('click', this.handleWindowClick)
    }
  }

  handleWindowClick = (event) => {
    const node = ReactDOM.findDOMNode(this.refs.search)
    if (!node.contains(event.target)) {
      this.handleClickOutside()
    }
  }

  render () {
    const {
      children,
      show,
      onSearch,
      text,
      theme,
    } = this.props
    const {
      isFocused,
    } = this.state

    return (
      <View
        {...theme.search}
        ref='search'
      >
        {show && !isFocused &&
          <View
            {...theme.wrapper}
            onClick={this.handleClickSearch}
          >
            <Icon
              {...theme.searchIcon}
              name='search'
              size='base'
            />
          </View>}
        {show && isFocused &&
          <Portal
            isOpened={true}
            theme={{
              portal: {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, .8)',
                display: 'flex',
                flex: '1 0 auto',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
              },
            }}
          >
            <View
              {...theme.portalWrapper}
              onClick={this.handleClickSearch}
            >
              <View
                {...theme.searchInputWrapper}
              >
                <Icon
                  {...theme.backIcon}
                  name='widget-feed'
                  size='base'
                />
                <TextInput
                  {...theme.input}
                  ref='textInput'
                  value={text}
                  placeholder='Search'
                  onChange={onSearch}
                  disableUnderline
                />
                <Icon
                  {...theme.searchIcon}
                  name='search'
                  size='base'
                />
              </View>
              <View
                {...theme.searchResults}
              >
                {children}
              </View>
            </View>
          </Portal>}
      </View>
    )
  }
}

const defaultTheme = {
  search: {
    ...Fonts.base,
    justifyContent: 'flex-end',
    cursor: 'pointer',
    height: 45,
  },
  input: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'row',
    padding: Spacing.tiny,
    marginRight: Spacing.small,
    marginLeft: Spacing.small,
    borderRight: `1px solid ${Colors.primary}`,
    borderLeft: `1px solid ${Colors.primary}`,
    borderBottom: 0,
    color: Colors.grey200,
  },
  closeIcon: {
    marginRight: Spacing.small,
  },
  searchIcon: {
    cursor: 'pointer',
    marginLeft: Spacing.tiny,
  },
  backIcon: {
    cursor: 'pointer',
    // marginLeft: Spacing.tiny,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: Colors.grey200,
  },
  portalWrapper: {
    flexDirection: 'column',
    alignItems: 'stretch',
    color: Colors.grey200,
    margin: Spacing.base,
    maxWidth: 1200, // FIXME: This is a hack to keep it inline with App max width
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  searchResults: {
    margin: `${Spacing.base}px 0 0 0`,
  },
}
//
// '@media (max-width: 800px)': {
//   position: 'absolute',
//   left: 0,
//   right: 0,
//   top: 0,
// },

const ThemedSearch = Theme('Search', defaultTheme)(Search)
export default ThemedSearch
