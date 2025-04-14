import React from 'react'
import Form from '@/components/song/form'
import Background from '@/components/ui/background'
import { useQuery } from '@tanstack/react-query'
import { getSongService, Song } from '@/services/song'
import { useEventDataStore } from '@/zustand/store'

const SongDetail = () => {
  const { eventId, songId } = useEventDataStore()
  const { data: song, isFetching } = useQuery<Song>({
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

export default SongDetail