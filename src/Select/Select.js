import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Spacing,
} from '@workflo/styles'
import AutoSuggest from '../AutoSuggest'
import Trigger from '../Trigger'

type PropsT = {
  options: Array<{
    id: string,
    label: string,
  }>,
  // The selected option ID
  value: string,
  renderInputComponent?: Function,
  onChange: (id: string) => null,
  /** Width in pixels of the select field */
  width: number,
}

const defaultInputComponentTheme = ({
  width,
  isExpanded,
}) => ({
  inputComponent: {
    backgroundColor: Colors.grey800,
    width,
    cursor: 'pointer',
    paddingTop: Spacing.small,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  caret: {
    // ...Fonts.tiny,
    // ':hover': {
    //   color: Colors.grey100,
    // },
    color: Colors.grey300,
    float: 'right',
    // paddingLeft: Spacing.small,
    paddingTop: Spacing.tiny,
    // marginLeft: Spacing.tiny,
    transform: `scale(1, ${isExpanded ? -0.6 : 0.6})`,
    marginLeft: 'auto',
  },
})

const InputComponent = ({
  value,
  theme,
  onFocus,
  onBlur,
  onClick,
  onClickOut,
  className,
  width,
  isExpanded,
  ...props
}) => (
  <Trigger
    triggerOn={['Click outside', 'Escape']}
    onTrigger={(e) => {
      onBlur(e)
      onClickOut && onClickOut()
    }}
  >
    {/* TODO: onBlur is currently called even when the dropdown is closed */}
    <div
      {...theme.inputComponent}
      {...props}
      onClick={(e) => {
        onFocus(e)
        onClick && onClick(e)
      }}
    >
      {value}
      <div {...theme.caret}>▼</div>
    </div>
  </Trigger>
)

const ThemedInputComponent = Theme('ThemedInputComponent', defaultInputComponentTheme)(InputComponent)
const getDefaultRenderInputComponent = (width) =>
  (option) => <ThemedInputComponent {...option} width={width}/>

const defaultProps = {
  width: 242,
}
class Select extends React.Component {
  props: PropsT
  static defaultProps = defaultProps

  constructor () {
    super()
    this.state = {
      showDropdown: false,
    }
  }

  onSuggestionsFetchRequested = () => {

  }

  onSuggestionsClearRequested = () => {

  }

  getSuggestions = () => {
    return this.props.options
  }

  handleSuggestionSelected = (e, { suggestionValue } = {}) => {
    console.log('eek')
    if (typeof suggestionValue === 'undefined') return
    const { onChange } = this.props
    console.log('onChange: ', suggestionValue)
    onChange && onChange(suggestionValue)
    this.setState({ showDropdown: false })
  }

  handleClickOut = () => {
    // We need onSuggestionSelected to get called first and then close the dropdown
    setTimeout(() => {
      this.setState({ showDropdown: false })
    })
  }

  handleClickInput = () => {
    this.setState({ showDropdown: true })
  }

  render () {
    const {
      options,
      value,
      onChange,
      renderInputComponent,
      width,
    } = this.props

    const {
      showDropdown,
    } = this.state

    const finalRenderInputComponent = renderInputComponent || getDefaultRenderInputComponent(width)
    const inputProps = {
      value,
      onChange,
      onClick: this.handleClickInput,
      onClickOut: this.handleClickOut,
      isExpanded: showDropdown,
    }

    return (
      <AutoSuggest
        suggestions={options}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={finalRenderInputComponent}
        onSuggestionSelected={this.handleSuggestionSelected}
        shouldRenderSuggestions={() => showDropdown}
        inputProps={inputProps}
        alwaysPassInitialValueDown={false}
      />
    )
  }
}

const getSuggestionValue = suggestion => suggestion.label

const renderSuggestion = suggestion => <span>{suggestion.label}</span>

function renderItem(item) {
  return <span>{item.label}</span>
}

export default Select
