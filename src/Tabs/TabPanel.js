// Based on https://github.com/reactjs/react-tabs/blob/c7df5b1f30cb94934677ea1708ca4f6be9cc7088/src/components/TabPanel.js

import React, { PropTypes } from 'react'
import Theme from 'js-theme'

let TabPanel = React.createClass({
  displayName: 'TabPanel',

  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    id: PropTypes.string,
    selected: PropTypes.bool,
    style: PropTypes.object,
    tabId: PropTypes.string,
  },

  contextTypes: {
    forceRenderTabPanel: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      selected: false,
      id: null,
      tabId: null,
    }
  },

  render() {
    const {
      children,
      selected,
      tabId,
      theme,
      ...props
    } = this.props

    return (
      <div
        {...props}
        {...theme.tabPanel}

        role='tabpanel'
        aria-labelledby={tabId}
      >
        {(this.context.forceRenderTabPanel || selected) ? children : null}
      </div>
    )
  },
})

const defaultTheme = ({
  selected,
}) => {
  return {
    tabPanel: {

    },
  }
}

export default Theme('TabPanel', defaultTheme)(TabPanel)