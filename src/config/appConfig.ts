export const appConfig = {
  // API Configuration
  api: {
    baseURL: 'https://my-json-server.typicode.com/welington-olive/task-manager',
    timeout: 10000,
    retryAttempts: 3,
  },

  // App Configuration
  app: {
    name: 'Task Manager',
    version: '1.0.0',
    buildNumber: '1',
  },

  // Storage Keys
  storage: {
    tasks: 'tasks',
    userPreferences: 'user_preferences',
  },

  // Pagination
  pagination: {
    pageSize: 20,
    loadMoreThreshold: 0.1,
  },

  // Animation
  animation: {
    duration: 300,
    easing: 'ease-in-out',
  },

  // Validation
  validation: {
    maxTitleLength: 100,
    maxResponsibleLength: 50,
  },
} as const 