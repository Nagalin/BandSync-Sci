import React, { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO, useAuth } from '@clerk/clerk-expo'; // Import useAuth to check the session
import { View, Button, Alert } from 'react-native';
import axios from '@/lib/axios';
import { useRouter } from 'expo-router';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const router = useRouter()
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const { isSignedIn, signOut } = useAuth(); // Use useAuth to check if a session exists

  const onPress = useCallback(async () => {
    try {
      // Check if the user is already signed in
      if (isSignedIn) {
        // Sign out the existing session before starting a new one
        await signOut();
      }

      // Start the SSO flow
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_discord',
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      // If sign-in was successful, set the active session
      if (createdSessionId) {
        console.log(createdSessionId)
        try {
          setActive!({ session: createdSessionId });
          const res = await axios.get('/auth/user');
          router.replace('/login')
          console.log('success')
        } catch (error) {
          console.error(error)
          Alert.alert('เกิดข้อผิดพลาด', 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้')
          await signOut()
        }

      } else {
        // Handle missing requirements (e.g., MFA)
        console.log('Additional steps required:', signIn || signUp)
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isSignedIn, signOut, startSSOFlow]);

  return (
    <View>
      <Button title="Sign in with Discord" onPress={onPress} />
    </View>
  );
}