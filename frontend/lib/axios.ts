import { useAuth } from '@clerk/clerk-expo';
import axiosIntstance from 'axios'
import * as SecureStore from 'expo-secure-store';

const getClerkToken = async () => {
    const { getToken } = useAuth()
    return await getToken()
}
const axios = axiosIntstance.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL
})

// axios.interceptors.request.use(async config => {
//     const jwt = await SecureStore.getItemAsync('__clerk_client_jwt');
//     console.log("this is "+jwt)
//     const token = await getClerkToken()
//     if (jwt) config.headers.Authorization = `Bearer ${token}`
//     return config
// })

export default axios