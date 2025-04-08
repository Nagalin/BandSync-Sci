import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather';

const TabsLayout = () => {
  return (
    <Tabs backBehavior='history'>

      <Tabs.Screen
        name='main-menu'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) =>  <FontAwesome size={28} name='th-list' color={color} />
        }}
      />

      <Tabs.Screen
        name='event'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='music' color={color} />
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}
      />

      <Tabs.Screen
        name='deactivate-account'
        options={{
          headerShown: false,
          href: null,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='eye' color={color} />
        }}
      />

    </Tabs>
  )
}

export default TabsLayout