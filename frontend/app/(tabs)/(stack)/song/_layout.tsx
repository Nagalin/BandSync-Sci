import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'คิวเพลง' }} />
            <Stack.Screen name="detail" options={{ title: 'รายละเอียดเพลง' }} />
            <Stack.Screen name="create" options={{ title: 'สร้างเพลง' }} />
            <Stack.Screen name="assign-player" options={{ title: 'Assign Player' }} />
        </Stack>
    )
}

export default _layout