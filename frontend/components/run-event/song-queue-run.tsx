import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { SongListType, SongType } from '@/types/song'

type SongQueueRunPropsType = {
    songs : SongListType[],
    currentSong: Pick<SongType, 'songId' | 'songName'>
}
const SongQueueRun = ({ songs, currentSong }: SongQueueRunPropsType ) => {
  return (
    <ScrollView style={{ marginTop: 10 }}>
    {songs.map((item) => {
      const isCurrent = item.songId === currentSong.songId
      return (
        <View
          key={item.songId}
          style={{
            backgroundColor: isCurrent ? '#E8F5E9' : '#FFF',
            borderLeftWidth: isCurrent ? 4 : 1,
            borderLeftColor: isCurrent ? '#4CAF50' : '#DDD',
            borderWidth: 1,
            borderColor: '#DDD',
            padding: 12,
            borderRadius: 10,
            marginHorizontal: 20,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isCurrent && (
              <MaterialIcons
                name="volume-up"
                size={20}
                color="#4CAF50"
                style={{ marginRight: 8 }}
              />
            )}
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                {item.songName} ({item.songKey})
              </Text>
              {isCurrent && (
                <Text style={{ fontSize: 12, color: '#4CAF50' }}>กำลังเล่น</Text>
              )}
            </View>
          </View>
        </View>
      )
    })}
  </ScrollView>
  )
}

export default SongQueueRun