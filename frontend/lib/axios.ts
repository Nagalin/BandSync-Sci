import axiosIntstance from 'axios'
import * as SecureStore from 'expo-secure-store';

const axios = axiosIntstance.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL
})

axios.interceptors.request.use(async config => {
    const sessionId = await SecureStore.getItemAsync('__clerk_client_jwt');
    console.log("this is "+sessionId)
    if (sessionId) config.headers.Authorization = `Bearer ${sessionId}`
    return config
})

export default axios