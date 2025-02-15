import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'

const DetailLoading = () => {
  return (
    <View style={{
        flexDirection: 'column',
        gap: 20,
        padding: 10,
        marginTop: 70
    }}>
       <Skeleton colorMode='light'  height={60} width={380} />
       <Skeleton colorMode='light'  height={60} width={380} />
       <Skeleton colorMode='light'  height={60} width={380} />
       <Skeleton colorMode='light'  height={60} width={380} />

    
    </View>
  )
}

export default DetailLoading