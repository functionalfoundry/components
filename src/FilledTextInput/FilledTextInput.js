import React from 'react'
import {
  Colors,
  Spacing,
} from '@workflo/styles'
import TextInput from '../TextInput'

type PropsT = {
  width: number,
  value: string,
  onChange: Function,
}

const FilledTextInput = ({
  width,
  ...props
}: PropsT) => (
  <TextInput
    {...props}
    disableUnderline
    size='Base'
    theme={{
      inputContain: {
        backgroundColor: Colors.grey800,
        width,
      },
      textInput: {
        color: 'white',
        paddingLeft: Spacing.tiny,
        paddingBottom: 0,
      },
      inputLabel: {
        color: Colors.grey200,
        paddingLeft: Spacing.tiny,
      },
    }}
  />
)

export default FilledTextInput
