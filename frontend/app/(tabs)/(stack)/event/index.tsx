import React, { useState, useEffect } from 'react'
import { ScrollView, View, ImageBackground } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { useQuery } from '@tanstack/react-query'
import EventCard from '@/components/event/card'
import Modal from '@/components/event/modal'
import Text from '@/components/ui/text'
import { getEventListService } from '@/services/event'

const Index = () => {
  const [errorSnackbarVisible, seteErorSnackbarVisible] = useState(false)

  const {
    data: events,
    isPending,
    error,
    refetch
  } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await getEventListService()
  })

  useEffect(() => {
    if (error) seteErorSnackbarVisible(true)
  }, [error])

  const onDismissSnackBar = () => seteErorSnackbarVisible(false)

  return (
    <ImageBackground
      source={require('@/assets/images/bg.jpg')} // ✅ เปลี่ยน path ตามของคุณ
      resizeMode="cover"
      style={{ flex: 1, padding: 20 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          rowGap: 20,
          paddingBottom: 40,
        }}
      >
        {events?.length === 0 ? (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
            <Text variant="titleLarge" style={{ color: 'white' }}>
              ไม่มี Event ขณะนี้
            </Text>
          </View>
        ) : (
          events?.map(curr => (
            <EventCard
              key={curr.eventId}
              eventId={curr.eventId}
              eventName={curr.eventName}
              eventDate={curr.eventDate}
              startTime={curr.startTime}
              endTime={curr.endTime}
            />
          ))
        )}
      </ScrollView>

      <Modal />

      {error && (
        <Snackbar
          style={{ backgroundColor: 'red' }}
          duration={9999}
          visible={errorSnackbarVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Try again',
            onPress: () => refetch(),
          }}
        >
          เกิดข้อผิดพลาดขณะโหลดข้อมูล
        </Snackbar>
      )}
    </ImageBackground>
  )
}

export default Index
