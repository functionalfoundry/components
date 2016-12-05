import React from 'react'
import Text from '../Text'
import TextInput from '../TextInput'
import Trigger from '../Trigger'
import View from '../View'

type PropsT = {
  size: 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge',
  children: any,
  value: string,
  disabled: boolean,
  isEditing: boolean,
  onChange: Function,
  onStartEdit: Function,
  onStopEdit: Function,
}

const defaultProps = {
  isEditing: false,
  onChange: () => {},
  onStartEdit: () => {},
  onStopEdit: () => {},
  size: 'Base',
}

class EditableText extends React.Component {
  props: PropsT
  render() {
    const {
      size,
      children,
      disabled,
      isEditing,
      onChange,
      onStartEdit,
      onStopEdit,
      value,
      ...props
    } = this.props
    return (
      <View
        {...props}
        inline
      >
        {(!isEditing || disabled) &&
          <Trigger
            triggerOn={'Click inside'}
            onTrigger={() => {
              onStartEdit()
              setTimeout(() => {
                if (this.textInput) {
                  this.textInput.getWrappedInstance().focus()
                }
              }, 2) // Random
            }}
          >
            <Text
              size={size}
            >
              {value || children}
            </Text>
          </Trigger>}
        {(isEditing && !disabled) &&
          <Trigger
            triggerOn={['Click outside', 'Escape']}
            onTrigger={onStopEdit}
          >
            <TextInput
              value={value || children}
              size={size}
              onChange={onChange}
              ref={(input) => {
                console.log('ref: ', input)
                this.textInput = input
              }}
            />
          </Trigger>}
      </View>
    )
  }
}

EditableText.defaultProps = defaultProps
export default EditableText
