import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import UserDetail from './screens/UserDetail'
import PhotoAlbum from './screens/PhotoAlbum'
import PostDetail from './screens/PostDetail'
import { QueryClient, QueryClientProvider } from 'react-query'

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="User Detail" component={UserDetail} />
          <Stack.Screen name="Album" component={PhotoAlbum} />
          <Stack.Screen name="Post detail" component={PostDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
