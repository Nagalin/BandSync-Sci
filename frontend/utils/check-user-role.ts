import * as SecureStore from 'expo-secure-store';

export const isBackstage =  () => {
  const value = JSON.parse(SecureStore.getItem('user_roles') as string)
  return !!value.find((curr: any) => curr.role === 'backstage')
}