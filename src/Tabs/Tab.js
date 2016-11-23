// Based on https://github.com/reactjs/react-tabs/blob/c7df5b1f30cb94934677ea1708ca4f6be9cc7088/src/components/Tab.js

import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Theme from 'js-theme'
import {
  Colors,
  Fonts,
} from '@workflo/styles'

let Tab = React.createClass({
  displayName: 'Tab',

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    focus: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    panelId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      focus: false,
      selected: false,
      id: null,
      panelId: null,
      activeTabClassName: 'ReactTabs__Tab--selected',
      disabledTabClassName: 'ReactTabs__Tab--disabled',
    }
  },

  componentDidMount() {
    this.checkFocus()
  },

  componentDidUpdate() {
    this.checkFocus()
  },

  checkFocus() {
    if (this.props.selected && this.props.focus) {
      findDOMNode(this).focus()
    }
  },

  render() {
    const {
      selected,
      disabled,
      panelId,
      activeTabClassName,
      disabledTabClassName,
      className,
      children,
      theme,
      id,
      ...attributes } = this.props

    delete attributes.focus

    return (
      <li
        {...attributes}
        {...theme.tab}
        role="tab"
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={selected ? '0' : null}
      >
        {children}
      </li>
    )
  },
})

const defaultTheme = ({
  selected,
  disabled,
}) => {

  return {
    tab: {
      ...Fonts.base,
      display: 'inline-block',
      // bottom: '-1px',
      position: 'relative',
      listStyle: 'none',
      padding: '6px 12px',
      cursor: 'pointer',
      ...getSelectedStyle(selected)
    },
  }
}

const getSelectedStyle = (selected) => {
  if (selected) {
    return {
      backgroundColor: Colors.grey200,
      color: 'black',
      borderRadius: 5,
    }
  }
  return {}
}

export default Theme('Tab', defaultTheme)(Tab)
