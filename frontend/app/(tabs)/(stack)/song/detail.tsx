import React from 'react'
import Form from '@/components/song/form'
import Background from '@/components/ui/background'
import { useQuery } from '@tanstack/react-query'
import { getSongService } from '@/services/song.service.'
import { useEventDataStore } from '@/zustand/store'
import { SongType } from '@/types/song'

const Detail = () => {
  const { eventId, songId } = useEventDataStore()
  const { data: song, isFetching } = useQuery<SongType>({
    queryKey: ['song', songId],
    queryFn: async () => await getSongService(songId as string, eventId as string)
  })

  if (isFetching) return

  return (
    <Background>
      <Form song={song!} />
    </Background>
  )
}

export default Detail