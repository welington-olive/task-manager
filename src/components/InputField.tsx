import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../styles/global'

const StyledInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: theme.colors.textSecondary
}))`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  font-size: ${theme.fontSize.medium}px;
  color: ${theme.colors.text};
`

export interface InputFieldProps extends TextInputProps {
  error?: string
}

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <StyledInput ref={ref} {...props} />
        {error && (
          <ErrorText>{error}</ErrorText>
        )}
      </>
    )
  }
)

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.small}px;
  margin-top: ${theme.spacing.xs}px;
  margin-bottom: ${theme.spacing.sm}px;
`

InputField.displayName = 'InputField' 