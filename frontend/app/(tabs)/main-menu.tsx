import React from 'react'
import Background from '@/components/ui/background'
import { Card } from 'react-native-paper'
import Text from '@/components/ui/text'
import { useAppTheme } from '@/hooks/use-theme'
import { router, useFocusEffect } from 'expo-router'
import { checkAdminRole } from '@/utils/check-user-role'

const Index = () => {
  const theme = useAppTheme()
  const isAdmin = checkAdminRole()

  useFocusEffect(() => {
    const func = async () => {
      const token = await window.Clerk!.session!.getToken({ template: 'testing-template' })
      console.log("test token: ", token)
    }

    func()
  })


  return (
    <Background
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>

      <Card
        onPress={() => router.push({
          pathname: '/event',

        })}
        style={{
          borderStyle: 'solid',
          width: '45%',
          marginTop: 15,
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.primary
        }}
      >
        <Card.Content>
          <Text
            variant='titleLarge'
            style={{
              textAlign: 'center'
            }}
          >
            Event
          </Text>



        </Card.Content>
      </Card>
      <Card
        onPress={async () => {
         
        }}
        style={{
          borderStyle: 'solid',
          width: '45%',
          marginTop: 15,
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.primary
        }}
      >
        <Card.Content>
          <Text
            variant='titleLarge'
            style={{
              textAlign: 'center'
            }}
          >
            Logout (temporary used)
          </Text>



        </Card.Content>
      </Card>

      <Card
        onPress={async () => {
          router.push({
            pathname: '/profile',
          })
        }}
        style={{
          borderStyle: 'solid',
          width: '45%',
          marginTop: 15,
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.primary
        }}
      >
        <Card.Content>
          <Text
            variant='titleLarge'
            style={{
              textAlign: 'center'
            }}
          >
            Profile
          </Text>



        </Card.Content>
      </Card>

      {isAdmin ? (
        <>
          <Card
            onPress={async () => {
              router.push({
                pathname: '/',
              })
            }}
            style={{
              borderStyle: 'solid',
              width: '45%',
              marginTop: 15,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.colors.primary
            }}
          >
            <Card.Content>
              <Text
                variant='titleLarge'
                style={{
                  textAlign: 'center'
                }}
              >
                Activate new account
              </Text>
            </Card.Content>


          </Card>
          <Card
            onPress={async () => {
              router.push({
                pathname: '/deactivate-account',
              })
            }}
            style={{
              borderStyle: 'solid',
              width: '45%',
              marginTop: 15,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.colors.primary
            }}
          >
            <Card.Content>
              <Text
                variant='titleLarge'
                style={{
                  textAlign: 'center'
                }}
              >
                Deactivate new account
              </Text>
            </Card.Content>


          </Card>

          <Card
            onPress={async () => {
              router.push({
                pathname: '/',
              })
            }}
            style={{
              borderStyle: 'solid',
              width: '45%',
              marginTop: 15,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.colors.primary
            }}
          >
            <Card.Content>
              <Text
                variant='titleLarge'
                style={{
                  textAlign: 'center'
                }}
              >
                Tranfer system admin previlege
              </Text>
            </Card.Content>
          </Card>
        </>
      ) : null}











    </Background>
  )
}

export default Index