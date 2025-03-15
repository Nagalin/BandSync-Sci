import { View, } from 'react-native'
import React from 'react'
import TextInput from '@/components/ui/text-input'
import useAxiosWithAuth from '@/hooks/use-axios-with-auth';
import { useQuery } from '@tanstack/react-query';
import Button from '../ui/button';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
type APIResponseType = {
    discordId: string;
    discordUsername: string;
    firstName: string;
    isActive: boolean;
    lastName: string;
    nickName: string;
    roles: RolesType[];
    userId: string;
}

type RolesType = {
    role: string;
    roleId: string;
}

const Profile = () => {
    const axios = useAxiosWithAuth()
    const { signOut } = useAuth()
    const router = useRouter()

    const { data: user, isFetching } = useQuery<APIResponseType>({
        queryKey: ['profile'],
        queryFn: async () => (await axios.get('/auth/user')).data
    })

    if (isFetching) return
    return (
        <View style={{ flexDirection: 'column', padding: 10, gap: 10 }}>

            <TextInput
                label='ชื่อ-นามสกุล'
                value={`${user?.firstName} ${user?.lastName}`}
                editable={false}
            />
            <TextInput
                label='ชื่อเล่น'
                value={user?.nickName}
                editable={false}
            />
            <TextInput
                label='ตำแหน่ง'
                value={user?.roles.map(curr => curr.role).join(', ') || ''}
                editable={false}
            />
            <TextInput
                label='discord id'
                value={user?.discordId}
                editable={false}
            />
            <TextInput
                label='discord username'
                value={user?.discordUsername}
                editable={false}
            />

            <Button 
            onPress={ async () => {
                await signOut()
                router.push({
                    pathname: '/'
                })

            }}>
                Logout
            </Button>
        </View>
    )
}

export default Profile