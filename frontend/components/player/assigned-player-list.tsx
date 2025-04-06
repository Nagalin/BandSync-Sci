import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Text from '../ui/text'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useAxiosWithAuth from '@/hooks/use-axios-with-auth'
import { useLocalSearchParams } from 'expo-router'
import { Checkbox } from 'react-native-paper'
import Button from '../ui/button'

export type ApiResponse = {
    songId:               string;
    songName:             string;
    songDescription:      string;
    songOrder:            number;
    songKey:              string;
    songReference:        string;
    totalVocalist:        number;
    currentVocalList:     number;
    totalGuitarist:       number;
    currentGuitarist:     number;
    totalDrummer:         number;
    currentDrummer:       number;
    totalBassist:         number;
    currentBassist:       number;
    totalKeyboardist:     number;
    currentKeyboardist:   number;
    totalExtra:           number;
    currentExtra:         number;
    totalPercussionist:   number;
    currentPercussionist: number;
    eventId:              string;
    users:                User[];
}

type User = {
    userId: string;
    firstName: string;
    lastName: string;
    nickName: string;
    discordId: string;
    discordUsername: string;
    isActive: boolean;
}



const AssignedPlayerList = () => {
    const queryClient = useQueryClient()
    const axios = useAxiosWithAuth()
    const { songId, playerType } = useLocalSearchParams()
    const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({})

    const { data: playersList, isFetching } = useQuery<ApiResponse[]>({
        queryKey: ['assignedPlayerList'],
        queryFn: async () => (await axios.get(`songs/${songId}/player/assigned/${playerType}`)).data
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
        if (playersList && playersList[0]?.users) {
            const initialSelectedState: Record<string, boolean> = {};
            playersList[0].users.forEach(user => {
                initialSelectedState[user.userId] = true;
            });
            setSelectedUsers(initialSelectedState);
        }
    }, [playersList]);

    const handleToggle = (userId: string) => {
        setSelectedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }))
    }

    if (isFetching) return null

    console.log(playersList)

    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}> 
                {playerType} {playersList![0].currentBassist} / {playersList![0].totalBassist}
                </Text>
            {playersList![0].users.length === 0 ? (
                <Text>No {playerType} has been assigned</Text>
            ) : (
                <>
                    {playersList?.map((curr, index) => (
                        <Checkbox.Item
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                height: 40,
                                width: '100%',
                                marginBottom: 10
                            }}
                            key={curr.songId}
                            label={curr.users[index].nickName}
                            status={selectedUsers[curr.users[index].userId] ? 'checked' : 'unchecked'}
                            onPress={() => handleToggle(curr.users[index].userId)}
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