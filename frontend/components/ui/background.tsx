import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '@/hooks/use-theme'

type BackgroundPropsType = {
    children: ReactNode
}

const Background = ({ children }: BackgroundPropsType) => {
    const theme = useAppTheme()
    return (
        <View style={{ backgroundColor: theme.colors.background, height: '100%' }}>
            {children}
        </View>
    )
}

export default Background