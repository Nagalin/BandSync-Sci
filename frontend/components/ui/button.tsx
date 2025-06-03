import React, { ReactNode } from 'react'
import { ButtonProps, Button as RnButton } from 'react-native-paper'
import { useAppTheme } from '@/hooks/use-theme'
import { StyleSheet } from 'react-native'

type ButtonPropsType = {
  children: ReactNode
  variant?: 'primary' | 'danger'
} & ButtonProps

const Button = ({ variant = 'primary', children, style, disabled, ...props }: ButtonPropsType) => {
  const theme = useAppTheme()

  const variantStyle = {
    primary: {
      backgroundColor: theme.colors.mainButton,
      textColor: '#000',
    },
    danger: {
      backgroundColor: theme.colors.dangerButton,
      textColor: '#000',
    },
    disabled: {
      backgroundColor: 'red', // or any color you want when disabled
      textColor: '#fff',
    },
  }

  const { backgroundColor, textColor } = disabled
    ? variantStyle.disabled
    : variantStyle[variant]

  return (
    <RnButton
      mode="contained"
      buttonColor={backgroundColor}
      textColor={textColor}
      // disabled={disabled}
      style={[style]}
      {...props}
    >
      {children}
    </RnButton>
  )
}



export default Button

