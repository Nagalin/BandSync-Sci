import { View, } from 'react-native'
import React from 'react'
import TextInput from '@/components/ui/text-input'
import { useQuery } from '@tanstack/react-query'
import Button from '@/components/ui/button'
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { getUserService } from '@/services/user'

const Profile = () => {
    const { signOut } = useAuth()
    const router = useRouter()
    const { data: user, isFetching } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => await getUserService()
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
                label='discord ID'
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