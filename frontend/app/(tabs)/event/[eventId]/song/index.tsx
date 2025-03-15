import React, { useEffect } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SongCard from '@/components/song/song-card'
import Text from '@/components/ui/text'
import Background from '@/components/ui/background'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Button from '@/components/ui/button'
import { checkBackstageRole } from '@/utils/check-user-role';
import * as SecureStore from 'expo-secure-store';

function Index() {

  useEffect(() => {
    const getArray = async (key: string) => {
      const value = await SecureStore.getItemAsync(key)
      return value ? JSON.parse(value) : null;
    }

    getArray('user_roles')



  })



  const { eventId } = useLocalSearchParams()
  const router = useRouter()
  const isUserBackstage = checkBackstageRole()

  return (
    <Background>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Text style={{ fontSize: 30 }}>งานเปิดบ้าน</Text>
        <SongCard />
      </GestureHandlerRootView>

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
            onPress={() => router.navigate(`/event/${eventId}/song/create`)}
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