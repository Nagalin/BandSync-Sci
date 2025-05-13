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
        name='deactivate-account'
        options={{
          href: null,
          title: 'Deactivate Account',
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}

      />

      <Tabs.Screen
        name="transfer"
        options={{
          href: null,
          title: 'Transfer System Admin Privileges',
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}
      />

      {/* <Tabs.Screen
        name='song/index'
        options={{
          href: null,
          title: 'คิวเพลง',
          headerTitleStyle: { fontFamily: 'IBMPlexSans_400Regular' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}

      /> */}

      {/* <Tabs.Screen
        name='song/create'
        options={{
          href: null,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}

      /> */}

      {/* <Tabs.Screen
        name='song/detail'
        options={{
          href: null,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}

      /> */}

      {/* <Tabs.Screen
        name='event/detail'
        options={{
          href: null,
          title: 'รายละเอียด Event',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}

      /> */}



    </Tabs>
  )
}

export default TabsLayout