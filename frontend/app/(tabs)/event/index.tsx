import { ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'; // Add useEffect
import Background from '@/components/ui/background';
import EventCard from '@/components/event/view/event-card';
import CreateEventModal from '@/components/event/create/modal';
import { Snackbar } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import EventLoadingCard from '@/components/event/view/event-loading-card';

type APIResponse = {
  id: string;
  eventName: string;
  eventDate: Date;
  startTime: string;
  endTime: string;
};

const Index = () => {
  const [visible, setVisible] = useState(false); // Initialize as false

  const {
    data: mockedData,
    isFetching,
    error,
    refetch,
  } = useQuery<APIResponse[]>({
    queryKey: ['events'],
    queryFn: async () => (await axios.get('/events')).data,
  });

  useEffect(() => {
    if (error) {
      setVisible(true); // Set visible to true when there's an error
    }
  }, [error]);

  if (isFetching) return <EventLoadingCard />;

  const onDismissSnackBar = () => setVisible(false);

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
        {mockedData?.map((curr) => {
          return (
            <EventCard
              key={curr.id}
              id={curr.id}
              eventName={curr.eventName}
              eventDate={curr.eventDate}
              startTime={curr.startTime}
              endTime={curr.endTime}
            />
          );
        })}
      </ScrollView>

      <CreateEventModal />

      {error && (
        <Snackbar
          style={{ backgroundColor: 'red' }}
          duration={9999}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Try again',
            onPress: () => {
              refetch(); // Trigger a refetch of the data
            },
          }}
        >
          Something went wrong
        </Snackbar>
      )}
    </Background>
  );
};

export default Index;