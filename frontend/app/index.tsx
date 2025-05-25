import React, { useEffect, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO, useAuth } from '@clerk/clerk-expo';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from '@/libs/axios';
import { useSocketQuery } from '@/hooks/use-socket-query';
import Button from '@/components/ui/button'

WebBrowser.maybeCompleteAuthSession();

async function storeRoles(user: any) {
  try {
    const rolesKey = 'user_roles';
    const rolesData = JSON.stringify(user);
    await SecureStore.setItemAsync(rolesKey, rolesData);
  } catch (error) {
    console.error('Error storing roles:', error);
  }
}

export default function LoginScreen() {
  useSocketQuery();
  const { getToken, isSignedIn, signOut } = useAuth();
  const router = useRouter();
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    if (isSignedIn) await signOut();
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_discord',
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });

        const token = await getToken();
        const res = await axios.get('/auth/user', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        storeRoles(res.data.roles);
        await SecureStore.setItemAsync('userId', res.data.userId);
        router.push('/main-menu');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้');
      await signOut();
    }
  }, [getToken, isSignedIn]);

  return (
    <ImageBackground
      source={require('@/assets/images/bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>SCI BAND</Text>
        <Text style={styles.subtitle}>Music Event Manager</Text>

        <Button onPress={onPress}>Login with Discord</Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 30,
    borderRadius: 20,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#f4f6f7',
    marginBottom: 30,
  },
});
