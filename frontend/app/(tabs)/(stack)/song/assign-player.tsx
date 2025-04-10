import AssignedPlayerList from '@/components/player/assigned-player-list'
import UnassignedPlayerList from '@/components/player/unassigned-player-list'
import React from 'react'
import { View, StyleSheet } from 'react-native'

const Index = () => {
    return (
        <View>
            <AssignedPlayerList />
            <View style={styles.divider} />
            <UnassignedPlayerList />
        </View>
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 8,
    }
})

export default Index