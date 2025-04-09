import React, { useEffect } from 'react'
import { View } from 'react-native'
import Text from '../ui/text'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { Checkbox } from 'react-native-paper'
import Button from '../ui/button'
import axios from '@/libs/axios'
import useUnassignPlayer from './use-unassign-player'

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
    const { songId, playerType } = useLocalSearchParams()
    const {
        selectedUsers,
        setSelectedUsers,
        handleToggle,
        unassignedPlayer
    } = useUnassignPlayer()

    const { data: playersList, isFetching } = useQuery<ApiResponse[]>({
        queryKey: ['assignedPlayerList'],
        queryFn: async () => (await axios.get(`songs/${songId}/player/assigned/${playerType}`)).data
    })

    useEffect(() => {
        if (playersList && playersList[0]?.users) {
            const initialSelectedState: Record<string, boolean> = {};
            playersList[0].users.forEach(user => {
                initialSelectedState[user.userId] = true;
            });
            setSelectedUsers(initialSelectedState);
        }
    }, [playersList]);

    

    if (isFetching) return null


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

                    <Button onPress={() => unassignedPlayer(songId as string)}>
                        Confirm
                    </Button>
                </>
            )}


        </View>
    )
}

export default AssignedPlayerList