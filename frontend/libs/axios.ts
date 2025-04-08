import { getClerkInstance } from "@clerk/clerk-expo";
import axiosInstance from "axios";

const axios = axiosInstance.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
})

axios.interceptors.request.use(async (config) => {
    const clerkInstance = getClerkInstance()
    const token = await clerkInstance.session?.getToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default axios