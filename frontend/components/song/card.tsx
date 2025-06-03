import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, ActivityIndicator, View } from 'react-native'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getSongListService } from '@/services/song.service.'
import { useEventDataStore } from '@/zustand/store'
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'
import axios from '@/libs/axios'
import { checkBackstageRole, checkPlayerRole } from '@/utils/check-user-role'
import { Alert } from 'react-native'
import { Checkbox } from 'react-native-paper'
import Text from '@/components/ui/text'
import { SongListType } from '@/types/song'

type CardPropsType = {
  currentSongId?: string
}

export default function Card({ currentSongId }: CardPropsType) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const isPlayer = checkPlayerRole()
  const { setSongId, eventId } = useEventDataStore()
  const { data: songsData = [], isLoading } = useQuery({
    queryKey: ['songs', eventId],
    queryFn: async () => await getSongListService(eventId)
  })
  const [checkboxChecked, setCheckboxChecked] = useState(false)

  const [songs, setSongs] = useState<SongListType[]>([])
  const filterSong = () => {
    setCheckboxChecked(curr => !curr)
    setSongs(prev => prev.filter(curr => curr.isAssigned))
  }

  const isUserBackstage = checkBackstageRole()

  useEffect(() => {
    // if (songsData.length > 0) {
      setSongs((songsData as (SongListType & { songOrder: number })[]).sort((a, b) => a.songOrder - b.songOrder))
    // }
  }, [songsData])

  const updateOrder = async (newData: SongListType[]) => {
    try {
      await axios.patch(`/events/${eventId}/songs/reorder`, {
        songOrder: newData.map((song, idx) => ({
          songId: song.songId,
          songOrder: idx + 1,
        })),
      })
      queryClient.invalidateQueries({
        queryKey: ['songs']
      })
    } catch (error) {
      console.error('Error updating song order:', error)
    }
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<SongListType>) => (
    <Pressable
      onLongPress={isUserBackstage ? drag : undefined}
      disabled={!isUserBackstage}
      style={[
        styles.rowItem,
        item.songId === currentSongId && styles.activeRowItem,
        isActive && { backgroundColor: '#d0e1f9' }
      ]}
    >
      <Text
        onPress={() => {
          setSongId(item.songId)
          router.navigate({ pathname: '/song/detail' })
        }}
        style={styles.text}
      >
        {`${item.songOrder}. ${item.songName} (${item.songKey})`}
      </Text>
    </Pressable>
  )

  if (isLoading) {
    return (
      <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    )
  }

  return (
    <View>
      {isPlayer && songs.length > 0 ?
        <View style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          marginLeft: 20, 
          padding: 10,
          width: '60%',
          borderRadius: 16,
          backgroundColor: '#f4f4f5',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
          }}>
          <Text onPress={filterSong}>แสดงเฉพาะเพลงของฉัน</Text>
          <Checkbox
              status={checkboxChecked ? 'checked' : 'unchecked'}
              onPress={filterSong}
            />
        </View>
        : null
      }

      {
        songs.length === 0 ?
          <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
          <Text variant="titleLarge" style={{ color: '#999' }}>
            ไม่มีคิวเพลงขณะนี้
          </Text>
        </View> :


      <DraggableFlatList
      data={songs}
      onDragEnd={({ data }) => {
        if (JSON.stringify(data) === JSON.stringify(songs)) return
        
        if (!isUserBackstage) return
        
        Alert.alert(
          'ยืนยันการจัดลำดับ',
          'คุณต้องการย้ายลำดับเพลงหรือไม่?',
          [
            {
              text: 'ยกเลิก',
              style: 'cancel',
            },
            {
              text: 'ยืนยัน',
              onPress: async () => {
                setSongs(data)
                try {
                  await updateOrder(data)
                  Alert.alert('สำเร็จ', 'จัดลำดับเพลงใหม่เรียบร้อยแล้ว')
                } catch {
                  Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถอัปเดตลำดับเพลงได้')
                }
              },
            },
          ],
          { cancelable: true }
        )
      }}
      keyExtractor={(item) => item.songId.toString()}
      renderItem={renderItem}
      activationDistance={10}
      />
    }
    </View>

  )
}

const styles = StyleSheet.create({
  rowItem: {
    height: 80,
    width: '92%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#EFEAFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  activeRowItem: {
    backgroundColor: '#e0f7fa', // light cyan when active
  },
  text: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },
})