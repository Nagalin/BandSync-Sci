import React from 'react'
import { Platform, UIManager } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Simple from './simple'
import Text from '@/components/ui/text'
import Background from '@/components/ui/background'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Stack = createNativeStackNavigator()

function Index() {
  return (
    <Background>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Text style={{fontSize: 30}}>งานเปิดบ้าน</Text>
          <Simple />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Background>
  )
}

export default Index
