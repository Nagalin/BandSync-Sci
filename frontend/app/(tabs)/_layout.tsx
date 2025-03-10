import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const TabsLayout = () => {
  return (
    <Tabs backBehavior='history'>

      <Tabs.Screen
        name='main-menu'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='eye' color={color} />
        }}
      />

      <Tabs.Screen
        name='event'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='eye' color={color} />
        }}
      />

    </Tabs>
  )
}

export default TabsLayout