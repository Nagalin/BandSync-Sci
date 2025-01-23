import { ScrollView } from 'react-native'
import React from 'react'
import Background from '@/components/ui/background'
import EventCard from '@/components/event/view/event-card'
import CreateEventModal from '@/components/event/create/create-event-modal'
import { Snackbar } from 'react-native-paper';
type Event = {
  id: string
  name: string
  date: Date
}

const Index = () => {
  const [visible, setVisible] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);
  const mockedData: Event[] = [
    { id: '1', name: 'Event 1', date: new Date('2064-01-10') },
    { id: '2', name: 'Event 2', date: new Date('2066-01-12') },
    { id: '3', name: 'Event 3', date: new Date('2067-01-15') },
    { id: '4', name: 'Event 1', date: new Date('2064-01-10') },
    { id: '5', name: 'Event 2', date: new Date('2066-01-12') },
  ]
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
        {mockedData.map(curr => {
          return (
            <EventCard key={curr.id} id={curr.id} name={curr.name} date={curr.date} />
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