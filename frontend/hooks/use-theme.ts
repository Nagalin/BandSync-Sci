import { useTheme } from 'react-native-paper'

export const theme = {
  colors: {
    background: '#f4f4f5',

    primary: '#a4acd3',
    secondary: '#FF4081',
    mainButton: '#92a692',
    dangerButton: '#d9534f'
  }
}

export type AppTheme = typeof theme
export const useAppTheme = () => useTheme<AppTheme>()