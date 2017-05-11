/** @flow */
// Based on https://github.com/reactjs/react-tabs/blob/c7df5b1f30cb94934677ea1708ca4f6be9cc7088/src/components/TabList.js

import React from 'react'
import Theme from 'js-theme'

type PropsT = {
  children: React.Children,
  theme: any,
}

class TabList extends React.Component {
  displayName: 'TabList'

  props: PropsT

  render() {
    const { children, theme, ...props } = this.props

    return (
      <ul {...props} {...theme.tabList} role="tablist">
        {children}
      </ul>
    )
  }
}

const defaultTheme = () => ({
  tabList: {
    margin: '0 0 10px',
    padding: '0',
  },
})

const ThemedTabList = Theme('TabList', defaultTheme)(TabList)
export default ThemedTabList
