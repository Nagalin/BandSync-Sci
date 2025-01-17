import React, { ReactNode } from 'react'
import { ButtonProps, Button as RnButton } from 'react-native-paper'
import { useAppTheme } from '@/hooks/use-theme'

type ButtonPropsType = {
  children: ReactNode
} & ButtonProps

const Button = ({ children, style, ...props }: ButtonPropsType) => {
  const theme = useAppTheme()
  return (
    <RnButton
      textColor='black'
      style={[{ backgroundColor: theme.colors.mainButton }, style]}
      {...props}
    >
      {children}
    </RnButton>
  )
}

export default Button