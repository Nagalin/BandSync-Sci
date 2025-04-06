import React, { useState } from 'react'
import { View } from 'react-native'
import Text from '../ui/text'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useAxiosWithAuth from '@/hooks/use-axios-with-auth'
import { useLocalSearchParams } from 'expo-router'
import { Checkbox } from 'react-native-paper'
import Button from '../ui/button'

export type ApiResponse = {
    discordId: string;
    discordUsername: string;
    firstName: string;
    isActive: boolean;
    lastName: string;
    nickName: string;
    userId: string;
}

const AssignedPlayerList = () => {
    const queryClient = useQueryClient()
    const axios = useAxiosWithAuth()
    const { songId, playerType } = useLocalSearchParams()
    const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({})
    
    const handleToggle = (userId: string) => {
        setSelectedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }))
    }

    const assignedPlayer = async () => {
        try {
            const res = await axios.post(`songs/${songId}/player/assign`, {
                songId: songId,
                playerId: Object.keys(selectedUsers).filter(userId => selectedUsers[userId])
            })
            queryClient.invalidateQueries({ queryKey: ['assignedPlayerList'] })
            queryClient.invalidateQueries({ queryKey: ['unassignedPlayerList'] })
            
        } catch (error) {
            console.error("Error assigning players: ",error)
            alert('Cannot add more players')
            
        }
        
    }

    const { data: playersList, isFetching } = useQuery<ApiResponse[]>({
        queryKey: ['unassignedPlayerList'],
        queryFn: async () => (await axios.get(`songs/${songId}/player/unassigned/${playerType}`)).data
    })

    if (isFetching) return null

    console.log('playersList unassigned', playersList)
    
    return (
        <View>
            {playersList?.length === 0 ? (
                <Text>No { playerType } found</Text>
            ) : (
                <>
                    {playersList?.map(curr => (
                        <Checkbox.Item
                            key={curr.userId}
                            label={curr.nickName}
                            status={selectedUsers[curr.userId] ? 'checked' : 'unchecked'}
                            onPress={() => handleToggle(curr.userId)}
                        />
                    ))}
                    <Button onPress={() => assignedPlayer()}>
                        Confirm
                    </Button>
                </>
            )}
        </View>
    )
}

export default AssignedPlayerList