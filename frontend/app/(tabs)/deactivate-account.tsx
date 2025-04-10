import { View } from 'react-native'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Checkbox } from 'react-native-paper'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import axios from '@/libs/axios'
import { useEventDataStore } from '@/zustand/store'

type UsersType = {
    discordId:       string;
    discordUsername: string;
    firstName:       string;
    isActive:        boolean;
    lastName:        string;
    nickName:        string;
    userId:          string;
}

const DeactivateAccountPage = () => {
    const { playerType } = useEventDataStore()
    const { data: users, isFetching } = useQuery<UsersType[]>({
        queryKey: ['users'],
        queryFn: async () => (await axios.get('/user')).data
    })

    const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({})
    const { mutate } = useMutation({
        mutationFn: async () => (await axios.patch('/user/deactivate', {
            userId: Object.keys(selectedUsers).filter(userId => selectedUsers[userId])
        }))
    })

    if (isFetching) return null

    const handleToggle = (userId: string) => {
        setSelectedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }))
    }

    return (
        <View>
            <Text> Unassigned {playerType}</Text>
            {users?.map(user => (
                <Checkbox.Item
                    key={user.userId}
                    label={user.nickName}
                    status={selectedUsers[user.userId] ? 'checked' : 'unchecked'}
                    onPress={() => handleToggle(user.userId)}
                />
            ))}
            <Button onPress={() => mutate()}> ปิดบัญชี </Button>
        </View>
    )
}

export default DeactivateAccountPage
