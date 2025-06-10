import React from 'react'
import { Alert, View } from 'react-native'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Background from '@/components/ui/background'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import {
  getCurrentSongService,
  updateCurrentSongService,
  endEventService,
} from '@/services/event.service'
import { getSongListService } from '@/services/song.service.'
import { emitEndEvent, emitSocketEvent } from '@/hooks/use-socket-query'
import { useEventDataStore } from '@/zustand/store'
import SongQueueRun from '@/components/run-event/song-queue-run'
import RunEventHeader from '@/components/run-event/header'
import NotiModal from '@/components/run-event/noti-modal'

function Run() {
  const queryClient = useQueryClient()
  const { eventId, setSongId } = useEventDataStore()
  const { data: currentSong, isPending: loadingCurrent, isError } = useQuery({
    queryKey: ['currentSong'],
    queryFn: async () => {
      const song = await getCurrentSongService(eventId)
      if (song?.songId) {
        setSongId(song.songId)
      }
      return song
    }
  })

  const { data: songs = [] } = useQuery({
    queryKey: ['songs', eventId],
    queryFn: async () => await getSongListService(eventId),
  })

  if (isError || loadingCurrent || !currentSong?.songId) {
    return (
      <Background>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </Background>
    )
  }

  const lastIndex = songs.length - 1
  const isLastSong = songs[lastIndex]?.songId === currentSong?.songId

  return (
    <Background>
      {/* Header */}
      <RunEventHeader />


      {/* Current Song List */}
      <SongQueueRun songs={songs} currentSong={currentSong} />


      <Button
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundColor: '#2196F3',
          borderRadius: 30,
          height: 60,
          paddingHorizontal: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={async () => {
          if (isLastSong) {
            return Alert.alert('ยืนยัน', 'คุณต้องการจบ Event หรือไม่', [
              { text: 'ยกเลิก', style: 'cancel' },
              {
                text: 'ยืนยัน',
                onPress: async () => {
                  await endEventService(eventId)
                  queryClient.invalidateQueries({ queryKey: ['events'] })
                  emitEndEvent()

                },
              },
            ])

          }
          Alert.alert('ยืนยัน', 'คุณต้องการเลื่อนไปเพลงถัดไปหรือไม่', [
            { text: 'ยกเลิก', style: 'cancel' },
            {
              text: 'ยืนยัน',
              onPress: async () => {
                await updateCurrentSongService(eventId)
                emitSocketEvent()
              },
            },
          ])
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{isLastSong ? 'จบ Event' : '⏭️ เพลงถัดไป'}</Text>
      </Button>

      {/* Modal แจ้งเตือน */}
      <NotiModal isLastSong={isLastSong} songName={currentSong.songName} />

    </Background>
  )
}

export default Run
