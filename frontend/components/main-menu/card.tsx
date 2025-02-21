import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { Card as RnCard } from 'react-native-paper'
import { useAppTheme } from '@/hooks/use-theme'

type CardPropsType = {
    children: ReactNode
}
const Card = ({  children }: CardPropsType) => {
  const theme = useAppTheme()

  return (
    <RnCard
    
    style={{
      borderStyle: 'solid',
    //   width: '45%',
      marginTop: 15,
      height: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary
    }}
  >
    <RnCard.Content>
      <Text style={{ fontSize: 25 }}>
        { children }
      </Text>
    </RnCard.Content>
  </RnCard>
  )
}

export default Card