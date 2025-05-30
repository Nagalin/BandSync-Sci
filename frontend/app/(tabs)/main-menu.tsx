import React from 'react'
import { View } from 'react-native'
import { checkAdminRole } from '@/utils/check-user-role'
import MainMenuCard from '@/components/ui/main-menu-card'

const MainMenu = () => {
  const isAdmin = checkAdminRole()

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
      <MainMenuCard menuName='Event' href='/event'  />
      <MainMenuCard menuName='Profile' href='/profile'/>

      {isAdmin && (
        <>
          <MainMenuCard menuName='Account-config' href='/account-config' />
          <MainMenuCard menuName='Transfer Admin' href='/transfer'/>
        </>
      )}

    </View>
  )
}

export default MainMenu