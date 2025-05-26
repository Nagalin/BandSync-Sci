import React from 'react'
import { View } from 'react-native'
import Text from '../ui/text'
import { Checkbox } from 'react-native-paper'
import Button from '../ui/button'
import useAssignPlayer from './use-assign-player'
import { useQuery } from '@tanstack/react-query'
import axios from '@/libs/axios'
import { useEventDataStore } from '@/zustand/store'
import { getUnassignedPlayerListService, User } from '@/services/user'

const UnassignedPlayerList = () => {
    const { songId, playerType } = useEventDataStore()
    const { data: playersList, isFetching } = useQuery<User[]>({
        queryKey: ['unassignedPlayerList'],
        queryFn: async () => getUnassignedPlayerListService(songId, playerType)
    })
    const {
        handleToggle,
        assignedPlayer,
        selectedUsers,
    } = useAssignPlayer()
    

    if (isFetching) return null

    
    return (
        <View style={{padding: 10}}>
            {playersList?.length === 0 ? (
                <Text>No { playerType } found</Text>
            ) : (
                <>
            <Text style={{color: '#737070'}}> Player ที่ยังไม่ถูก assigned </Text>

                <Text style={{fontSize: 18, marginLeft: 20, marginBottom: 10}}>{playerType}</Text>
                    {playersList?.map(curr => (
                        <Checkbox.Item
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            height: 40,
                            width: '100%',
                            marginBottom: 10
                        }}
                            key={curr.userId}
                            label={`${curr.firstName} ${curr.lastName} (${curr.nickName})`}
                            status={selectedUsers[curr.userId] ? 'checked' : 'unchecked'}
                            onPress={() => handleToggle(curr.userId)}
                        />
                    ))}
                    <Button onPress={() => assignedPlayer(songId, playerType)}>
                        assign player
                    </Button>
                </>
            )}
        </View>
    )
}

export default UnassignedPlayerList