import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

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