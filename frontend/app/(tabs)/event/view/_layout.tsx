import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        title: 'event ทั้งหมด',
        headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' }
      }}
    />
  )
}

export default Layout