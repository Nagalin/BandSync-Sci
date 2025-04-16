import React from 'react'
import {  useRouter } from 'expo-router'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getSongListService, SongList } from '@/services/song'
import { useEventDataStore } from '@/zustand/store'

type CardPropsType = {
  currentSongId?: string
}
export default function Card({ currentSongId }: CardPropsType) {
  const router = useRouter()
  const { setSongId } = useEventDataStore()
  const { eventId } = useEventDataStore()
  const { data: songs = [] } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => await getSongListService(eventId)
  })

  const renderItem = ({ item }: { item: SongList }) => (
    <View style={[
      styles.rowItem, 
      item.songId === currentSongId && styles.activeRowItem
    ]} >
      <Text
        onPress={() => {
          setSongId(item.songId)
          router.navigate({
            pathname: '/song/detail',
            
          })}
        }
        style={styles.text}>
        {`${item.songName} (${item.songKey})`}
      </Text>
    </View>
  )

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.songId}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 10,
  },
  activeRowItem: {
    backgroundColor: 'purple',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})