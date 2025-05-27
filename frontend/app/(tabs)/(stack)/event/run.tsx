import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Modal as RnModal, Portal } from 'react-native-paper'
import { useQuery } from '@tanstack/react-query'
import { MaterialIcons } from '@expo/vector-icons'
import Background from '@/components/ui/background'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import TextInput from '@/components/ui/text-input'
import CloseButton from '@/assets/icons/close-square'
import { checkBackstageRole } from '@/utils/check-user-role'
import {
  getCurrentSongService,
  updateCurrentSongService,
  getEventInfoService,
} from '@/services/event'
import { getSongListService, notificationService } from '@/services/song'
import { useAppTheme } from '@/hooks/use-theme'
import { emitSocketEvent } from '@/hooks/use-socket-query'
import { useEventDataStore } from '@/zustand/store'
import { useForm } from 'react-hook-form'
import Form from '../../../../components/event/form';
import Controller from '@/components/ui/form-controller'

const formatDate = (date: Date) =>
  date.toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })

const formatTime = (date: Date) =>
  date.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

function Run() {
  const theme = useAppTheme()
  const { eventId, songId, setSongId } = useEventDataStore()
  const router = useRouter()
  const isUserBackstage = checkBackstageRole()

  const [openModal, setOpenModal] = useState(false)
  const showModal = () => {
    if(isLastSong) return Alert.alert('คำเตือน', 'ไม่สามารถแจ้งเตือนในเพลงถัดไปได้เนื่องจากเพลงนี้เป็นเพลงสุดท้ายแล้ว')
  
    setOpenModal(true)
  }
  const confirmCloseModal = () => {
    Alert.alert('คำเตือน', 'คุณต้องการยกเลิกการสร้าง event หรือไม่', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setOpenModal(false) },
    ])
  }
  const closeModal = () => setOpenModal(false)

  type FormType = {
    notiMessage: string
  }

  const { control, handleSubmit, register } = useForm<FormType>()

  const onSubmit = handleSubmit(async (data) => {
    if(isLastSong) return Alert.alert('คำเตือน', 'ไม่สามารถไปเพลงถัดไปได้เนื่องจากเพลงนี้เป็นเพลงสุดท้ายแล้ว')

    await notificationService(eventId, songId, data.notiMessage)
    Alert.alert('สำเร็จ', 'แจ้งเตือนสำเร็จ')
    closeModal()
  })

  const { data: currentSong, isPending: loadingCurrent, isError } = useQuery({
    queryKey: ['currentSong'],
    queryFn: async () => {
      const song = await getCurrentSongService(eventId)
      setSongId(song.songId)
      return song
    },
  })

  const { data: songs = [] } = useQuery({
    queryKey: ['songs', eventId],
    queryFn: async () => await getSongListService(eventId),
  })

  const { data: event } = useQuery({
    queryKey: ['event-detail', eventId],
    queryFn: () => getEventInfoService(eventId),
    enabled: !!eventId,
  })
  const lastIndex = songs.length - 1
  const isLastSong = songs[lastIndex].songId === currentSong?.songId


  const eventDate = event?.eventDate ? new Date(event.eventDate) : undefined
  const startTime = event?.startTime ? new Date(event.startTime) : undefined
  const endTime = event?.endTime ? new Date(event.endTime) : undefined

  if (isError || loadingCurrent) return null

  return (
    <Background>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text style={{ fontSize: 14, color: '#777' }}>รายการเพลงทั้งหมด</Text>

        {event && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 }}>
            <MaterialIcons name="event" size={24} color="#4CAF50" />
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                {event.eventName}
              </Text>
              <Text style={{ fontSize: 14, color: '#555' }}>
                {eventDate ? formatDate(eventDate) : '-'} |{' '}
                {startTime ? formatTime(startTime) : '-'} -{' '}
                {endTime ? formatTime(endTime) : '-'}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 1, backgroundColor: '#eee', marginTop: 12 }} />
      </View>

      {/* Current Song List */}
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

      {/* Buttons */}
      {isUserBackstage && (
        <View style={{ position: 'absolute', bottom: 20, right: 20, gap: 12 }}>
          <Button
          
            style={{
              backgroundColor: '#FF9800',
              borderRadius: 30,
              height: 60,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={showModal}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>🔔 แจ้งเตือน</Text>
          </Button>
        </View>
      )}

      <Button
      // disabled={isLastSong}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundColor: '#2196F3',
          borderRadius: 30,
          height: 60,
          paddingHorizontal: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={async () => {
          if(isLastSong) return Alert.alert('คำเตือน', 'ไม่สามารถไปเพลงถัดไปได้เนื่องจากเพลงนี้เป็นเพลงสุดท้ายแล้ว')
          const now = new Date()
          const eventStart = event?.startTime ? new Date(event.startTime) : null
          if (eventStart && now < eventStart) {
            Alert.alert('ไม่สามารถเริ่ม Event ได้', 'ยังไม่ถึงเวลาเริ่มงาน')
            return
          }

          Alert.alert('ยืนยัน', 'คุณต้องการเลื่อนไปเพลงถัดไปหรือไม่', [
            { text: 'ยกเลิก', style: 'cancel' },
            {
              text: 'ยืนยัน',
              onPress: async () => {
                await updateCurrentSongService(eventId)
                emitSocketEvent()
              },
            },
          ])
        }}
      >
        <Text  style={{ color: 'white', fontWeight: 'bold' }}>⏭️ เพลงถัดไป</Text>
      </Button>

      {/* Modal แจ้งเตือน */}
      <Portal>
        <RnModal
          dismissable={false}
          visible={openModal}
          onDismiss={confirmCloseModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 20,
            padding: 16,
            borderRadius: 16,
            height: '60%',
            justifyContent: 'flex-start',
          }}
        >
          <CloseButton
            onPress={confirmCloseModal}
            style={{ alignSelf: 'flex-end' }}
            width={48}
            height={48}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
                แจ้งเตือน player เพลงถัดไป (เพลง {currentSong.songName})
              </Text>

              <Controller
                            label='ข้อความแจ้งเตือน (optional)'
                            control={control}
                            name='notiMessage'
                            style={{ minWidth: 170 }}
                        />
              <Button
    
    onPress={onSubmit}
                
                style={{ marginTop: 12 }}
                >
                ส่งแจ้งเตือน
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
        </RnModal>
      </Portal>
    </Background>
  )
}

export default Run
