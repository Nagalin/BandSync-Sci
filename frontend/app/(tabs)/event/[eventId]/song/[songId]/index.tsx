import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Form from '@/components/song/form'
import Background from '@/components/ui/background'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

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
  const { eventId, songId } = useLocalSearchParams()
  const { data: song, isFetching } = useQuery<APIResponse>({
    queryKey: ['songs', songId],
    queryFn: async () => (await axios.get(`events/${eventId}/songs/${songId}`)).data
  })

  if (isFetching) return

  return (
    <Background>
      <Form song={song!} />
    </Background>
  )
}

export default SongDetail