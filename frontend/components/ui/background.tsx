import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

type BackgroundPropsType = {
    children: ReactNode
}

const Background = ({children}: BackgroundPropsType) => {
    const theme = useTheme()
    return (
        <View style={{ backgroundColor: theme.colors.background, height: '100%' }}>
            {children}
        </View>
    )
}

export default Background