import React, { useState, useEffect } from 'react'
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
    const { songId, eventId, playerType } = useLocalSearchParams()
    const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({})

    const { data: playersList, isFetching } = useQuery<ApiResponse[]>({
        queryKey: ['assignedPlayerList'],
        queryFn: async () => (await axios.get(`songs/${songId}/player/${playerType}`)).data
    })

    const unassignedPlayer = async () => {
        await axios.post(`songs/${songId}/player/unassign`, {
            songId: songId,
            playerId: Object.keys(selectedUsers).filter(userId => !selectedUsers[userId])
        })
        queryClient.invalidateQueries({ queryKey: ['assignedPlayerList'] })
        queryClient.invalidateQueries({ queryKey: ['unassignedPlayerList'] })

    }


    useEffect(() => {
        if (playersList) {
            const initialSelectedState = playersList.reduce((acc, curr) => {
                acc[curr.userId] = true; // Set all to checked by default
                return acc;
            }, {} as Record<string, boolean>);
            setSelectedUsers(initialSelectedState);
        }
    }, [playersList])

    const handleToggle = (userId: string) => {
        setSelectedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }))
    }

    if (isFetching) return null

    return (
        <View>
            <Text> Bassist </Text>
            {playersList?.length === 0 ? (
                <Text>No Bassist has been assigned</Text>
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

                    <Button onPress={() => unassignedPlayer()}>
                        Confirm
                    </Button>
                </>
            )}


        </View>
    )
}

export default AssignedPlayerList