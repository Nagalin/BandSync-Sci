import { useTheme } from 'react-native-paper'

export const theme = {
    colors: {
      background: '#ffffff',
      main: '#afafd3',
      mainButton : '#e2bfbf'
    }
  }
  
  export type AppTheme = typeof theme
  export const useAppTheme = () => useTheme<AppTheme>()