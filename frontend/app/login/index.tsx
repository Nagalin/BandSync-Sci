import { useAuth } from '@clerk/clerk-expo'
import { Text } from 'react-native'

export default function UseAuthExample() {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()


  if (!isLoaded) {
    return <Text>Loading...</Text>
  }
  console.log("token here is new: "+JSON.stringify(getToken()))

  if (!isSignedIn) {
    // You could also add a redirect to the sign-in page here
    return <Text>Sign in to view this page</Text>
  }

  return (
    <Text>
      Hello, {userId}! Your current active session is {sessionId}.
    </Text>
  )
}