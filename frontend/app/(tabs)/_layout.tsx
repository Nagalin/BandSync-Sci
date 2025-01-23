import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const TabsLayout = () => {
  return (
    <Tabs>

      <Tabs.Screen
        name='event/view'
        options={{
          title: 'View Event',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='eye' color={color} />
        }}
      />

      <Tabs.Screen
        name='event/detail'
        options={{
          headerShown: false,
          href: null
        }}
      />
    </Tabs>
  )
}

export default TabsLayout