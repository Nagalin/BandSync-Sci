import React from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SongCard from '@/components/song/card'
import Text from '@/components/ui/text'
import Background from '@/components/ui/background'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/button'
import { checkBackstageRole } from '@/utils/check-user-role'
import { getCurrentSongService, updateCurrentSongService } from '@/services/event'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEventDataStore } from '@/zustand/store'
import { emitSocketEvent } from '@/hooks/use-socket-query'

function Run() {
  const router = useRouter()
  const { eventId } = useEventDataStore()
  const queryClient = useQueryClient()
  const isUserBackstage = checkBackstageRole()
  const { data: currentSong, isPending, isError } = useQuery({
    queryKey: ['currentSong'],
    queryFn: async () => await getCurrentSongService(eventId)
  })

  if(isError || isPending) return

  console.log(currentSong.songId)

  return (
    <Background>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Text style={{ fontSize: 30 }}>งานเปิดบ้าน</Text>
        <SongCard currentSongId={currentSong.songId} />
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

      <Button
      onPress={async () => {
        await updateCurrentSongService(eventId)
        emitSocketEvent()
        // queryClient.invalidateQueries({ queryKey: ['currentSong'] })
      } }
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
          >
          <Text>Next Song</Text>
          </Button>
      

    </Background>
  )
}

export default Run