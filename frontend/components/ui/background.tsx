import React, { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import { useAppTheme } from '@/hooks/use-theme'

type BackgroundPropsType = {
    children: ReactNode
    style?: ViewStyle
}

const Background = ({ children, style }: BackgroundPropsType) => {
    const theme = useAppTheme()
    return (
        <View style={[{ backgroundColor: theme.colors.background, height: '100%' }, style]}>
            {children}
        </View>
    )
}

export default Background