import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import Home from '../screens/Home'
import TaskForm from '../screens/TaskForm'
import { theme } from '../styles/global'
import { STRINGS } from '../constants/strings'
import { Task } from '../types/Task'

const Stack = createNativeStackNavigator()

type RootStackParamList = {
  Home: undefined
  TaskForm: { task?: Task } | undefined
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            title: STRINGS.NAVIGATION.HOME,
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.white
          }} 
        />
        <Stack.Screen 
          name="TaskForm" 
          component={TaskForm}
          options={({ route }: { route: RouteProp<RootStackParamList, 'TaskForm'> }) => ({
            title: route.params?.task ? 'Editar Tarefa' : 'Criar Tarefa',
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.white
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}