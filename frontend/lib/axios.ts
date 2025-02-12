import axiosIntstance from 'axios'

const axios = axiosIntstance.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL
})

export default axios