import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { Skeleton } from 'moti/skeleton'
import { useQuery } from '@tanstack/react-query'
import Background from '@/components/ui/background'
import EventCard from '@/components/event/view/event-card'
import Modal from '@/components/event/create/modal'
import Text from '@/components/ui/text'
import useAxiosWithAuth from '@/lib/use-axios-with-auth'
import { Clerk, useAuth } from '@clerk/clerk-expo'

type APIResponse = {
  eventId: string
  eventName: string
  eventDate: Date
  startTime: Date
  endTime: Date
}

const Index = () => {
  const axios = useAxiosWithAuth()
  const [snackbarVisible, setSnackbarVisible] = useState(false)

  const {
    data: events,
    isFetching,
    error,
    refetch,
  } = useQuery<APIResponse[]>({
    queryKey: ['events'],
    queryFn: async () => (await axios.get('/events')).data
  })

  useEffect(() => {
    if (error) {
      setSnackbarVisible(true)
    }
  }, [error])

  if (isFetching) return <EventLoadingCard />

  const onDismissSnackBar = () => setSnackbarVisible(false)

  return (
    <Background>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}
      >
        {events?.length === 0 ? (
          <View style={{ marginTop: 15 }}>
            <Text style={{fontSize: 20}}> ไม่มี Event ขณะนี้.....</Text>
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
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Try again',
            onPress: () => {
              refetch()
            }
          }}
        >
          Something went wrong
        </Snackbar>
      )}
    </Background>
  )
}

const EventLoadingCard = () => {
  return (
    <Background
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15
      }}>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>

      <View style={{ marginTop: 15, width: '45%' }}>
        <Skeleton colorMode='light' width={'100%'} height={150} />
      </View>
    </Background>
  )
}

export default Index