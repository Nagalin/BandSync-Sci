import React from 'react'
import { View } from 'react-native'
import AssignedPlayerList from '@/components/player/assigned-player-list'
import UnassignedPlayerList from '@/components/player/unassigned-player-list'

const AssignPlayer = () => {
    return (
        <View>
            <AssignedPlayerList />
            <View
                style={{
                    height: 1,
                    backgroundColor: 'black',
                    marginVertical: 8,
                }}
            />
            <UnassignedPlayerList />
        </View>
    )
}


export default AssignPlayer