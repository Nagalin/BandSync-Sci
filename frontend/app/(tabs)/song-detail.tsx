import React from 'react'
import Form from '@/components/song/form'
import Background from '@/components/ui/background'
import { useQuery } from '@tanstack/react-query'
import { getSongService } from '@/services/song'
import { useEventDataStore } from '@/zustand/store'

type APIResponse = {
  songId: string
  songName: string
  songDescription: string
  songOrder: string
  songKey: string
  songReference: string
  totalVocalist: string
  totalGuitarist: string
  totalDrummer: string
  totalBassist: string
  totalKeyboardist: string
  totalExtra: string
  totalPercussionist: string
}

const SongDetail = () => {
  const { eventId, songId } = useEventDataStore()
  const { data: song, isFetching } = useQuery<APIResponse>({
    queryKey: ['songs', songId],
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