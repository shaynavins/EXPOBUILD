import { Image, StyleSheet, Platform } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationIndependentTree>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

        <Stack.Screen name = "Login" component={Login} />

      </Stack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
}
