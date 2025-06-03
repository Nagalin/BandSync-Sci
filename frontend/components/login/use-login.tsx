import * as AuthSession from 'expo-auth-session'
import { useSSO, useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useSocketQuery } from '@/hooks/use-socket-query'
import axios from '@/libs/axios'
import { useCallback } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'
import { RolesType, UserType } from '@/types/user'

const useLogin = () => {
    useSocketQuery()
    const { getToken, isSignedIn, signOut } = useAuth()
    const router = useRouter()
    const { startSSOFlow } = useSSO()

    const storeRoles = async (role: RolesType[]) => {
        try {
            const secureStoreKey = 'user_roles'
            const rolesData = JSON.stringify(role)
            await SecureStore.setItemAsync(secureStoreKey, rolesData)
        } catch (error) {
            console.error('Error storing roles:', error)
        }
    }

    const login = useCallback(async () => {
        if (isSignedIn) await signOut()
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: 'oauth_discord',
                redirectUrl: AuthSession.makeRedirectUri(),
            })

            if (createdSessionId) {
                await setActive?.({ session: createdSessionId })

                const token = await getToken()
                const res = await axios.get<UserType>('/auth/user', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })

                storeRoles(res.data.roles)
                await SecureStore.setItemAsync('userId', res.data.userId)
                router.push('/main-menu')
            }
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้')
            await signOut()
        }
    }, [getToken, isSignedIn])

    return { login }
}

export default useLogin