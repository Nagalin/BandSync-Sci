import { useAuth } from '@clerk/clerk-expo';
import axiosInstance from 'axios';
import * as SecureStore from 'expo-secure-store';

const useAxiosWithAuth = () => {
    const { getToken } = useAuth();

    const axios = axiosInstance.create({
        baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    });

    axios.interceptors.request.use(async (config) => {
        const jwt = await SecureStore.getItemAsync('__clerk_client_jwt');
        console.log("this is " + jwt);
        const token = await getToken();
        console.log(token)
        if (jwt) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return axios;
};

export default useAxiosWithAuth;
