import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

type APIResponseType = {
  id: string
  songName: string
  songKey: string
}

export default function App() {
  const router = useRouter()
  const { data: songs = [], isFetching } = useQuery<APIResponseType[]>({
    queryKey: ['songs'],
    queryFn: async () => (await axios.get('/songs')).data,
  })

  const renderItem = ({ item }: { item: APIResponseType }) => (
    <View style={styles.rowItem} >
      <Text
        onPress={() => router.push({
          pathname: '/event/[eventId]/song/[songId]',
          params: {
            eventId: item.id,
            songId: item.id
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
      keyExtractor={(item) => item.id}
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