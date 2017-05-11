// Based on https://github.com/reactjs/react-tabs/blob/c7df5b1f30cb94934677ea1708ca4f6be9cc7088/src/components/Tab.js

import React from 'react'
import { findDOMNode } from 'react-dom'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

type KindT = 'Primary' | 'Secondary'

type PropsT = {
  id: string,
  focus: boolean,
  selected: boolean,
  disabled: boolean,
  panelId: string,
  /** Primary uses an underline and secondary uses a background color */
  kind: KindT,
  children: React.Children,
  theme: Object,
}

class Tab extends React.Component {
  props: PropsT

  static defaultProps = {
    focus: false,
    selected: false,
    id: null,
    panelId: null,
    kind: 'Secondary',
  }

  componentDidMount() {
    this.checkFocus()
  }

  componentDidUpdate() {
    this.checkFocus()
  }

  checkFocus() {
    if (this.props.selected && this.props.focus) {
      const node = findDOMNode(this)
      if (node !== null) {
        node.focus()
      }
    }
  }

  render() {
    const { selected, disabled, panelId, children, theme, id, ...attributes } = this.props

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
  }
}

const defaultTheme = ({ selected, kind }) => ({
  tab: {
    ...Fonts.base,
    display: 'inline-block',
    // bottom: '-1px',
    position: 'relative',
    listStyle: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    ...getSelectedStyle(selected, kind),
    ...getHoverStyle(selected, kind),
  },
})

const getSelectedStyle = (selected, kind) => {
  if (selected && kind === 'Secondary') {
    return {
      backgroundColor: Colors.grey200,
      color: 'black',
      borderRadius: 5,
    }
  } else if (selected && kind === 'Primary') {
    return {
      borderBottom: `1px solid ${Colors.primary}`,
    }
  }
  return {}
}

const getHoverStyle = (selected, kind) => {
  switch (kind) {
    case 'Primary':
      return {
        ':hover': {
          color: Colors.grey300,
        },
      }
    case 'Secondary':
      return {
        ':hover': {
          backgroundColor: selected ? Colors.grey200 : Colors.grey100,
        },
      }
    default:
      return {}
  }
}

const ThemedTab = Theme('Tab', defaultTheme)(Tab)
export default ThemedTab
