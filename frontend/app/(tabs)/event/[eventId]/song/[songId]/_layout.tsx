import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'รายละเอียดเพลง'
                }}
            />
        </Stack>
    )
}

export default Layout