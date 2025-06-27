import React, { useState } from 'react'
import { RefreshControl, ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTaskList } from '../hooks/useTaskList'
import { useDebounce } from '../hooks/useDebounce'
import { TaskCard, FilterModal, FilterOptions } from '../components'
import { STRINGS } from '../constants/strings'
import { appConfig } from '../config/appConfig'
import { Task } from '../types/Task'
import { theme, commonStyles } from '../styles/global'
import {
  HomeContainer,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  HeroSection,
  HeroTitle,
  HeroDescription,
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel,
  SectionTitle,
  StyledFlatList,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  EmptySubtext,
  LoadingContainer,
  LoadingText,
  AddButton,
  AddButtonText,
} from '../components/styles/HomeStyles'

export default function Home() {
  const navigation = useNavigation()
  const { tasks, loading, refreshing, handleRefresh, handleLoadMore, getFilteredTasks } = useTaskList()
  
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    responsible: ''
  })
  
  // Debounce the responsible filter with 300ms delay
  const debouncedResponsibleFilter = useDebounce(filters.responsible, 300)

  if (loading && tasks.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <LoadingText>{STRINGS.HOME.LOADING_TEXT}</LoadingText>
      </LoadingContainer>
    )
  }

  const filteredTasks = getFilteredTasks({
    status: filters.status === 'all' ? undefined : filters.status,
    responsible: debouncedResponsibleFilter || undefined
  })

  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const pendingTasks = tasks.length - completedTasks

  const handleEditTask = (task: Task) => {
    (navigation as any).navigate('TaskForm', { task })
  }

  const handleAddTask = () => {
    (navigation as any).navigate('TaskForm')
  }

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const getFilterSummary = () => {
    const activeFilters = []
    if (filters.status !== 'all') {
      activeFilters.push(filters.status === 'pending' ? STRINGS.FILTERS.PENDING : STRINGS.FILTERS.COMPLETED)
    }
    if (filters.responsible) {
      activeFilters.push(`${STRINGS.TASK.RESPONSIBLE_LABEL} ${filters.responsible}`)
    }
    return activeFilters.length > 0 ? activeFilters.join(', ') : STRINGS.FILTERS.ALL_FILTERS
  }

  // Header component for the FlatList
  const ListHeaderComponent = () => (
    <View>
      {/* Header */}
      <Header>
        <HeaderTitle>{STRINGS.HOME.TITLE}</HeaderTitle>
        <HeaderSubtitle>{STRINGS.HOME.SUBTITLE}</HeaderSubtitle>
      </Header>

      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>{STRINGS.HOME.HERO_TITLE}</HeroTitle>
        <HeroDescription>
          {STRINGS.HOME.HERO_DESCRIPTION}
        </HeroDescription>
      </HeroSection>

      {/* Stats */}
      <StatsContainer>
        <StatItem>
          <StatNumber>{tasks.length}</StatNumber>
          <StatLabel>{STRINGS.HOME.TOTAL_TASKS}</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{pendingTasks}</StatNumber>
          <StatLabel>{STRINGS.HOME.PENDING_TASKS}</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{completedTasks}</StatNumber>
          <StatLabel>{STRINGS.HOME.COMPLETED_TASKS}</StatLabel>
        </StatItem>
      </StatsContainer>

      {/* Filters */}
      <SectionTitle>{STRINGS.HOME.FILTERS_SECTION}</SectionTitle>
      <TouchableOpacity 
        style={{
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          marginHorizontal: theme.spacing.lg,
          alignItems: 'center',
          ...commonStyles.shadow,
        }}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={{ color: theme.colors.white, fontSize: theme.fontSize.medium, fontWeight: 'bold' }}>
          🔍 {getFilterSummary()}
        </Text>
      </TouchableOpacity>

      {/* Tasks Section */}
      <SectionTitle>{STRINGS.HOME.TASKS_SECTION}</SectionTitle>
    </View>
  )

  // Empty component for when no tasks are found
  const ListEmptyComponent = () => (
    <EmptyContainer>
      <EmptyIcon>
        <Text style={{ fontSize: theme.fontSize.xxlarge, color: theme.colors.textSecondary }}>📋</Text>
      </EmptyIcon>
      <EmptyText>{STRINGS.HOME.NO_TASKS_FOUND}</EmptyText>
      <EmptySubtext>
        {tasks.length === 0 
          ? STRINGS.HOME.EMPTY_STATE_FIRST_TASK
          : STRINGS.HOME.EMPTY_STATE_ADJUST_FILTERS
        }
      </EmptySubtext>
    </EmptyContainer>
  )

  return (
    <HomeContainer>
      <StyledFlatList
        data={filteredTasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <TaskCard task={item} onEdit={handleEditTask} />}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={appConfig.pagination.loadMoreThreshold}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingBottom: theme.spacing.xxl * 2 
        }}
      />

      {/* Add Button */}
      <AddButton onPress={handleAddTask}>
        <AddButtonText>+</AddButtonText>
      </AddButton>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </HomeContainer>
  )
}