import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'

export default function RootLayout() {
  const theme = {
    colors: {
      background: '#F4F4FB',
      primary: '#51557f'
    }
  }
  
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  )
}