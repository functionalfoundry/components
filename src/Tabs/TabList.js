// Based on https://github.com/reactjs/react-tabs/blob/c7df5b1f30cb94934677ea1708ca4f6be9cc7088/src/components/TabList.js

import React, { PropTypes } from 'react'
import Theme from 'js-theme'
import Tab from './Tab'

function renderChildren(props) {
  return React.Children.map(props.children, (child) => {
    // if child is not a tab we don't need to clone it
    // since we don't need to add custom props

    if (child.type !== Tab) {
      return child
    }

    const clonedProps = {
      activeTabClassName: props.activeTabClassName,
      disabledTabClassName: props.disabledTabClassName,
    }

    return React.cloneElement(child, clonedProps)
  })
}

let TabList = React.createClass({
  displayName: 'TabList',

  propTypes: {
    className: PropTypes.string,
    activeTabClassName: PropTypes.string,
    disabledTabClassName: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  },

  render() {
    const {
      className,
      activeTabClassName,
      disabledTabClassName,
      children,
      theme,
      ...attributes } = this.props

    return (
      <ul
        {...attributes}
        {...theme.tabList}
        role="tablist"
      >
        {renderChildren({ activeTabClassName, disabledTabClassName, children })}
      </ul>
    )
  },
})

const defaultTheme = () => {
  return {
    tabList: {
      margin: '0 0 10px',
      padding: '0',
    },
  }
}

const ThemedTabList = Theme('TabList', defaultTheme)(TabList)
export default ThemedTabList
