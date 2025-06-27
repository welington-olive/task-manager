import styled from 'styled-components/native'
import { theme } from '../../styles/global'

export const FilterModalContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
`

export const FilterModalTitle = styled.Text`
  font-size: ${theme.fontSize.large}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg}px;
  text-align: center;
`

export const FilterSection = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`

export const FilterSectionTitle = styled.Text`
  font-size: ${theme.fontSize.medium}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm}px;
`

export const FilterButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding: ${theme.spacing.sm}px;
  margin: 0 ${theme.spacing.xs}px;
  border-radius: ${theme.borderRadius.sm}px;
  align-items: center;
  background-color: ${props => props.isActive ? theme.colors.primary : theme.colors.white};
  border: 1px solid ${theme.colors.border};
`

export const FilterButtonText = styled.Text<{ isActive: boolean }>`
  color: ${props => props.isActive ? theme.colors.white : theme.colors.text};
  font-size: ${theme.fontSize.regular}px;
  font-weight: ${props => props.isActive ? theme.fontWeight.bold : theme.fontWeight.regular};
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${theme.spacing.lg}px;
`

export const ApplyButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  margin-left: ${theme.spacing.sm}px;
`

export const ApplyButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.medium}px;
  font-weight: ${theme.fontWeight.bold};
`

export const ClearButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  border: 1px solid ${theme.colors.border};
  margin-right: ${theme.spacing.sm}px;
`

export const ClearButtonText = styled.Text`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.medium}px;
  font-weight: ${theme.fontWeight.bold};
` 