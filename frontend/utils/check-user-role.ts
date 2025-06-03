import * as SecureStore from 'expo-secure-store'

export const checkBackstageRole =  () => {
  const value = JSON.parse(SecureStore.getItem('user_roles') as string)
  return !!value.find((curr: any) => curr.role === 'backstage')
}

export const checkAdminRole =  () => {
  const value = JSON.parse(SecureStore.getItem('user_roles') as string)
  return !!value.find((curr: any) => curr.role === 'admin')
}

export const checkPlayerRole =  () => {
  const value = JSON.parse(SecureStore.getItem('user_roles') as string)
  return !!value.find((curr: any) => curr.role === 'vocalist' || curr.role ==='guitarist'  ||
  curr.role ==='bassist' ||
  curr.role ==='drummer' ||
  curr.role ==='Keyboardist' ||
  curr.role ==='extra' ||
  curr.role ==='percussionist'
  )
}