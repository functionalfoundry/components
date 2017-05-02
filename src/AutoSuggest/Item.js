// Based on https://github.com/moroshko/react-autowhatever/blob/f4f83aabbd69a9cb2271e6f4efbb32bbe1a9544d/src/Item.js
import React, { Component, PropTypes } from 'react'
import Theme from 'js-theme'
import { Colors } from '@workflo/styles'
import compareObjects from '../utils/compareObjects'

class Item extends Component {
  static propTypes = {
    sectionIndex: PropTypes.number,
    itemIndex: PropTypes.number.isRequired,
    item: PropTypes.any.isRequired,
    renderItem: PropTypes.func.isRequired,
    renderItemData: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseDown: PropTypes.func,
    onClick: PropTypes.func,
    theme: PropTypes.object,
  }

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props, ['renderItemData'])
  }

  storeItemReference = item => {
    if (item !== null) {
      this.item = item
    }
  }

  onMouseEnter = event => {
    const { sectionIndex, itemIndex } = this.props

    this.props.onMouseEnter(event, { sectionIndex, itemIndex })
  }

  onMouseLeave = event => {
    const { sectionIndex, itemIndex } = this.props

    this.props.onMouseLeave(event, { sectionIndex, itemIndex })
  }

  onMouseDown = event => {
    const { sectionIndex, itemIndex } = this.props

    this.props.onMouseDown(event, { sectionIndex, itemIndex })
  }

  onClick = event => {
    const { sectionIndex, itemIndex } = this.props

    this.props.onClick(event, { sectionIndex, itemIndex })
  }

  render() {
    const {
      item,
      renderItem,
      renderItemData,
      theme,
      isHighlighted,
      ...restProps
    } = this.props

    delete restProps.sectionIndex
    delete restProps.itemIndex

    if (typeof restProps.onMouseEnter === 'function') {
      restProps.onMouseEnter = this.onMouseEnter
    }

    if (typeof restProps.onMouseLeave === 'function') {
      restProps.onMouseLeave = this.onMouseLeave
    }

    if (typeof restProps.onMouseDown === 'function') {
      restProps.onMouseDown = this.onMouseDown
    }

    if (typeof restProps.onClick === 'function') {
      restProps.onClick = this.onClick
    }

    return (
      <li role="option" {...theme.item} {...restProps} ref={this.storeItemReference}>
        {renderItem(item, renderItemData)}
      </li>
    )
  }
}

const defaultTheme = ({ isHighlighted }) => ({
  item: {
    cursor: 'pointer',
    padding: '10px 20px',
    ...getHighlightedStyle(isHighlighted),
  },
})

const getHighlightedStyle = isHighlighted => {
  if (isHighlighted) {
    return {
      backgroundColor: Colors.grey100,
    }
  }
  return {}
}

export default Theme('Item', defaultTheme)(Item)
