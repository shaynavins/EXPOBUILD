import { Image, StyleSheet, Platform } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Details from './screens/Details';
import List from './screens/List';
import { useEffect, useState, createContext, Children } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name='my doubts' component={List} />
      <InsideStack.Screen name='deets' component={Details} />

    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);

    });
  }, [])

  return (
    <NavigationIndependentTree>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? 
           <Stack.Screen name = "Inside" component={InsideLayout} options = {{headerShown: true}}/>
         :  

          <Stack.Screen name = "Login" component={Login} options = {{headerShown: false}}/>
        
        }


      </Stack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
}
