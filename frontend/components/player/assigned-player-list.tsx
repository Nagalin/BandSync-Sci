import React, { useEffect } from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { useQuery } from '@tanstack/react-query'
import { Checkbox } from 'react-native-paper'
import Button from '@/components/ui/button'
import useUnassignPlayer from '@/components/player/use-unassign-player'
import { useEventDataStore } from '@/zustand/store'
import { getAssignedPlayerListService } from '@/services/user.service'
import { checkBackstageRole } from '@/utils/check-user-role'
import { AssignedPlayerListType } from '@/types/user'

const AssignedPlayerList = () => {
    const { songId, playerType } = useEventDataStore()
    const isBackstage = checkBackstageRole()
    const {
        selectedUsers,
        setSelectedUsers,
        handleToggle,
        unassignedPlayer
    } = useUnassignPlayer()

    const { data: playersList, isFetching } = useQuery<AssignedPlayerListType>({
        queryKey: ['assignedPlayerList'],
        queryFn: async () => await getAssignedPlayerListService(songId, playerType)
    })

    useEffect(() => {
        if (playersList?.players) {
            const initialSelectedState: Record<string, boolean> = {}
            playersList.players.forEach(user => {
                initialSelectedState[user.userId] = true
            })
            setSelectedUsers(initialSelectedState)
        }
    }, [playersList])


    if (isFetching) return null

    return (
        <View style={{ padding: 10 }}>
            <Text style={{color: '#737070'}}> Player ที่ถูก assigned </Text>
            <Text style={{marginLeft: 20, fontSize: 18, marginBottom: 10 }}>
                {playerType} {playersList!.currentPlayer} / {playersList!.totalPlayer}
            </Text>

            {playersList?.currentPlayer === 0 ? (
                <Text>{playerType} ยังไม่ถูก assigned</Text>
            ) : (
                <>
                    {playersList?.players.map(curr => (
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
                            disabled={!isBackstage}
                            status={selectedUsers[curr.userId] ? 'checked' : 'unchecked'}
                            onPress={() => handleToggle(curr.userId)}
                        />
                    ))}

                    {isBackstage ?
                        <Button onPress={() => unassignedPlayer(songId)}>
                            unassign player
                        </Button> :
                        null
                    }

                </>
            )}
        </View>
    )
}

export default AssignedPlayerList