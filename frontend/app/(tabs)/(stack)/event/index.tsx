import React from 'react'
import { ScrollView, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import EventCard from '@/components/event/card'
import Modal from '@/components/event/modal'
import Text from '@/components/ui/text'
import { getEventListService } from '@/services/event.service'
import Background from '@/components/ui/background'

const Index = () => {
  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await getEventListService()
  })

  return (
    <Background style={{ flex: 1, padding: 20 }}>
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
            <Text variant="titleLarge" style={{ color: '#999' }}>
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
              status={curr.status}
            />
          ))
        )}
      </ScrollView>

      <Modal />
    </Background>
  )
}

export default Index