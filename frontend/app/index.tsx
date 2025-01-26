import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Link } from 'expo-router'
import {  View } from 'react-native'
import Text from '@/components/ui/text'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/event/view'>
        <Text> Login </Text>
      </Link>
    </View>
  )
}