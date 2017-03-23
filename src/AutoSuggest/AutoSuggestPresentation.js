// From https://github.com/moroshko/react-autowhatever/blob/f4f83aabbd69a9cb2271e6f4efbb32bbe1a9544d/src/Autowhatever.js

import React, { Component, PropTypes } from 'react'
import Theme from 'js-theme'
import {
  Fonts,
} from '@workflo/styles'
import createSectionIterator from '../utils/SectionIterator'
import SectionTitle from './SectionTitle'
import ItemsList from './ItemsList'

const alwaysTrue = () => true
const emptyObject = {}
const defaultRenderInputComponent = props => <input {...props} />
const defaultRenderItemsContainer = props => <div {...props} />
// const defaultTheme = {
//   container: 'react-autowhatever__container',
//   containerOpen: 'react-autowhatever__container--open',
//   input: 'react-autowhatever__input',
//   itemsContainer: 'react-autowhatever__items-container',
//   itemsList: 'react-autowhatever__items-list',
//   item: 'react-autowhatever__item',
//   itemFocused: 'react-autowhatever__item--focused',
//   sectionContainer: 'react-autowhatever__section-container',
//   sectionTitle: 'react-autowhatever__section-title',
// }

class AutoSuggestPresentation extends Component {
  static propTypes = {
    id: PropTypes.string,                  // Used in aria-* attributes. If multiple AutoSuggestPresentation's are rendered on a page, they must have unique ids.
    multiSection: PropTypes.bool,          // Indicates whether a multi section layout should be rendered.
    renderInputComponent: PropTypes.func,  // Renders the input component.
    items: PropTypes.array.isRequired,     // Array of items or sections to render.
    renderItemsContainer: PropTypes.func,  // Renders the items container.
    renderItem: PropTypes.func,            // This function renders a single item.
    renderItemData: PropTypes.object,      // Arbitrary data that will be passed to renderItem()
    shouldRenderSection: PropTypes.func,   // This function gets a section and returns whether it should be rendered, or not.
    renderSectionTitle: PropTypes.func,    // This function gets a section and renders its title.
    getSectionItems: PropTypes.func,       // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
    inputComponent: PropTypes.func,        // When specified, it is used to render the input element
    inputProps: PropTypes.object,          // Arbitrary input props
    itemProps: PropTypes.oneOfType([       // Arbitrary item props
      PropTypes.object,
      PropTypes.func
    ]),
    focusedSectionIndex: PropTypes.number, // Section index of the focused item
    focusedItemIndex: PropTypes.number,    // Focused item index (within a section)
    theme: PropTypes.oneOfType([           // Styles. See: https://github.com/markdalgleish/react-themeable
      PropTypes.object,
      PropTypes.array
    ])
  }

  static defaultProps = {
    id: '1',
    multiSection: false,
    renderInputComponent: defaultRenderInputComponent,
    renderItemsContainer: defaultRenderItemsContainer,
    shouldRenderSection: alwaysTrue,
    renderItem: () => {
      throw new Error('`renderItem` must be provided')
    },
    renderItemData: emptyObject,
    renderSectionTitle: () => {
      throw new Error('`renderSectionTitle` must be provided')
    },
    getSectionItems: () => {
      throw new Error('`getSectionItems` must be provided')
    },
    inputProps: emptyObject,
    itemProps: emptyObject,
    focusedSectionIndex: null,
    focusedItemIndex: null,
    theme: {},
  }

  constructor(props) {
    super(props)

    this.focusedItem = null

    this.setSectionsItems(props)
    this.setSectionIterator(props)

    this.onKeyDown = this.onKeyDown.bind(this)
    this.storeInputReference = this.storeInputReference.bind(this)
    this.storeItemsContainerReference = this.storeItemsContainerReference.bind(this)
    this.onFocusedItemChange = this.onFocusedItemChange.bind(this)
    this.getItemId = this.getItemId.bind(this)
  }

  componentDidMount() {
    this.ensureFocusedItemIsVisible()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setSectionsItems(nextProps)
    }

    if (nextProps.items !== this.props.items || nextProps.multiSection !== this.props.multiSection) {
      this.setSectionIterator(nextProps)
    }
  }

  componentDidUpdate() {
    this.ensureFocusedItemIsVisible()
  }

  setSectionsItems(props) {
    if (props.multiSection) {
      this.sectionsItems = props.items.map(section => props.getSectionItems(section))
      this.sectionsLengths = this.sectionsItems.map(items => items.length)
      this.allSectionsAreEmpty = this.sectionsLengths.every(itemsCount => itemsCount === 0)
    }
  }

  setSectionIterator(props) {
    this.sectionIterator = createSectionIterator({
      multiSection: props.multiSection,
      data: props.multiSection ? this.sectionsLengths : props.items.length,
    })
  }

  storeInputReference(input) {
    if (input !== null) {
      this.input = input
    }
  }

  storeItemsContainerReference(itemsContainer) {
    if (itemsContainer !== null) {
      this.itemsContainer = itemsContainer
    }
  }

  onFocusedItemChange(focusedItem) {
    this.focusedItem = focusedItem
  }

  getItemId(sectionIndex, itemIndex) {
    if (itemIndex === null) {
      return null
    }

    const { id } = this.props
    const section = (sectionIndex === null ? '' : `section-${sectionIndex}`)

    return `react-autowhatever-${id}-${section}-item-${itemIndex}`
  }

  renderSections() {
    if (this.allSectionsAreEmpty) {
      return null
    }

    const {
      id,
      items,
      renderItem,
      renderItemData,
      shouldRenderSection,
      renderSectionTitle,
      focusedSectionIndex,
      focusedItemIndex,
      itemProps,
      theme,
    } = this.props

    return items.map((section, sectionIndex) => {
      if (!shouldRenderSection(section)) {
        return null
      }

      const keyPrefix = `react-autowhatever-${id}-`
      const sectionKeyPrefix = `${keyPrefix}section-${sectionIndex}-`

      // `key` is provided by theme()
      /* eslint-disable react/jsx-key */
      return (
        <div {...theme.sectionContainer}>
          <SectionTitle
            section={section}
            renderSectionTitle={renderSectionTitle}
            sectionKeyPrefix={sectionKeyPrefix}
          />
          <ItemsList
            items={this.sectionsItems[sectionIndex]}
            itemProps={itemProps}
            renderItem={renderItem}
            renderItemData={renderItemData}
            sectionIndex={sectionIndex}
            focusedItemIndex={focusedSectionIndex === sectionIndex ? focusedItemIndex : null}
            onFocusedItemChange={this.onFocusedItemChange}
            getItemId={this.getItemId}
            keyPrefix={keyPrefix}
            ref={this.storeItemsListReference}
          />
        </div>
      )
      /* eslint-enable react/jsx-key */
    })
  }

  renderItems() {
    const { items } = this.props

    if (items.length === 0) {
      return null
    }

    const {
      id,
      renderItem,
      renderItemData,
      focusedSectionIndex,
      focusedItemIndex,
      itemProps,
      // theme,
    } = this.props

    return (
      <ItemsList
        items={items}
        itemProps={itemProps}
        renderItem={renderItem}
        renderItemData={renderItemData}
        focusedItemIndex={focusedSectionIndex === null ? focusedItemIndex : null}
        onFocusedItemChange={this.onFocusedItemChange}
        getItemId={this.getItemId}
        keyPrefix={`react-autowhatever-${id}-`}
      />
    )
  }

  onKeyDown(event) {
    const { inputProps, focusedSectionIndex, focusedItemIndex } = this.props

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        const nextPrev = (event.key === 'ArrowDown' ? 'next' : 'prev')
        const [newFocusedSectionIndex, newFocusedItemIndex] =
          this.sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex])

        inputProps.onKeyDown(event, { newFocusedSectionIndex, newFocusedItemIndex })
        break
      }

      default:
        inputProps.onKeyDown(event, { focusedSectionIndex, focusedItemIndex })
    }
  }

  ensureFocusedItemIsVisible() {
    const { focusedItem } = this

    if (!focusedItem) {
      return
    }

    const { itemsContainer } = this
    const itemOffsetRelativeToContainer =
      focusedItem.offsetParent === itemsContainer
        ? focusedItem.offsetTop
        : focusedItem.offsetTop - itemsContainer.offsetTop

    let { scrollTop } = itemsContainer // Top of the visible area

    if (itemOffsetRelativeToContainer < scrollTop) {
      // Item is off the top of the visible area
      scrollTop = itemOffsetRelativeToContainer
    } else if (itemOffsetRelativeToContainer + focusedItem.offsetHeight > scrollTop + itemsContainer.offsetHeight) {
      // Item is off the bottom of the visible area
      scrollTop = itemOffsetRelativeToContainer + focusedItem.offsetHeight - itemsContainer.offsetHeight
    }

    if (scrollTop !== itemsContainer.scrollTop) {
      itemsContainer.scrollTop = scrollTop
    }
  }

  render() {
    const {
      id,
      multiSection,
      renderInputComponent,
      renderItemsContainer,
      focusedSectionIndex,
      focusedItemIndex,
      theme,
    } = this.props
    const renderedItems = multiSection ? this.renderSections() : this.renderItems()
    const isOpen = (renderedItems !== null)
    const ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex)

    const itemsContainerId = `react-autowhatever-${id}`
    const inputComponent = renderInputComponent({
      type: 'text',
      value: '',
      autoComplete: 'off',
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-owns': itemsContainerId,
      'aria-expanded': isOpen,
      'aria-haspopup': isOpen,
      'aria-activedescendant': ariaActivedescendant,
      ...theme.input,
      ...this.props.inputProps,
      onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
      ref: this.storeInputReference,
    })
    const itemsContainer = renderItemsContainer({
      id: itemsContainerId,
      ...theme.itemsContainer,
      ref: this.storeItemsContainerReference,
      children: renderedItems,
    })

    return (
      <div {...theme.container}>
        {inputComponent}
        {itemsContainer}
      </div>
    )
  }
}

const defaultTheme = ({
  isOpen = true, // doesn't exist yet
  isFocused = false, // not yet
}) => ({
  container: {
    position: 'relative',
  },
  itemsContainer: getItemsContainerStyle(isOpen),
  input: {
    // TODO: isFocused
    ...Fonts.base,
    width: 240,
    height: 30,
    padding: '10px 20px',
    border: '1px solid #aaa',
    borderRadius: 4,
    boxSizing: 'content-box',
  },
  sectionContainer: {
    borderTop: '1px solid #ccc',
  },
})

const getItemsContainerStyle = (isOpen) => {
  if (isOpen) {
    return {
      display: 'block',
      position: 'relative',
      top: -1,
      width: 280,
      border: '1px solid #aaa',
      backgroundColor: '#fff',
      fontSize: 16,
      lineHeight: '1.25',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      zIndex: 2,
      maxHeight: 260,
      overflowY: 'auto',
    }
  }
  return {
    display: 'none',
  }
}

const ThemedAutoSuggestPresentation = Theme('AutoSuggestPresentation', defaultTheme)(AutoSuggestPresentation)
export default ThemedAutoSuggestPresentation
