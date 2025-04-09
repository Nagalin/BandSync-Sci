import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getSongListService, SongList } from '@/services/song'

export default function App() {
  const router = useRouter()
  const { eventId } = useLocalSearchParams()
  const { data: songs = [] } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => await getSongListService(eventId as string),
  })

  const renderItem = ({ item }: { item: SongList }) => (
    <View style={styles.rowItem} >
      <Text
        onPress={() => router.push({
          pathname: '/event/[eventId]/song/[songId]',
          params: {
            eventId: eventId as string,
            songId: item.songId
          }
        })}
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