import React from 'react'
import Text from '../Text'
import TextInput from '../TextInput'
import Trigger from '../Trigger'
import View from '../View'

type PropsT = {
  size: 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge',
  children: React.Element,
  disabled: boolean,
  isEditing: boolean,
  onChange: Function,
  onStartEdit: Function,
  onStopEdit: Function,
}

const defaultProps = {
  isEditing: false,
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
    } = this.props
    return (
      <View
        inline
      >
        {(!isEditing || disabled) &&
          <Trigger
            triggerOn={'Click inside'}
            onTrigger={() => {
              onStartEdit()
              setTimeout(() => {
                this.textInput.getWrappedInstance().focus()
              })
            }}
          >
            <Text
              size={size}
            >
              {children}
            </Text>
          </Trigger>}
        {(isEditing && !disabled) &&
          <Trigger
            triggerOn={['Click outside', 'Escape']}
            onTrigger={onStopEdit}
          >
            <TextInput
              value={children}
              size={size}
              onChange={onChange}
              ref={(input) => {
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
