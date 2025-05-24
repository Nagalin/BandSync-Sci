import React from 'react'
import { TextInput as RnTextInput, TextInputProps } from 'react-native-paper'
import Text from '@/components/ui/text'
import { StyleSheet } from 'react-native'

const TextInput = ({ style, label, ...props }: TextInputProps) => {
  return (
    <RnTextInput
      style={[{ backgroundColor: '#e8eaf6' }, styles.readonlyInput]}
      mode='outlined'
      label={
        <Text>
          {label }
        </Text>
      }
      contentStyle={{ fontFamily: 'IBMPlexSans_400Regular' }}
      theme={{colors: {
        primary: 'black'
      }}}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f4f4f5',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
    color: '#444',
  },
  readonlyInput: {
    /*backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 12,*/
    borderRadius: 8,
    marginBottom: 16,
    color: '#333',
  },
  buttonWrapper: {
    marginTop: 16,
  },

})

export default TextInput