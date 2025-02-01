import { Text as RnText, TextProps } from 'react-native-paper'
import React, { ReactNode } from 'react'
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
} from '@expo-google-fonts/ibm-plex-sans'

type TextPropsType = {
  children: ReactNode
} & TextProps<{}>

const Text = ({ children, style, ...rest }: TextPropsType) => {
  useFonts({
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
  })
  return (
    <RnText style={[{ fontFamily: 'IBMPlexSans_400Regular' }, style]} {...rest}>
      {children}
    </RnText>
  )
}

export default Text