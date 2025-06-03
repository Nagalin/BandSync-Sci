import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { Card } from 'react-native-paper'
import { Href, useRouter } from 'expo-router'

type MainMenuCardPropsType = {
    children: ReactNode
    href: Href,
    colorStripBackground: string,
}

const MainMenuCard = ({ children, href, colorStripBackground }: MainMenuCardPropsType) => {
    const router = useRouter()
    return (
        <Card onPress={() => router.push(href)} style={cardBaseStyle}>
            <Card.Content style={{ flexGrow: 1, flexShrink: 1, flexBasis: '100%' }}>
                <View style={cardContentWrapper}>
                    <View style={[colorStrip, { backgroundColor: colorStripBackground }]} />
                    <View style={[badgeStyle, { backgroundColor: colorStripBackground }]}>
                        <Text style={badgeText}>+</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                        overflow: 'visible',
                    }}>
                        {children}
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}

export default MainMenuCard

const cardBaseStyle: StyleProp<ViewStyle> = {
    width: '48%',
    aspectRatio: 1.2,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 4,
}

const cardContentWrapper: StyleProp<ViewStyle> = {
    flex: 1,
    padding: 12,
    position: 'relative',
    backgroundColor: 'white',
}

const colorStrip: StyleProp<ViewStyle> = {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
}

const badgeStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    zIndex: 3,
    top: 8,
    right: 8,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
}

const badgeText: StyleProp<TextStyle> = {
    color: 'white',
    fontSize: 12,
}
