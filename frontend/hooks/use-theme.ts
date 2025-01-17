import { useTheme } from 'react-native-paper'

export const theme = {
    colors: {
      background: '#F4F4FB',
      main: '#f1e0ce',
      mainButton : '#a2c5c9'
    }
  }
  
  export type AppTheme = typeof theme
  export const useAppTheme = () => useTheme<AppTheme>()