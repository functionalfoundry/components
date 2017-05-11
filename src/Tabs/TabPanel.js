/** @flow */
// Based on https://github.com/reactjs/react-tabs/blob/c7df5b1f30cb94934677ea1708ca4f6be9cc7088/src/components/TabPanel.js

import React, { PropTypes } from 'react'
import Theme from 'js-theme'

type PropsT = {
  children: React.Children,
  id: string,
  selected: boolean,
  tabId: string,
  style: any,
  theme: any,
}

class TabPanel extends React.Component {
  props: PropsT

  static contextTypes = {
    forceRenderTabPanel: PropTypes.bool,
  }

  static defaultProps = {
    selected: false,
    id: null,
    tabId: null,
  }

  render() {
    const { children, selected, tabId, theme, ...props } = this.props

    return (
      <div {...props} {...theme.tabPanel} role="tabpanel" aria-labelledby={tabId}>
        {this.context.forceRenderTabPanel || selected ? children : null}
      </div>
    )
  }
}

const defaultTheme = {
  tabPanel: {},
}

const ThemedTabPanel = Theme('TabPanel', defaultTheme)(TabPanel)
export default ThemedTabPanel
