// Based on https://github.com/moroshko/react-autowhatever/blob/f4f83aabbd69a9cb2271e6f4efbb32bbe1a9544d/src/ItemsList.js

import React, { Component, PropTypes } from 'react'
import Theme from 'js-theme'
import Item from './Item'
import compareObjects from '../utils/compareObjects'

class ItemsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    itemProps: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    renderItem: PropTypes.func.isRequired,
    renderItemData: PropTypes.object.isRequired,
    sectionIndex: PropTypes.number,
    focusedItemIndex: PropTypes.number,
    onFocusedItemChange: PropTypes.func.isRequired,
    getItemId: PropTypes.func.isRequired,
    theme: PropTypes.object,
  }

  static defaultProps = {
    sectionIndex: null,
  }

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props, ['itemProps'])
  }

  storeFocusedItemReference = (focusedItem) => {
    this.props.onFocusedItemChange(focusedItem === null ? null : focusedItem.item)
  }

  render() {
    const {
      items,
      itemProps,
      renderItem,
      renderItemData,
      sectionIndex,
      focusedItemIndex,
      getItemId,
      theme,
    } = this.props
    const isItemPropsFunction = (typeof itemProps === 'function')

    return (
      <ul role='listbox' {...theme.itemsList}>
        {
          items.map((item, itemIndex) => {
            const isFocused = (itemIndex === focusedItemIndex)
            const itemPropsObj = isItemPropsFunction ? itemProps({ sectionIndex, itemIndex }) : itemProps
            const key = getItemId(sectionIndex, itemIndex)
            // ...theme(itemKey, 'item', isFocused && 'itemFocused'),
            const allItemProps = {
              id: key,
              key,
              ...theme.item,
              ...itemPropsObj,
            }

            if (isFocused) {
              allItemProps.ref = this.storeFocusedItemReference
            }

            // `key` is provided by theme()
            /* eslint-disable react/jsx-key */
            return (
              <Item
                {...allItemProps}
                sectionIndex={sectionIndex}
                itemIndex={itemIndex}
                item={item}
                renderItem={renderItem}
                renderItemData={renderItemData}
                isFocused={isFocused}
                theme={{ item: theme.item }}
              />
            )
            /* eslint-enable react/jsx-key */
          })
        }
      </ul>
    )
  }
}

const defaultTheme = {
  itemsList: {
    backgroundColor: 'white',
    color: 'black',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
}

export default Theme('ItemsList', defaultTheme)(ItemsList)
