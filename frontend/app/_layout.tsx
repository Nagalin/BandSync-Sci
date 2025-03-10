import { Slot, Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { tokenCache } from '@/cache'
import { theme } from '@/hooks/use-theme'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}
const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <Slot/>
          </PaperProvider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}