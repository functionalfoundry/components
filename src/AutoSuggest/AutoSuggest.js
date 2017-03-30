// Based on https://github.com/moroshko/react-autosuggest/blob/d805cf0ffc75d57c83f0a04fb8cd558c87fbe0e7/src/Autosuggest.js
import React, { Component, PropTypes } from 'react'
import shallowEqualArrays from 'shallow-equal/arrays'
import AutoSuggestPresentation from './AutoSuggestPresentation'
// import { defaultTheme, mapToAutowhateverTheme } from './theme'

const alwaysTrue = () => true
const defaultShouldRenderSuggestions = value => value.trim().length > 0
const defaultRenderSuggestionsContainer =
  ({ containerProps, children }) => <div {...containerProps}>{children}</div>

export default class Autosuggest extends Component {
  static propTypes = {
    suggestions: PropTypes.array.isRequired,
    onSuggestionsFetchRequested: (props, propName) => {
      const onSuggestionsFetchRequested = props[propName]

      if (typeof onSuggestionsFetchRequested !== 'function') {
        throw new Error('\'onSuggestionsFetchRequested\' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsFetchRequestedProp')
      }
    },
    onSuggestionsClearRequested: (props, propName) => {
      const onSuggestionsClearRequested = props[propName]

      if (props.alwaysRenderSuggestions === false && typeof onSuggestionsClearRequested !== 'function') {
        throw new Error('\'onSuggestionsClearRequested\' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsClearRequestedProp')
      }
    },
    onSuggestionSelected: PropTypes.func,
    renderInputComponent: PropTypes.func,
    renderSuggestionsContainer: PropTypes.func,
    getSuggestionValue: PropTypes.func.isRequired,
    renderSuggestion: PropTypes.func.isRequired,
    inputProps: (props, propName) => {
      const inputProps = props[propName]

      if (!inputProps.hasOwnProperty('value')) {
        throw new Error('\'inputProps\' must have \'value\'.')
      }

      if (!inputProps.hasOwnProperty('onChange')) {
        throw new Error('\'inputProps\' must have \'onChange\'.')
      }
    },
    shouldRenderSuggestions: PropTypes.func,
    alwaysRenderSuggestions: PropTypes.bool,
    multiSection: PropTypes.bool,
    renderSectionTitle: (props, propName) => {
      const renderSectionTitle = props[propName]

      if (props.multiSection === true && typeof renderSectionTitle !== 'function') {
        throw new Error('\'renderSectionTitle\' must be implemented. See: https://github.com/moroshko/react-autosuggest#renderSectionTitleProp')
      }
    },
    getSectionSuggestions: (props, propName) => {
      const getSectionSuggestions = props[propName]

      if (props.multiSection === true && typeof getSectionSuggestions !== 'function') {
        throw new Error('\'getSectionSuggestions\' must be implemented. See: https://github.com/moroshko/react-autosuggest#getSectionSuggestionsProp')
      }
    },
    focusInputOnSuggestionClick: PropTypes.bool,
    highlightFirstSuggestion: PropTypes.bool,
    id: PropTypes.string
  }

  static defaultProps = {
    renderSuggestionsContainer: defaultRenderSuggestionsContainer,
    shouldRenderSuggestions: defaultShouldRenderSuggestions,
    alwaysRenderSuggestions: false,
    multiSection: false,
    focusInputOnSuggestionClick: true,
    highlightFirstSuggestion: false,
    id: '1',
  }

  constructor({ alwaysRenderSuggestions, inputProps }) {
    super()

    this.state = {
      isFocused: false,
      isCollapsed: !alwaysRenderSuggestions,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      valueBeforeUpDown: null,
      initialValue: inputProps && inputProps.value,
    }

    this.justPressedUpDown = false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onDocumentMouseDown)
  }

  componentWillReceiveProps(nextProps) {
    if (shallowEqualArrays(nextProps.suggestions, this.props.suggestions)) {
      if (nextProps.highlightFirstSuggestion &&
          nextProps.suggestions.length > 0 &&
          this.justPressedUpDown === false) {
        this.highlightFirstSuggestion()
      }
    } else {
      if (this.willRenderSuggestions(nextProps)) {
        if (nextProps.highlightFirstSuggestion) {
          this.highlightFirstSuggestion()
        }

        if (this.state.isCollapsed && !this.justSelectedSuggestion) {
          this.revealSuggestions()
        }
      } else {
        this.resetHighlightedSuggestion()
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onDocumentMouseDown)
  }

  updateHighlightedSuggestion(sectionIndex, suggestionIndex, prevValue) {
    this.setState(state => {
      let { valueBeforeUpDown } = state

      if (suggestionIndex === null) {
        valueBeforeUpDown = null
      } else if (valueBeforeUpDown === null && typeof prevValue !== 'undefined') {
        valueBeforeUpDown = prevValue
      }

      return {
        highlightedSectionIndex: sectionIndex,
        highlightedSuggestionIndex: suggestionIndex,
        valueBeforeUpDown,
      }
    })
  }

  resetHighlightedSuggestion(shouldResetValueBeforeUpDown = true) {
    this.setState(state => {
      const { valueBeforeUpDown } = state

      return {
        highlightedSectionIndex: null,
        highlightedSuggestionIndex: null,
        valueBeforeUpDown: shouldResetValueBeforeUpDown ? null : valueBeforeUpDown,
      }
    })
  }

  revealSuggestions() {
    this.setState({
      isCollapsed: false,
    })
  }

  closeSuggestions() {
    this.setState({
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      valueBeforeUpDown: null,
      isCollapsed: true,
    })
  }

  getSuggestion(sectionIndex, suggestionIndex) {
    const { suggestions, multiSection, getSectionSuggestions } = this.props

    if (multiSection) {
      return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex]
    }

    return suggestions[suggestionIndex]
  }

  getHighlightedSuggestion() {
    const { highlightedSectionIndex, highlightedSuggestionIndex } = this.state

    if (highlightedSuggestionIndex === null) {
      return null
    }

    return this.getSuggestion(highlightedSectionIndex, highlightedSuggestionIndex)
  }

  getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
    const { getSuggestionValue } = this.props

    return getSuggestionValue(this.getSuggestion(sectionIndex, suggestionIndex))
  }

  getSuggestionIndices(suggestionElement) {
    const sectionIndex = suggestionElement.getAttribute('data-section-index')
    const suggestionIndex = suggestionElement.getAttribute('data-suggestion-index')

    return {
      sectionIndex: (typeof sectionIndex === 'string' ? parseInt(sectionIndex, 10) : null),
      suggestionIndex: parseInt(suggestionIndex, 10),
    }
  }

  onDocumentMouseDown = event => {
    this.justClickedOnSuggestionsContainer = false

    let node =
      event.detail && event.detail.target || // This is for testing only. Please show me a better way to emulate this.
      event.target

    while (node !== null && node !== document) {
      if (node.getAttribute('data-suggestion-index') !== null) {
        // Suggestion was clicked
        return
      }

      if (node === this.suggestionsContainer) {
        // Something else inside suggestions container was clicked
        this.justClickedOnSuggestionsContainer = true
        return
      }

      node = node.parentNode
    }
  }

  findSuggestionElement(startNode) {
    let node = startNode

    do {
      if (node.getAttribute('data-suggestion-index') !== null) {
        return node
      }

      node = node.parentNode
    } while (node !== null)

    console.error('Clicked element:', startNode) // eslint-disable-line no-console
    throw new Error('Couldn\'t find suggestion element')
  }

  maybeCallOnChange(newValue) {
    const { value, onChange } = this.props.inputProps

    if (newValue !== value) {
      onChange(newValue)
    }
  }

  willRenderSuggestions(props) {
    const { suggestions, inputProps, shouldRenderSuggestions } = props
    const { value } = inputProps

    return suggestions.length > 0 && shouldRenderSuggestions(value)
  }

  storeReferences = autowhatever => {
    if (autowhatever !== null) {
      const { input, itemsContainer } = autowhatever.getWrappedInstance()

      this.input = input
      this.suggestionsContainer = itemsContainer
    }
  }

  onSuggestionMouseEnter = (event, { sectionIndex, itemIndex }) => {
    this.updateHighlightedSuggestion(sectionIndex, itemIndex)
  }

  highlightFirstSuggestion = () => {
    this.updateHighlightedSuggestion(this.props.multiSection ? 0 : null, 0)
  }

  onSuggestionMouseDown = () => {
    this.justSelectedSuggestion = true
  }

  onSuggestionsClearRequested = () => {
    const { onSuggestionsClearRequested } = this.props

    onSuggestionsClearRequested && onSuggestionsClearRequested()
  }

  onSuggestionSelected = (event, data) => {
    const { alwaysRenderSuggestions, onSuggestionSelected, onSuggestionsFetchRequested } = this.props

    onSuggestionSelected && onSuggestionSelected(event, data)

    if (alwaysRenderSuggestions) {
      onSuggestionsFetchRequested({ value: data.suggestionValue })
    } else {
      this.onSuggestionsClearRequested()
    }

    this.resetHighlightedSuggestion()
  }

  onSuggestionClick = event => {
    const { alwaysRenderSuggestions, focusInputOnSuggestionClick } = this.props
    const { sectionIndex, suggestionIndex } =
      this.getSuggestionIndices(this.findSuggestionElement(event.target))
    const clickedSuggestion = this.getSuggestion(sectionIndex, suggestionIndex)
    const clickedSuggestionValue = this.props.getSuggestionValue(clickedSuggestion)

    this.maybeCallOnChange(clickedSuggestionValue)
    this.onSuggestionSelected(event, {
      suggestion: clickedSuggestion,
      suggestionValue: clickedSuggestionValue,
      suggestionIndex,
      sectionIndex,
      method: 'click',
    })

    if (!alwaysRenderSuggestions) {
      this.closeSuggestions()
    }

    if (focusInputOnSuggestionClick === true) {
      // this.input.focus()
    } else {
      this.onBlur()
    }

    setTimeout(() => {
      this.justSelectedSuggestion = false
    })
  }

  onBlur = () => {
    const { inputProps, shouldRenderSuggestions } = this.props
    const { value, onBlur } = inputProps
    const highlightedSuggestion = this.getHighlightedSuggestion()
    const shouldRender = shouldRenderSuggestions(value)
    this.setState({
      isFocused: false,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      valueBeforeUpDown: null,
      isCollapsed: !shouldRender,
    })
    onBlur && onBlur(this.blurEvent, { highlightedSuggestion })
  }

  resetHighlightedSuggestionOnMouseLeave = () => {
    this.resetHighlightedSuggestion(false) // shouldResetValueBeforeUpDown
  }

  itemProps = ({ sectionIndex, itemIndex }) => {
    return {
      'data-section-index': sectionIndex,
      'data-suggestion-index': itemIndex,
      onMouseEnter: this.onSuggestionMouseEnter,
      onMouseLeave: this.resetHighlightedSuggestionOnMouseLeave,
      onMouseDown: this.onSuggestionMouseDown,
      onTouchStart: this.onSuggestionMouseDown, // Because on iOS `onMouseDown` is not triggered
      onClick: this.onSuggestionClick,
    }
  }

  getQuery() {
    const { inputProps } = this.props
    const { value } = inputProps
    const { valueBeforeUpDown } = this.state

    return (valueBeforeUpDown || value).trim()
  }

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { renderSuggestionsContainer } = this.props

    return renderSuggestionsContainer({ containerProps, children, query: this.getQuery() })
  }

  render() {
    const {
      suggestions,
      renderInputComponent,
      onSuggestionsFetchRequested,
      renderSuggestion,
      inputProps,
      multiSection,
      renderSectionTitle,
      id,
      getSectionSuggestions,
      getSuggestionValue,
      alwaysRenderSuggestions,
    } = this.props
    const {
      isFocused,
      isCollapsed,
      highlightedSectionIndex,
      highlightedSuggestionIndex,
      valueBeforeUpDown,
      initialValue,
    } = this.state
    const shouldRenderSuggestions =
      alwaysRenderSuggestions ? alwaysTrue : this.props.shouldRenderSuggestions
    const { value, onFocus, onKeyDown } = inputProps
    const willRenderSuggestions = this.willRenderSuggestions(this.props)
    const isOpen = alwaysRenderSuggestions || isFocused && !isCollapsed && willRenderSuggestions
    const items = (isOpen ? suggestions : [])
    // HACK. While we're typing we don't want to pass down a new value to EditableText
    // Once we're done typing we do want to pass the new value down
    const valueObject = isCollapsed
      ? {}
      : { value: initialValue } // HACK. Since EditableText needs the initial value to always be passed
    const autowhateverInputProps = {
      ...Object.assign({}, inputProps, valueObject),
      onFocus: event => {
        if (!this.justSelectedSuggestion && !this.justClickedOnSuggestionsContainer) {
          const shouldRender = shouldRenderSuggestions(value)

          this.setState({
            isFocused: true,
            isCollapsed: !shouldRender,
          })

          onFocus && onFocus(event)

          if (shouldRender) {
            onSuggestionsFetchRequested({ value })
          }
        }
      },
      onBlur: event => {
        if (this.justClickedOnSuggestionsContainer) {
          // this.input.focus()
          return
        }

        this.blurEvent = event

        if (!this.justSelectedSuggestion) {
          this.onBlur()
          this.onSuggestionsClearRequested()
        }
      },
      onChange: value => {
        const shouldRender = shouldRenderSuggestions(value)

        this.maybeCallOnChange(value)

        this.setState({
          highlightedSectionIndex: null,
          highlightedSuggestionIndex: null,
          valueBeforeUpDown: null,
          isCollapsed: !shouldRender,
        })

        if (shouldRender) {
          onSuggestionsFetchRequested({ value })
        } else {
          this.onSuggestionsClearRequested()
        }
      },
      onKeyDown: (event, data) => {
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp':
            if (isCollapsed) {
              if (shouldRenderSuggestions(value)) {
                onSuggestionsFetchRequested({ value })
                this.revealSuggestions()
              }
            } else if (suggestions.length > 0) {
              const { newHighlightedSectionIndex, newHighlightedItemIndex } = data
              let newValue

              if (newHighlightedItemIndex === null) {
                // valueBeforeUpDown can be null if, for example, user
                // hovers on the first suggestion and then pressed Up.
                // If that happens, use the original input value.
                newValue = (valueBeforeUpDown === null ? value : valueBeforeUpDown)
              } else {
                newValue = this.getSuggestionValueByIndex(newHighlightedSectionIndex, newHighlightedItemIndex)
              }

              this.updateHighlightedSuggestion(newHighlightedSectionIndex, newHighlightedItemIndex, value)
              this.maybeCallOnChange(newValue)
            }

            event.preventDefault() // Prevents the cursor from moving

            this.justPressedUpDown = true

            setTimeout(() => {
              this.justPressedUpDown = false
            })

            break

          case 'Enter': {
            const highlightedSuggestion = this.getHighlightedSuggestion()

            if (isOpen && !alwaysRenderSuggestions) {
              this.closeSuggestions()
            }

            if (highlightedSuggestion !== null) {
              const newValue = getSuggestionValue(highlightedSuggestion)

              this.maybeCallOnChange(newValue)

              this.onSuggestionSelected(event, {
                suggestion: highlightedSuggestion,
                suggestionValue: newValue,
                suggestionIndex: highlightedSuggestionIndex,
                sectionIndex: highlightedSectionIndex,
                method: 'enter',
              })

              this.justSelectedSuggestion = true

              setTimeout(() => {
                this.justSelectedSuggestion = false
              })
            }

            break
          }

          case 'Escape': {
            if (isOpen) {
              // If input.type === 'search', the browser clears the input
              // when Escape is pressed. We want to disable this default
              // behaviour so that, when suggestions are shown, we just hide
              // them, without clearing the input.
              event.preventDefault()
            }

            const willCloseSuggestions = isOpen && !alwaysRenderSuggestions

            if (valueBeforeUpDown === null) { // Didn't interact with Up/Down
              if (!willCloseSuggestions) {
                const newValue = ''

                this.maybeCallOnChange(newValue)

                if (shouldRenderSuggestions(newValue)) {
                  onSuggestionsFetchRequested({ value: newValue })
                } else {
                  this.onSuggestionsClearRequested()
                }
              }
            } else { // Interacted with Up/Down
              this.maybeCallOnChange(valueBeforeUpDown)
            }

            if (willCloseSuggestions) {
              this.onSuggestionsClearRequested()
              this.closeSuggestions()
            } else {
              this.resetHighlightedSuggestion()
            }

            break
          }
        }

        onKeyDown && onKeyDown(event)
      }
    }
    const renderSuggestionData = {
      query: this.getQuery(),
    }

    return (
      <AutoSuggestPresentation
        multiSection={multiSection}
        items={items}
        renderInputComponent={renderInputComponent}
        renderItemsContainer={this.renderSuggestionsContainer}
        renderItem={renderSuggestion}
        renderItemData={renderSuggestionData}
        renderSectionTitle={renderSectionTitle}
        getSectionItems={getSectionSuggestions}
        highlightedSectionIndex={highlightedSectionIndex}
        highlightedItemIndex={highlightedSuggestionIndex}
        inputProps={autowhateverInputProps}
        itemProps={this.itemProps}
        id={id}
        ref={this.storeReferences}
      />
    )
  }
}
