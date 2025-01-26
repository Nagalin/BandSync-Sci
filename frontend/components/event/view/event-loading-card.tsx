import { View } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'
import Background from '@/components/ui/background'
const EventLoadingCard = () => {
    return (
        <Background style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 15
        }}>

            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>
            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>

            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>

            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>

            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>

            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>

            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>

            <View style={{ marginTop: 15, width: '45%' }}>

                <Skeleton colorMode="light" width={'100%'} height={150} />
            </View>


        </Background>
    )
}

export default EventLoadingCard