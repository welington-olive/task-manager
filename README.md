# Task Manager

A React Native application for task management with complete CRUD functionality and filters.

## Implemented Features

### ✅ Task Creation
- Complete form for creating new tasks
- Required field validation
- Status selection (Pending/Completed)
- Responsible person assignment

### ✅ Task Editing
- Edit button on each task card
- Navigation to form with pre-filled data
- Real-time updates in the list

### ✅ Task Deletion
- Delete button on each task card
- Confirmation before deletion
- Immediate removal from the list

### ✅ Status Filters
- "All" filter to show all tasks
- "Pending" filter for uncompleted tasks
- "Completed" filter for finished tasks

### ✅ Responsible Person Filters
- Real-time search field by responsible person's name
- 300ms debounce for better performance
- Automatic filtering as you type

## Project Structure

```
src/
├── components/
│   ├── TaskCard.tsx          # Task card with actions
│   └── styles/
│       ├── TaskCardStyles.ts # Card styles
│       ├── TaskFormStyles.ts # Form styles
│       └── HomeStyles.ts     # Main screen styles
├── screens/
│   ├── Home.tsx              # Main screen with list and filters
│   └── TaskForm.tsx          # Creation/editing form
├── contexts/
│   └── useTaskStore.ts       # Global state management
├── hooks/
│   ├── useTaskList.ts        # Hook for task list
│   ├── useTaskForm.ts        # Hook for form
│   └── useDebounce.ts        # Hook for debounce
├── utils/
│   └── taskUtils.ts          # Task utilities
├── constants/
│   └── strings.ts            # Text constants
└── types/
    └── Task.ts               # TypeScript types
```

## How to Use

### Create a New Task
1. On the main screen, tap the "+" button (bottom right corner)
2. Fill in the task title
3. Select the status (Pending or Completed)
4. Type the responsible person's name
5. Tap "Save"

### Edit a Task
1. In the task list, tap the "Edit" button on the desired card
2. Modify the necessary fields
3. Tap "Update" to save the changes

### Delete a Task
1. In the task list, tap the "Delete" button on the desired card
2. Confirm the deletion in the confirmation dialog

### Filter Tasks
1. **By Responsible Person**: Type in the search field to filter by responsible person's name
2. **By Status**: Use the "All", "Pending", or "Completed" buttons
3. **Clear Filters**: Tap the active filter again to deactivate it

## Technologies Used

- **React Native** - Main framework
- **Zustand** - State management
- **React Hook Form** - Forms
- **Zod** - Data validation
- **Styled Components** - Styling
- **React Navigation** - Navigation

## Installation and Execution

```bash
# Install dependencies
npm install

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## API Endpoints

The application expects a REST API with the following endpoints:

- `GET /tasks` - List all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update existing task
- `DELETE /tasks/:id` - Delete task

## Data Structure

```typescript
interface Task {
  id: number
  title: string
  status: 'pending' | 'completed'
  responsible: string
}
```

### 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── styles/         # Styled-components for each component
│   │   ├── HomeStyles.ts      # Main screen styles
│   │   └── TaskCardStyles.ts  # Task card styles
│   └── ...
├── screens/            # Screen components (views only)
├── hooks/              # Custom hooks for business logic
├── contexts/           # React Context providers
├── services/           # API and external services
├── storage/            # Local storage utilities
├── utils/              # Utility functions
├── constants/          # App constants and strings
├── config/             # App configuration
├── schemas/            # Data validation schemas
├── types/              # TypeScript type definitions
├── styles/             # Global styles and theme
└── navigation/         # Navigation configuration
```

## 🔧 Technologies

- React Native (Hooks)
- TypeScript
- Zustand (State Management)
- Styled Components
- React Navigation
- React Hook Form + Zod
- AsyncStorage
- Axios
- JSON Server (Fake API)

## 🚀 Instructions

### Installation

```bash
yarn install
```

### Start the app

```bash
yarn start
```

### Start fake API

```bash
yarn server
```

Make sure `json-server` is installed globally:

```bash
npm install -g json-server
```

Create the `db.json` file with the following content:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Study React Native",
      "status": "pending",
      "responsible": "John"
    }
  ]
}
```

## 🎯 Key Features

### ✅ Clean Architecture
- **Separation of Concerns**: Business logic separated from UI components
- **Custom Hooks**: Reusable logic in dedicated hooks
- **Styled Components**: Organized styling with theme system
- **Type Safety**: Full TypeScript implementation

### ✅ Code Organization
- **Constants**: Centralized strings and configuration
- **Utils**: Reusable utility functions
- **Config**: App-wide configuration
- **Styles**: Modular styled-components

### ✅ Features
- Listing with infinite scroll
- Create, edit, delete tasks
- Filter by status and responsible
- Form validation with error handling
- Reusable modal components
- Local storage with error handling
- Navigation between screens
- Offline handling
- Loading and error states

## 📋 Development Guidelines

### 🎨 Styling
- Use styled-components for all styling
- Follow the theme system in `src/styles/global.ts`
- Keep styles separate from components in `styles/` folders

### 🔧 Business Logic
- Use custom hooks for complex logic
- Keep components focused on rendering only
- Use utility functions for reusable operations

### 📝 Code Quality
- Use TypeScript interfaces for all props
- Follow consistent naming conventions
- Use constants for all strings and configuration
- Implement proper error handling

### 🏗️ Architecture Principles
- **Single Responsibility**: Each file has one clear purpose
- **Dependency Inversion**: Depend on abstractions, not concretions
- **Open/Closed**: Open for extension, closed for modification
- **DRY**: Don't Repeat Yourself - use utilities and hooks

## 🔄 State Management

The app uses Zustand for state management with a clean store structure:

```typescript
// Example store structure
type Store = {
  tasks: Task[]
  fetchTasks: () => Promise<void>
  addTask: (task: Omit<Task, 'id'>) => Promise<void>
  updateTask: (task: Task) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}
```