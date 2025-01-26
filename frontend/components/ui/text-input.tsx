import React from 'react'
import { TextInput as RnTextInput, TextInputProps } from 'react-native-paper'
import {
  useFonts,
  IBMPlexSans_100Thin,
  IBMPlexSans_100Thin_Italic,
  IBMPlexSans_200ExtraLight,
  IBMPlexSans_200ExtraLight_Italic,
  IBMPlexSans_300Light,
  IBMPlexSans_300Light_Italic,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_600SemiBold_Italic,
  IBMPlexSans_700Bold,
  IBMPlexSans_700Bold_Italic,
} from '@expo-google-fonts/ibm-plex-sans';
import Text from './text';

const TextInput = ({ style, label, ...props }: TextInputProps) => {
  let [fontsLoaded] = useFonts({
          IBMPlexSans_100Thin,
          IBMPlexSans_100Thin_Italic,
          IBMPlexSans_200ExtraLight,
          IBMPlexSans_200ExtraLight_Italic,
          IBMPlexSans_300Light,
          IBMPlexSans_300Light_Italic,
          IBMPlexSans_400Regular,
          IBMPlexSans_400Regular_Italic,
          IBMPlexSans_500Medium,
          IBMPlexSans_500Medium_Italic,
          IBMPlexSans_600SemiBold,
          IBMPlexSans_600SemiBold_Italic,
          IBMPlexSans_700Bold,
          IBMPlexSans_700Bold_Italic,
        });
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
