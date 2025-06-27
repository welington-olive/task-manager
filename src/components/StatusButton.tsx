import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../styles/global'

const StyledButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding: ${theme.spacing.sm}px;
  margin: 0 ${theme.spacing.xs}px;
  border-radius: ${theme.borderRadius.sm}px;
  align-items: center;
  background-color: ${props => props.isActive ? theme.colors.primary : theme.colors.white};
  border: 1px solid ${theme.colors.border};
`

const ButtonText = styled.Text<{ isActive: boolean }>`
  color: ${props => props.isActive ? theme.colors.white : theme.colors.text};
  font-size: ${theme.fontSize.regular}px;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
`

export interface StatusButtonProps extends TouchableOpacityProps {
  isActive: boolean
  label: string
}

export const StatusButton: React.FC<StatusButtonProps> = ({ 
  isActive, 
  label, 
  ...props 
}) => {
  return (
    <StyledButton isActive={isActive} {...props}>
      <ButtonText isActive={isActive}>
        {label}
      </ButtonText>
    </StyledButton>
  )
} 