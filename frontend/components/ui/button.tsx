import React, { ReactNode } from 'react'
import { ButtonProps, Button as RnButton } from 'react-native-paper'
import { useAppTheme } from '@/hooks/use-theme'
import { StyleSheet } from 'react-native'

type ButtonPropsType = {
  children: ReactNode
  variant?: 'primary' | 'danger'
} & ButtonProps

const Button = ({ variant = 'primary', children, style, ...props }: ButtonPropsType) => {
  const theme = useAppTheme()

  // Define styles for each variant
  const variantStyle = {
    primary: {
      backgroundColor: theme.colors.mainButton,
      textColor: 'black',
    },
    danger: {
      backgroundColor: theme.colors.dangerButton, 
      textColor: 'black',
    },
  }

  const { backgroundColor, textColor } = variantStyle[variant]

  return (
    <RnButton
      mode='contained'
      buttonColor={backgroundColor}
      textColor={textColor}
      style={[style]}
      {...props}
    >
      {children}
    </RnButton>
  )
}


export default Button