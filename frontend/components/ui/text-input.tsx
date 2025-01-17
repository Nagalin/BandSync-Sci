import React from 'react'
import { TextInput as RnTextInput, TextInputProps } from 'react-native-paper'

const TextInput = ({ ...props }: TextInputProps) => {
  return (
    <RnTextInput mode='outlined' {...props} />
  )
}

export default TextInput