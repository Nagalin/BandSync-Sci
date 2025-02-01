import React from 'react'
import { TextInput as RnTextInput, TextInputProps } from 'react-native-paper'
import Text from '@/components/ui/text'

const TextInput = ({ style, label, ...props }: TextInputProps) => {
  return (
    <RnTextInput
      style={[{ backgroundColor: '#e8eaf6' }, style]}
      mode='outlined'
      label={
        <Text>
          {label}
        </Text>
      }
      contentStyle={{ fontFamily: 'IBMPlexSans_400Regular' }}
      {...props}
    />
  )
}

export default TextInput