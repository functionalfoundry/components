// Based on https://github.com/reactjs/react-tabs/blob/c7df5b1f30cb94934677ea1708ca4f6be9cc7088/src/components/TabList.js

import React, { PropTypes } from 'react'
import Theme from 'js-theme'
import Tab from './Tab'

let TabList = React.createClass({
  displayName: 'TabList',

  propTypes: {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  },

  render() {
    const { className, children, theme, ...attributes } = this.props

    return (
      <ul {...attributes} {...theme.tabList} role="tablist">
        {children}
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
