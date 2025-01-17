import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';
import { ButtonProps, Button as RnButton } from 'react-native-paper';

type ButtonPropsType = {
  children: ReactNode;
} & ButtonProps;

const Button = ({ children, style, ...props }: ButtonPropsType) => {
  return (
    <RnButton
      mode="outlined"
      style={[{ backgroundColor: 'blue',}, style]} 
      {...props}
    >
      {children}
    </RnButton>
  );
};

export default Button;
