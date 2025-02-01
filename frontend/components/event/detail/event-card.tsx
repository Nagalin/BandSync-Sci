import React from 'react'
import { Card } from 'react-native-paper'
import { format } from 'date-fns'
import { router } from 'expo-router'
import { View } from 'react-native'
import Calender from '@/assets/icons/calender'
import Clock from '@/assets/icons/clock'
import Text from '@/components/ui/text'
import { useAppTheme } from '@/hooks/use-theme'

type EventCardPropsType = {
  id: string
  name: string
  date: Date
}

const EventCard = ({ id, name, date }: EventCardPropsType) => {
  const theme = useAppTheme()
  const formattedDate = format(date, 'dd/MM/yy')

  return (
    <Card
      onPress={() => router.push({
        pathname: '/event/detail/[id]',
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
        backgroundColor: theme.colors.main
      }}
    >
      <Card.Content>
        <Text
          variant='titleLarge'
          style={{
            textAlign: 'center'
          }}
        >
          {name}
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
            18.00-19.00
          </Text>

        </View>
      </Card.Content>
    </Card>
  )
}

export default EventCard

