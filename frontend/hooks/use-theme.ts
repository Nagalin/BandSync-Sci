import { useTheme } from 'react-native-paper'

export const theme = {
  colors: {
    background: '#ffffff',
    primary: '#a4acd3',
    mainButton: '#92a692',
    dangerButton: '#d9534f'
  }
}

export type AppTheme = typeof theme
export const useAppTheme = () => useTheme<AppTheme>()