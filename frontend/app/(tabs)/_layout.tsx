import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const TabsLayout = () => {
  const router = useRouter()
  return (
    <Tabs >

      <Tabs.Screen
        name='main-menu'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='th-list' color={color} />
        }}
      />

      <Tabs.Screen
        name='(stack)'
        options={{
          title: 'Event ทั้งหมด',
          headerShown: false,
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='music' color={color} />
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()

            router.dismissAll()
            router.navigate('/event')
          }

        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}

      />

      <Tabs.Screen
        name="admin/transfer-privilege"
        options={{
          href: null,
          title: 'Transfer System Admin Privileges',
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}
      />

      <Tabs.Screen
        name="admin/account-config"
        options={{
          href: null,

        }}
      />

    </Tabs>
  )
}

export default TabsLayout