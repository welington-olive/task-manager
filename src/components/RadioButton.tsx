import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../styles/global'

const StyledRadioButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.sm}px;
  margin: ${theme.spacing.xs}px 0;
  border-radius: ${theme.borderRadius.sm}px;
  background-color: ${props => props.isSelected ? theme.colors.background : theme.colors.white};
  border: 1px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.border};
`

const RadioCircle = styled.View<{ isSelected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.border};
  background-color: ${props => props.isSelected ? theme.colors.primary : 'transparent'};
  margin-right: ${theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
`

const RadioInner = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${theme.colors.white};
`

const RadioLabel = styled.Text<{ isSelected: boolean }>`
  color: ${props => props.isSelected ? theme.colors.primary : theme.colors.text};
  font-size: ${theme.fontSize.regular}px;
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  flex: 1;
`

export interface RadioButtonProps extends TouchableOpacityProps {
  isSelected: boolean
  label: string
  value: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({ 
  isSelected, 
  label, 
  value,
  ...props 
}) => {
  return (
    <StyledRadioButton isSelected={isSelected} {...props}>
      <RadioCircle isSelected={isSelected}>
        {isSelected && <RadioInner />}
      </RadioCircle>
      <RadioLabel isSelected={isSelected}>
        {label}
      </RadioLabel>
    </StyledRadioButton>
  )
} 