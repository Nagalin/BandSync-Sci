import AssignedPlayerList from '@/components/player/assigned-player-list'
import UnassignedPlayerList from '@/components/player/unassigned-player-list'

import Text from '@/components/ui/text'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const Index = () => {
    const { eventId, songId, playerType } = useLocalSearchParams()
    return (
        <View>
            <AssignedPlayerList />
            <UnassignedPlayerList />
        </View>
    )
}

export default Index