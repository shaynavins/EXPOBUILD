import { View, Text, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { FIREBASE_APP, FIREBASE_AUTH, db } from '@/FirebaseConfig';
import { collection, addDoc, Firestore } from "firebase/firestore"; 
import firestore, { firebase, getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';



interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser; // Get the currently logged-in user
        if (user) {
          setUserId(user.uid); // Set the user ID
        } else {
          alert('Error');
        }
      }, []);
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Button onPress={() => navigation.navigate('details')} title = "open details" />
        <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'/>
        <Text>Welcome to the Home Screen!</Text>
        {userId && <Text>User ID: {userId}</Text>}

        </View>

       
    );
};

export default List;