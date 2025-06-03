import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { Checkbox } from 'react-native-paper'
import Button from '@/components/ui/button'
import useAssignPlayer from '@/components/player/use-assign-player'
import { useQuery } from '@tanstack/react-query'
import { useEventDataStore } from '@/zustand/store'
import { getUnassignedPlayerListService } from '@/services/user.service'
import { UserType } from '@/types/user'

const UnassignedPlayerList = () => {
    const { songId, playerType } = useEventDataStore()
    const { data: playersList, isFetching } = useQuery<UserType[]>({
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
            <Text style={{color: '#737070'}}> {playerType} ที่ยังไม่ถูก assigned </Text>

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