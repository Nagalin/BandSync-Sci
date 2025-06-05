import React from 'react'
import { View } from 'react-native'
import { checkAdminRole } from '@/utils/check-user-role'
import MainMenuCard from '@/components/ui/main-menu-card'
import { MaterialIcons } from '@expo/vector-icons'
import Text from '@/components/ui/text'
import { useFocusEffect } from 'expo-router'

const MainMenu = () => {
  const isAdmin = checkAdminRole()

  useFocusEffect(() => {
    const getTestingToken = async () => {
      const token = await window.Clerk!.session!.getToken({ template: 'testing-template' })
      console.log("test token: ", token)
    }
    getTestingToken()
  })

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <MainMenuCard
        href='/event'
        colorStripBackground='rgb(96, 169, 98)'
      >
        <MaterialIcons name="event" size={36} color="black" />
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>Event</Text>
      </MainMenuCard>

      <MainMenuCard
        href='/profile'
        colorStripBackground='#2196F3'
      >
        <MaterialIcons name="person" size={36} color="black" />
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>Profile</Text>
      </MainMenuCard>

      {isAdmin && (
        <>
          <MainMenuCard
            href='/admin/account-config'
            colorStripBackground='#E91E63'
          >
            <MaterialIcons name="verified-user" size={36} color="black" />
            <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>Account Config</Text>
          </MainMenuCard>

          <MainMenuCard
            href='/admin/transfer-privilege'
            colorStripBackground='#673AB7'
          >
            <MaterialIcons name="admin-panel-settings" size={36} color="black" />
            <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>Transfer Admin</Text>
          </MainMenuCard>
        </>
      )}
    </View>
  )
}

export default MainMenu