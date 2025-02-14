import { ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Background from '@/components/ui/background'
import EventCard from '@/components/event/detail/event-card'
import CreateEventModal from '@/components/event/create/modal'
import { Snackbar } from 'react-native-paper'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'
import EventLoadingCard from '@/components/event/detail/event-loading-card'

type APIResponse = {
  id: string
  eventName: string
  eventDate: Date
  startTime: string
  endTime: string
}

const Index = () => {
  const [visible, setVisible] = React.useState(true)
  const { data: mockedData, isFetching } = useQuery<APIResponse[]>({
    queryKey: ['events'],
    queryFn: async () => (await axios.get('/events')).data
  })

  if (isFetching) return <EventLoadingCard />

  const onDismissSnackBar = () => setVisible(false)

  return (
    <Background>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 15
        }}
      >
        {mockedData?.map(curr => {
          console.log(curr)
          return (
            <EventCard
              key={curr.id}
              id={curr.id}
              eventName={curr.eventName}
              eventDate={curr.eventDate}
              startTime={curr.startTime}
              endTime={curr.endTime}
            />
          )
        })}

      </ScrollView>
      <CreateEventModal />
      <Snackbar
        style={{ backgroundColor: 'red' }}
        duration={9999}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Try again',
          onPress: () => {
            console.log('clicked')
          },
        }}>
        Something went wrong
      </Snackbar>
    </Background>
  )
}

export default Index