import React, { useEffect, useCallback } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO, useAuth } from '@clerk/clerk-expo'
import { View, Button, Alert } from 'react-native'
import { useRootNavigationState, useRouter } from 'expo-router'
import axios from '@/lib/axios'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  const { getToken, isSignedIn, signOut } = useAuth()
  const router = useRouter()
  const navigationState = useRootNavigationState()
  const { startSSOFlow } = useSSO()
  useWarmUpBrowser()

  useEffect(() => {
    if (navigationState?.key && isSignedIn) 
      router.navigate('/(tabs)/main-menu')
    
  }, [])

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_discord',
        redirectUrl: AuthSession.makeRedirectUri()
      })

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId })

        try {
          const token = await getToken()
          const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
          }

          await axios.get('/auth/user', config)
          router.push('/(tabs)/main-menu')
        } catch (error) {
          console.error(error)
          Alert.alert('Error', 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้')
          await signOut()
        }
      } else {
        console.log('Additional steps required:', signIn || signUp)
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [getToken, router, signOut, startSSOFlow])

  return (
    <View>
      <Button title='Sign in with Discord' onPress={onPress} />
    </View>
  )
}
