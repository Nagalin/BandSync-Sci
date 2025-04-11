import React, { useEffect } from 'react'
import { View } from 'react-native'
import Text from '../ui/text'
import { useQuery } from '@tanstack/react-query'
import { Checkbox } from 'react-native-paper'
import Button from '../ui/button'
import axios from '@/libs/axios'
import useUnassignPlayer from './use-unassign-player'
import { useEventDataStore } from '@/zustand/store'

export type ApiResponse = {
    totalPlayer: number;
    currentPlayer: number;
    players: Player[];
}

export type Player = {
    userId: string;
    firstName: string;
    lastName: string;
    nickName: string;
    discordId: string;
    discordUsername: string;
    isActive: boolean;
    roles: Role[];
}

export type Role = {
    roleId: string;
    role: string;
}

const AssignedPlayerList = () => {
    const { songId, playerType } = useEventDataStore()
    const {
        selectedUsers,
        setSelectedUsers,
        handleToggle,
        unassignedPlayer
    } = useUnassignPlayer()

    const { data: playersList, isFetching } = useQuery<ApiResponse>({
        queryKey: ['assignedPlayerList'],
        queryFn: async () => (await axios.get(`songs/${songId}/player/assigned/${playerType}`)).data
    })

    useEffect(() => {
        if (playersList?.players) {
            const initialSelectedState: Record<string, boolean> = {};
            playersList.players.forEach(user => {
                initialSelectedState[user.userId] = true;
            });
            setSelectedUsers(initialSelectedState);
        }
    }, [playersList]);


    if (isFetching) return null


    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {playerType} {playersList!.currentPlayer} / {playersList!.totalPlayer}
            </Text>
            {playersList?.currentPlayer === 0 ? (
                <Text>No {playerType} has been assigned</Text>
            ) : (
                <>
                    {playersList?.players.map((curr, index) => (
                        <Checkbox.Item
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                height: 40,
                                width: '100%',
                                marginBottom: 10
                            }}
                            key={curr.userId}
                            label={curr.nickName}
                            status={selectedUsers[curr.userId] ? 'checked' : 'unchecked'}
                            onPress={() => handleToggle(curr.userId)}
                        />
                    ))}

                    <Button onPress={() => unassignedPlayer(songId as string)}>
                        Confirm
                    </Button>
                </>
            )}


        </View>
    )
}

export default AssignedPlayerList