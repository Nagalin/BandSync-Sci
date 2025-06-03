import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import { router } from 'expo-router'
import { format } from 'date-fns'
import Text from '@/components/ui/text'
import Calender from '@/assets/icons/calender'
import Clock from '@/assets/icons/clock'
import { useEventDataStore } from '@/zustand/store'
import { EventType } from '@/types/event'

type EventCardPropsType = Omit<EventType, 'additionalDetails' | 'dressCode'>

const EventCard = ({ eventId, eventName, eventDate, startTime, endTime, status }: EventCardPropsType) => {
  const formattedDate = format(eventDate, 'dd/MM/yy')
  const formattedStartTime = format(new Date(startTime), 'HH:mm')
  const formattedEndTime = format(new Date(endTime), 'HH:mm')
  const { setEventId } = useEventDataStore()

  return (
    <Card
      onPress={() => {
        setEventId(eventId)
        if (status === 'ONGOING') return router.push('/event/run')
        router.push({
          pathname: '/event/detail'
        })
      }
      }
      style={{
        borderStyle: 'solid',
        width: '48%',
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1.2,
        borderRadius: 16,
        backgroundColor: 'white',
        elevation: 4,
      }}
    >
      <Card.Content>
        <Text
          variant='titleLarge'
          style={{
            textAlign: 'center'
          }}
        >
          {eventName}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 7,
            marginTop: 10,
            alignItems: 'center',
            width: 110
          }}>

          <Calender width={20} height={20} />
          <Text
            variant='bodyMedium'
            style={{
              textAlign: 'center'
            }}
          >
            {formattedDate}
          </Text>

        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 7,
            marginTop: 10,
            alignItems: 'center',
            width: 110
          }}>

          <Clock width={20} height={20} />
          <Text
            variant='bodyMedium'
            style={{
              textAlign: 'center'
            }}
          >
            {formattedStartTime}-{formattedEndTime}
          </Text>

        </View>
      </Card.Content>
    </Card>
  )
}

export default EventCard