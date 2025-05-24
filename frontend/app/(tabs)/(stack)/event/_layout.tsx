import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack >
            <Stack.Screen name="index" options={{ title: 'Event ทั้งหมด' }} />
            <Stack.Screen name="detail" options={{ title: 'รายละเอียด Event' }} />
            <Stack.Screen name="run" options={{ title: 'run event' }} />
        </Stack>
    )
}

export default _layout