import styled from 'styled-components/native'
import { theme, commonStyles } from '../../styles/global'

interface CardContainerProps {
  status: string
}

export const CardContainer = styled.View<CardContainerProps>`
  background-color: ${theme.colors.white};
  margin: ${theme.spacing.md}px ${theme.spacing.lg}px;
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  ${commonStyles.shadow}
  border-left-width: 4px;
  border-left-color: ${props => 
    props.status === 'completed' ? theme.colors.success : theme.colors.primary
  };
`

export const TitleText = styled.Text`
  font-weight: ${theme.fontWeight.semibold};
  font-size: ${theme.fontSize.large}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm}px;
  line-height: ${theme.spacing.lg}px;
`

export const InfoText = styled.Text`
  font-size: ${theme.fontSize.medium}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.sm}px;
  font-weight: ${theme.fontWeight.medium};
`

export const StatusBadge = styled.View<{ status: string }>`
  background-color: ${props => 
    props.status === 'completed' 
      ? theme.colors.success 
      : props.status === 'in_progress'
      ? theme.colors.warning
      : theme.colors.primary
  };
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-self: flex-start;
  margin-top: ${theme.spacing.sm}px;
  ${commonStyles.shadow}
`

export const StatusText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.small}px;
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${theme.spacing.md}px;
  gap: ${theme.spacing.sm}px;
`

export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  ${commonStyles.shadow}
`

export const ActionButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.small}px;
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`