import React from 'react'
import { View } from 'react-native'
/*import { GestureHandlerRootView } from 'react-native-gesture-handler'*/
import SongCard from '@/components/song/card'
import Text from '@/components/ui/text'
import Background from '@/components/ui/background'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/button'
import { checkBackstageRole } from '@/utils/check-user-role'

function Index() {
  const router = useRouter()
  const isUserBackstage = checkBackstageRole()

  return (
    <Background>
      
        <Text style={{ fontSize: 30 }}>งานเปิดบ้าน</Text>
        <SongCard />

      {
        isUserBackstage ? (
          <Button
            style={{
              position: 'absolute',
              bottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              right: 5,
              borderRadius: 30,
              height: 60,
              width: 40,
            }}
            onPress={() => router.navigate('/song/create')}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <Text style={{
                lineHeight: 40,
                width: 40,
                textAlign: 'center',
                height: '100%',
                fontSize: 40
              }}>
                +
              </Text>
            </View>
          </Button>

        ) : null
      }

    </Background>
  )
}

export default Index