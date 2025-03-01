import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Form from '@/components/song/create/form-detail'
import Background from '@/components/ui/background'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

const SongDetail = () => {
  const { id } = useLocalSearchParams()
  const { data: song, isFetching } = useQuery({
    queryKey: ['songs', id],
    queryFn: async () => {
        return (await axios.get(`/songs/${id}`)).data
      }
})

// useEffect(() => {
//   if(!song) return
//   setFormattedSong({
//     ...song,
//     songVocalist: song.songVocalist.toString(),
//     songGuitarist: song.songGuitarist.toString(),
//     songDrummer: song.songDrummer.toString(),
//     songBassist: song.songBassist.toString(),
//     songKeyboardist: song.songKeyboardist.toString(),
//     songExtra: song.songExtra.toString(),
//     songPercussionist: song.songPercussionist.toString()
//   })

// })
if(isFetching) return

const formattedSong = {
  ...song,
  songVocalist: song.songVocalist.toString(),
  songGuitarist: song.songGuitarist.toString(),
  songDrummer: song.songDrummer.toString(),
  songBassist: song.songBassist.toString(),
  songKeyboardist: song.songKeyboardist.toString(),
  songExtra: song.songExtra.toString(),
  songPercussionist: song.songPercussionist.toString()

}
  
  return (
    <Background>
      <Form song={formattedSong}/>
    </Background>
  )
}

export default SongDetail