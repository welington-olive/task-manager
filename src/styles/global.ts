export const theme = {
  colors: {
    primary: '#00465c',
    secondary: '#3B82F6',
    accent: '#06B6D4',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    white: '#FFFFFF',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    gradient: {
      primary: ['#1E3A8A', '#3B82F6'],
      secondary: ['#06B6D4', '#3B82F6'],
      background: ['#F8FAFC', '#E2E8F0'],
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
  },
  fontSize: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
}

export const commonStyles = {
  shadow: {
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  shadowLarge: {
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  gradient: {
    primary: ['#1E3A8A', '#3B82F6'],
    secondary: ['#06B6D4', '#3B82F6'],
  }
} 