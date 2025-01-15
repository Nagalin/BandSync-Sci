import React from 'react'
import { format } from 'date-fns'
import { Card, Text, useTheme } from 'react-native-paper'

type EventCardPropsType = {
  name: string
  date: Date
}

const EventCard = ({ name, date }: EventCardPropsType) => {
  const theme = useTheme()
  const formattedDate = format(date, 'dd/MM/yy')

  return (
    <Card
      mode='outlined'
      style={{
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
          {name}
        </Text>

        <Text
          variant='bodyMedium'
          style={{
            textAlign: 'center'
          }}
        >
          {formattedDate}
        </Text>
      </Card.Content>
    </Card>
  )
}

export default EventCard