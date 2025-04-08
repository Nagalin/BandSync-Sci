import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{
            title: 'Assign player'
        }} />
    </Stack>
  )
}

export default Layout