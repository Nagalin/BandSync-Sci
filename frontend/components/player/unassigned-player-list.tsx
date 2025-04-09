import React from 'react'
import { View } from 'react-native'
import Text from '../ui/text'
import { Checkbox } from 'react-native-paper'
import Button from '../ui/button'
import useAssignPlayer from './use-assign-player'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import axios from '@/libs/axios'

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
    const { songId, playerType } = useLocalSearchParams()
    const { data: playersList, isFetching } = useQuery<ApiResponse[]>({
        queryKey: ['unassignedPlayerList'],
        queryFn: async () => (await axios.get(`songs/${songId}/player/unassigned/${playerType}`)).data
    })
    const {
        handleToggle,
        assignedPlayer,
        selectedUsers,
    } = useAssignPlayer()
    

    if (isFetching) return null

    
    return (
        <View>
            {playersList?.length === 0 ? (
                <Text>No { playerType } found</Text>
            ) : (
                <>
                <Text style={{fontSize: 20}}>Unassigned {playerType}</Text>
                    {playersList?.map(curr => (
                        <Checkbox.Item
                            key={curr.userId}
                            label={curr.nickName}
                            status={selectedUsers[curr.userId] ? 'checked' : 'unchecked'}
                            onPress={() => handleToggle(curr.userId)}
                        />
                    ))}
                    <Button onPress={() => assignedPlayer(songId as string, playerType as string)}>
                        Confirm
                    </Button>
                </>
            )}
        </View>
    )
}

export default AssignedPlayerList