import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Form from '@/components/song/create/form-detail'
import Background from '@/components/ui/background'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

type APIResponse = {
  id: string
  songName: string
  songDescription: string
  songOrder: string
  songKey: string
  songReference: string
  songVocalist: number
  songGuitarist: number
  songDrummer: number
  songBassist: number
  songKeyboardist: number
  songExtra: number
  songPercussionist: number
}

const SongDetail = () => {
  const { songId } = useLocalSearchParams()
  const { data: song, isFetching } = useQuery<APIResponse>({
    queryKey: ['songs', songId],
    queryFn: async () => {
      return (await axios.get(`/songs/${songId}`)).data
    }
  })

  if (isFetching) return

  const formattedSong = {
    id: song?.id!,
    songName:  song?.songName!,
    songDescription: song?.songDescription!,
    songOrder: song?.songOrder!,
    songKey: song?.songKey!,
    songReference: song?.songReference!,
    songVocalist: song?.songVocalist.toString()!,
    songGuitarist: song?.songGuitarist.toString()!,
    songDrummer: song?.songDrummer.toString()!,
    songBassist: song?.songBassist.toString()!,
    songKeyboardist: song?.songKeyboardist.toString()!,
    songExtra: song?.songExtra.toString()!,
    songPercussionist: song?.songPercussionist.toString()!
  }

  return (
    <Background>
      <Form song={formattedSong} />
    </Background>
  )
}

export default SongDetail