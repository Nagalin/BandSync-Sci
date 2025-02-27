import React from 'react'
import Background from '@/components/ui/background'
import EventCard from '@/components/event/view/event-list'
import { Card } from 'react-native-paper'
import Text from '@/components/ui/text'
import { View } from 'react-native'
import { useAppTheme } from '@/hooks/use-theme'
import { router } from 'expo-router'


const Index = () => {
  const theme = useAppTheme()




  return (
    <Background
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>

      <Card
        onPress={() => router.push({
          pathname: '/event',
          
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
            Event
          </Text>



        </Card.Content>
      </Card>
      <Card
        onPress={() => router.push({
          pathname: '/event',
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
            Event
          </Text>



        </Card.Content>
      </Card>


    </Background>
  )
}

export default Index