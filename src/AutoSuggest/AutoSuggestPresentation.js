// From https://github.com/moroshko/react-autowhatever/blob/f4f83aabbd69a9cb2271e6f4efbb32bbe1a9544d/src/Autowhatever.js

import React, { Component, PropTypes } from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'
import createSectionIterator from '../utils/SectionIterator'
import SectionTitle from './SectionTitle'
import ItemsList from './ItemsList'
import EditableText from '../EditableText'
import Align from '../Align'

const alwaysTrue = () => true
const emptyObject = {}
// const defaultRenderInputComponent = props => <input {...props} />
const defaultRenderInputComponent = props => <EditableText {...props} />
const defaultRenderItemsContainer = ({ children, containerProps }) => (
  <div children={children} {...containerProps} />
)
// const defaultTheme = {
//   container: 'react-autowhatever__container',
//   containerOpen: 'react-autowhatever__container--open',
//   input: 'react-autowhatever__input',
//   itemsContainer: 'react-autowhatever__items-container',
//   itemsList: 'react-autowhatever__items-list',
//   item: 'react-autowhatever__item',
//   itemHighlighted: 'react-autowhatever__item--focused',
//   sectionContainer: 'react-autowhatever__section-container',
//   sectionTitle: 'react-autowhatever__section-title',
// }

class AutoSuggestPresentation extends Component {
  static propTypes = {
    id: PropTypes.string, // Used in aria-* attributes. If multiple AutoSuggestPresentation's are rendered on a page, they must have unique ids.
    multiSection: PropTypes.bool, // Indicates whether a multi section layout should be rendered.
    renderInputComponent: PropTypes.func, // Renders the input component.
    items: PropTypes.array.isRequired, // Array of items or sections to render.
    renderItemsContainer: PropTypes.func, // Renders the items container.
    renderItemsContainerData: PropTypes.object, // Arbitrary data that will be passed to renderItemsContainer()
    renderItem: PropTypes.func, // This function renders a single item.
    renderItemData: PropTypes.object, // Arbitrary data that will be passed to renderItem()
    shouldRenderSection: PropTypes.func, // This function gets a section and returns whether it should be rendered, or not.
    renderSectionTitle: PropTypes.func, // This function gets a section and renders its title.
    getSectionItems: PropTypes.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
    inputComponent: PropTypes.func, // When specified, it is used to render the input element
    inputProps: PropTypes.object, // Arbitrary input props
    itemProps: PropTypes.oneOfType([
      // Arbitrary item props
      PropTypes.object,
      PropTypes.func,
    ]),
    highlightedSectionIndex: PropTypes.number, // Section index of the focused item
    highlightedItemIndex: PropTypes.number, // Highlighted item index (within a section)
    theme: PropTypes.oneOfType([
      // Styles. See: https://github.com/markdalgleish/react-themeable
      PropTypes.object,
      PropTypes.array,
    ]),
  }

  static defaultProps = {
    id: '1',
    multiSection: false,
    renderInputComponent: defaultRenderInputComponent,
    renderItemsContainer: defaultRenderItemsContainer,
    renderItemsContainerData: emptyObject,
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
    highlightedSectionIndex: null,
    highlightedItemIndex: null,
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
    this.onHighlightedItemChange = this.onHighlightedItemChange.bind(this)
    this.getItemId = this.getItemId.bind(this)
  }

  componentDidMount() {
    this.ensureHighlightedItemIsVisible()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setSectionsItems(nextProps)
    }

    if (
      nextProps.items !== this.props.items ||
      nextProps.multiSection !== this.props.multiSection
    ) {
      this.setSectionIterator(nextProps)
    }
  }

  componentDidUpdate() {
    this.ensureHighlightedItemIsVisible()
  }

  setSectionsItems(props) {
    if (props.multiSection) {
      this.sectionsItems = props.items.map(section => props.getSectionItems(section))
      this.sectionsLengths = this.sectionsItems.map(items => items.length)
      this.allSectionsAreEmpty = this.sectionsLengths.every(
        itemsCount => itemsCount === 0
      )
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

      // Chain the ref call up via the input props
      const { inputProps } = this.props
      if (inputProps.ref !== null && inputProps.ref !== undefined) {
        inputProps.ref(input)
      }
    }
  }

  storeItemsContainerReference(itemsContainer) {
    if (itemsContainer !== null) {
      this.itemsContainer = itemsContainer
    }
  }

  onHighlightedItemChange(focusedItem) {
    this.focusedItem = focusedItem
  }

  getItemId(sectionIndex, itemIndex) {
    if (itemIndex === null) {
      return null
    }

    const { id } = this.props
    const section = sectionIndex === null ? '' : `section-${sectionIndex}`

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
      highlightedSectionIndex,
      highlightedItemIndex,
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
            highlightedItemIndex={
              highlightedSectionIndex === sectionIndex ? highlightedItemIndex : null
            }
            onHighlightedItemChange={this.onHighlightedItemChange}
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
      highlightedSectionIndex,
      highlightedItemIndex,
      itemProps,
      // theme,
    } = this.props

    return (
      <ItemsList
        items={items}
        itemProps={itemProps}
        renderItem={renderItem}
        renderItemData={renderItemData}
        highlightedItemIndex={
          highlightedSectionIndex === null ? highlightedItemIndex : null
        }
        onHighlightedItemChange={this.onHighlightedItemChange}
        getItemId={this.getItemId}
        keyPrefix={`react-autowhatever-${id}-`}
      />
    )
  }

  onKeyDown(event) {
    const { inputProps, highlightedSectionIndex, highlightedItemIndex } = this.props

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        const nextPrev = event.key === 'ArrowDown' ? 'next' : 'prev'
        const [
          newHighlightedSectionIndex,
          newHighlightedItemIndex,
        ] = this.sectionIterator[nextPrev]([
          highlightedSectionIndex,
          highlightedItemIndex,
        ])

        inputProps.onKeyDown(event, {
          newHighlightedSectionIndex,
          newHighlightedItemIndex,
        })
        break
      }

      default:
        inputProps.onKeyDown(event, { highlightedSectionIndex, highlightedItemIndex })
    }
  }

  ensureHighlightedItemIsVisible() {
    const { focusedItem } = this

    if (!focusedItem) {
      return
    }

    const { itemsContainer } = this
    const itemOffsetRelativeToContainer = focusedItem.offsetParent === itemsContainer
      ? focusedItem.offsetTop
      : focusedItem.offsetTop - itemsContainer.offsetTop

    let { scrollTop } = itemsContainer // Top of the visible area

    if (itemOffsetRelativeToContainer < scrollTop) {
      // Item is off the top of the visible area
      scrollTop = itemOffsetRelativeToContainer
    } else if (
      itemOffsetRelativeToContainer + focusedItem.offsetHeight >
      scrollTop + itemsContainer.offsetHeight
    ) {
      // Item is off the bottom of the visible area
      scrollTop =
        itemOffsetRelativeToContainer +
        focusedItem.offsetHeight -
        itemsContainer.offsetHeight
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
      renderItemsContainerData,
      highlightedSectionIndex,
      highlightedItemIndex,
      theme,
    } = this.props
    const renderedItems = multiSection ? this.renderSections() : this.renderItems()
    const isOpen = renderedItems !== null
    const ariaActivedescendant = this.getItemId(
      highlightedSectionIndex,
      highlightedItemIndex
    )

    const itemsContainerId = `react-autowhatever-${id}`

    const inputComponentProps = Object.assign(
      {},
      {
        type: 'text',
        value: '',
        autoComplete: 'off',
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-owns': itemsContainerId,
        'aria-expanded': isOpen,
        'aria-haspopup': isOpen,
        'aria-activedescendant': ariaActivedescendant,
      },
      theme.input,
      this.props.inputProps,
      {
        onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
        ref: this.storeInputReference,
      }
    )

    const inputComponent = renderInputComponent(inputComponentProps)

    const itemsContainer = renderItemsContainer({
      children: renderedItems,
      containerProps: Object.assign(
        {},
        {
          id: itemsContainerId,
        },
        theme.itemsContainer,
        {
          ref: this.storeItemsContainerReference,
        }
      ),
      data: renderItemsContainerData,
    })

    return (
      <Align
        {...theme.container}
        position="Bottom Left"
        gravity="Bottom"
        portal={itemsContainer}
      >
        {inputComponent}
      </Align>
    )
  }
}

const defaultTheme = ({
  items,
  isHighlighted = false, // not yet
}) => {
  // This is quite poor. We're calculating isOpen based on other props. Should
  // we create a presentational component that takes isOpen as a prop so we can
  // use directily
  // const renderedItems = multiSection ? this.renderSections() : this.renderItems()
  const isOpen = items && items.length > 0
  return {
    container: {
      position: 'relative',
      display: 'inline',
    },
    itemsContainer: getItemsContainerStyle(isOpen),
    input: {
      // TODO: isHighlighted
      ...Fonts.base,
      height: 30,
      padding: '10px 20px',
      boxSizing: 'content-box',
      border: 0,
    },
    sectionContainer: {
      borderTop: '1px solid #ccc',
    },
  }
}

const getItemsContainerStyle = isOpen => {
  if (isOpen) {
    return {
      display: 'block',
      position: 'relative',
      top: -1,
      width: 280,
      backgroundColor: '#fff',
      zIndex: 2,
      maxHeight: 260,
      overflowY: 'auto',
      border: `1px solid ${Colors.grey200}`,
      ...Fonts.base,
    }
  }
  return {
    display: 'none',
  }
}

const ThemedAutoSuggestPresentation = Theme('AutoSuggestPresentation', defaultTheme, {
  withRef: true,
})(AutoSuggestPresentation)
export default ThemedAutoSuggestPresentation
