import styled from 'styled-components/native'
import { theme } from '../../styles/global'

export const FormContainer = styled.View`
  flex: 1;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.background};
`

export const SaveButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  margin-top: ${theme.spacing.sm}px;
`

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.medium}px;
  font-weight: ${theme.fontWeight.bold};
` 