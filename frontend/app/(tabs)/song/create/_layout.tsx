import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'สร้างเพลง',
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
        }}
      />
    </Stack>
  )
}

export default Layout