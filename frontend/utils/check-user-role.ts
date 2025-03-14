import * as SecureStore from 'expo-secure-store';

export const checkBackstageRole =  () => {
  const value = JSON.parse(SecureStore.getItem('user_roles') as string)
  return !!value.find((curr: any) => curr.role === 'backstage')
}

export const checkAdminRole =  () => {
  const value = JSON.parse(SecureStore.getItem('user_roles') as string)
  return !!value.find((curr: any) => curr.role === 'admin')
}