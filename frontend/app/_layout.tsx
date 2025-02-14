import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { theme } from '@/hooks/use-theme'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  )
}