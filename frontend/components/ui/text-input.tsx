import React from 'react'
import { TextInput as RnTextInput, TextInputProps } from 'react-native-paper'

const TextInput = ({ style, ...props }: TextInputProps) => {
  return (
    <RnTextInput 
      style={[{ backgroundColor: '#e8eaf6' }, style]} 
      mode='outlined' 
      {...props} 
    />
  )
}

export default TextInput
