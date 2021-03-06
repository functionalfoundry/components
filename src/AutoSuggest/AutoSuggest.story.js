import React from 'react'
import { action, storiesOf } from '@kadira/storybook'
import ItemsList from './ItemsList'
import Item from './Item'
import AutoSuggestPresentation from './AutoSuggestPresentation'
import AutoSuggest from './AutoSuggest'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('AutoSuggest', module)
  .add('Item', () => (
    <PreviewContainer shade="dark">
      <Preview label="Item">
        <Item
          item={{ name: 'Apple' }}
          renderItem={({ name }) => name}
          renderItemData={{}}
          itemIndex={0}
        />
        <Item
          item={{ name: 'Orange' }}
          renderItem={({ name }) => name}
          renderItemData={{}}
          itemIndex={1}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('ItemsList', () => (
    <PreviewContainer shade="dark">
      <Preview label="Item">
        <ItemsList
          items={[{ name: 'Apple' }, { name: 'Orange' }]}
          renderItem={({ name }) => name}
          renderItemData={{}}
          getItemId={(sectionIndex, itemIndex) => itemIndex}
          onFocusedItemChange={action('onFocusedItemChange')}
          onHighlightedItemChange={action('onHighlightedItemChange')}
          focusedItemIndex={1}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('AutoSuggestPresentation', () => (
    <PreviewContainer shade="dark">
      <Preview label="Item">
        <AutoSuggestPresentationContainer />
      </Preview>
    </PreviewContainer>
  ))
  .add('AutoSuggest', () => (
    <PreviewContainer shade="dark">
      <Preview label="Item">
        <Basic />
      </Preview>
    </PreviewContainer>
  ))

const items = [
  { text: 'Apple' },
  { text: 'Apricot' },
  { text: 'Banana' },
  { text: 'Cherry' },
  { text: 'Grapefruit' },
  { text: 'Kiwi' },
  { text: 'Lemon' },
  { text: 'Orange' },
  { text: 'Rhaspberry' },
  { text: 'Strawberry' },
]

class AutoSuggestPresentationContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      value: items[0],
    }
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const exampleId = '1'
    return (
      <div>
        <AutoSuggestPresentation
          id={exampleId}
          items={items}
          renderItem={renderItem}
          inputProps={{
            value: this.state.value.text,
            onChange: this.handleChange,
          }}
        />
      </div>
    )
  }
}

class Basic extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: [],
    }
  }

  onChange = newValue => {
    this.setState({
      value: newValue,
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: "Type 'A'",
      value,
      onChange: this.onChange,
      theme: {
        text: {
          minWidth: '2em',
        },
      },
    }

    return (
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={() => true}
        inputProps={inputProps}
        focusInputOnSuggestionClick
        id="basic-example"
      />
    )
  }
}

const getSuggestions = value => {
  const escapedValue = value.trim()
  if (escapedValue === '') {
    return items
  }
  const regex = new RegExp(`^${escapedValue}`, 'i')
  return items.filter(item => regex.test(item.text))
}

const getSuggestionValue = suggestion => suggestion.text

const renderSuggestion = suggestion => <span>{suggestion.text}</span>

function renderItem(item) {
  return <span>{item.text}</span>
}
