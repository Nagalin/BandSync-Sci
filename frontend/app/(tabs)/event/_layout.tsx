import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Event ทั้งหมด',
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'รายละเอียด event',
          headerBackVisible: false,
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
        }}
      />
    </Stack>
  );
};

export default Layout;