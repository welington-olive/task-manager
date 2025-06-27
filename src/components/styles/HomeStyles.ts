import styled from 'styled-components/native'
import { FlatList, ScrollView } from 'react-native'
import { theme, commonStyles } from '../../styles/global'
import { Task } from '../../types/Task'

export const HomeContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`

export const Header = styled.View`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg}px ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.xxl}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`

export const HeaderTitle = styled.Text`
  font-size: ${theme.fontSize.xxlarge}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.sm}px;
`

export const HeaderSubtitle = styled.Text`
  font-size: ${theme.fontSize.medium}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  line-height: ${theme.spacing.lg}px;
`

export const HeroSection = styled.View`
  background: ${theme.colors.primary};
  padding: ${theme.spacing.xxl}px ${theme.spacing.xl}px;
  margin: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.xl}px;
  ${commonStyles.shadowLarge}
`

export const HeroTitle = styled.Text`
  font-size: ${theme.fontSize.xlarge}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`

export const HeroDescription = styled.Text`
  font-size: ${theme.fontSize.medium}px;
  color: ${theme.colors.white};
  text-align: center;
  opacity: 0.9;
  line-height: ${theme.spacing.lg}px;
`

export const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: ${theme.spacing.xl}px ${theme.spacing.lg}px;
  padding: ${theme.spacing.lg}px;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  ${commonStyles.shadow}
`

export const StatItem = styled.View`
  align-items: center;
`

export const StatNumber = styled.Text`
  font-size: ${theme.fontSize.xlarge}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
`

export const StatLabel = styled.Text`
  font-size: ${theme.fontSize.small}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.xs}px;
`

export const SectionTitle = styled.Text`
  font-size: ${theme.fontSize.xlarge}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.md}px;
`

export const FilterContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 ${theme.spacing.lg}px;
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`

export const FilterButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${props => props.isActive ? theme.colors.primary : theme.colors.white};
  border: 1px solid ${props => props.isActive ? theme.colors.primary : theme.colors.border};
  ${commonStyles.shadow}
`

export const FilterButtonText = styled.Text<{ isActive: boolean }>`
  color: ${props => props.isActive ? theme.colors.white : theme.colors.text};
  font-size: ${theme.fontSize.small}px;
  font-weight: ${props => props.isActive ? theme.fontWeight.semibold : theme.fontWeight.medium};
`

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${theme.spacing.xl}px;
  right: ${theme.spacing.xl}px;
  width: ${theme.spacing.xxl + 8}px;
  height: ${theme.spacing.xxl + 8}px;
  border-radius: ${(theme.spacing.xxl + 8) / 2}px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  ${commonStyles.shadow}
`

export const AddButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.xlarge}px;
  font-weight: ${theme.fontWeight.bold};
`

export const SearchContainer = styled.View`
  padding: 0 ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
`

export const SearchInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: theme.colors.textSecondary
}))`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.fontSize.medium}px;
  color: ${theme.colors.text};
  ${commonStyles.shadow}
`

export const SearchLabel = styled.Text`
  font-size: ${theme.fontSize.medium}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm}px;
  margin-left: ${theme.spacing.lg}px;
`

export const StyledFlatList = styled(FlatList<Task>)`
  flex: 1;
`

export const TaskCardContainer = styled.View`
  background: ${theme.colors.white};
  margin-bottom: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  ${commonStyles.shadow}
  border-left-width: 4px;
  border-left-color: ${theme.colors.primary};
`

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxl}px;
`

export const EmptyIcon = styled.View`
  width: ${theme.spacing.xxl + 32}px;
  height: ${theme.spacing.xxl + 32}px;
  background: ${theme.colors.border};
  border-radius: ${(theme.spacing.xxl + 32) / 2}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
`

export const EmptyText = styled.Text`
  font-size: ${theme.fontSize.large}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  font-weight: ${theme.fontWeight.medium};
  line-height: ${theme.spacing.xl + 4}px;
`

export const EmptySubtext = styled.Text`
  font-size: ${theme.fontSize.medium}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  line-height: ${theme.spacing.xl + 4}px;
`

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.background};
`

export const LoadingText = styled.Text`
  font-size: ${theme.fontSize.medium}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.md}px;
  font-weight: ${theme.fontWeight.medium};
`

export const ScrollContainer = styled(ScrollView)`
  flex: 1;
  background: ${theme.colors.background};
` 