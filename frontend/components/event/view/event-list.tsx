import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import { router } from 'expo-router'
import { format } from 'date-fns'
import Text from '@/components/ui/text'
import { useAppTheme } from '@/hooks/use-theme'
import Calender from '@/assets/icons/calender'
import Clock from '@/assets/icons/clock'

type EventListPropsType = {
  id: string
  eventName: string
  eventDate: Date
  startTime: string
  endTime: string
}

const EventList = ({ id, eventName, eventDate, startTime, endTime }: EventListPropsType) => {
  const theme = useAppTheme()
  const formattedDate = format(eventDate, 'dd/MM/yy')
  const formattedStartTime = format(new Date(startTime), 'HH:mm')
  const formattedEndTime = format(new Date(endTime), 'HH:mm')

  return (
    <Card
      onPress={() => router.push({
        pathname: '/event/[id]',
        params: {
          id: id
        }
      })}
      style={{
        borderStyle: 'solid',
        width: '45%',
        marginTop: 15,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary
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

export default EventList