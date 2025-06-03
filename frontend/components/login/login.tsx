import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import Button from '@/components/ui/button'
import useLogin from '@/components/login/use-login'

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const { login } = useLogin()

  return (
    <ImageBackground
      source={require('@/assets/images/bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>SCI BAND</Text>
        <Text style={styles.subtitle}>Music Event Manager</Text>

        <Button onPress={login}>Login with Discord</Button>
      </View>
    </ImageBackground>
  )
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
  }
})
