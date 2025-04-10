import React from 'react'
import {  useRouter } from 'expo-router'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getSongListService, SongList } from '@/services/song'
import { useEventDataStore } from '@/zustand/store'

export default function App() {
  const router = useRouter()
  const { setSongId } = useEventDataStore()
  const { eventId } = useEventDataStore()
  const { data: songs = [] } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => await getSongListService(eventId as string),
  })

  const renderItem = ({ item }: { item: SongList }) => (
    <View style={styles.rowItem} >
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
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})