import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import useAxiosWithAuth from '@/hooks/use-axios-with-auth';

type APIResponseType = {
  songId: string
  songName: string
  songKey: string
}

export default function App() {
  const axios = useAxiosWithAuth()
  const router = useRouter()
  const { eventId } = useLocalSearchParams()
  const { data: songs = [], isFetching } = useQuery<APIResponseType[]>({
    queryKey: ['songs'],
    queryFn: async () => (await axios.get(`/events/${eventId}/songs`)).data,
  })

  const renderItem = ({ item }: { item: APIResponseType }) => (
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