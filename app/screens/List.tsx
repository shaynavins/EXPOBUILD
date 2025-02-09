/* import { View, Text, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { FIREBASE_APP, FIREBASE_AUTH, db } from '@/FirebaseConfig';
import { doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { firebase, getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

type User = {
    name: string;
    email: string;
    age: number;
  };

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
    
 
    const handleAddUser = async () => {
        try {
        const userData: User = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            age: 25,
        };
    
        await firestore().collection('users').add(userData);
        alert('Success');
        } catch (error) {
        alert(`Error: ${(error as Error).message}`);
        }
    };
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Button onPress={() => navigation.navigate('details')} title = "open details" />
        <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'/>
        <Text>Welcome to the Home Screen!</Text>
        {userId && <Text>User ID: {userId}</Text>}
        <Button title="Add User" onPress={handleAddUser} />
        </View>

       
    );
};

export default List; */

import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, documentId, getFirestore, setDoc } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '@/FirebaseConfig';
import auth from '@react-native-firebase/auth';


interface RouterProps {
  navigation: any;
}

const List = ({ navigation }: RouterProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [question, onQuestion] = useState('');

  useEffect(() => {
    const subscriber = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        alert('User not logged in.');
      }
    });

    return subscriber; // Unsubscribe on component unmount
  }, []);

  const handleAddUser = async () => {
    try {
      const userData = {
        name: 'Joh',
        email: 'johndoe@example.com',
        age: 25,
      };
      const user = getAuth().currentUser;

      if (user && user.uid) {
        const userId = user.uid;
        const userRef = doc(db, 'users', userId); // doc() accepts db, collection path, and docId
        await setDoc(userRef, userData);
        alert('User added successfully!');
      } else {
        alert('User is not logged in.');
      }
      //await addDoc(collection(db, 'users'), userData);
       //await setDoc(doc(db, 'users', userId), userData);
     // alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      alert(`Error: ${(error as Error).message}`);
    }
  };
  
  const addQuestion = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const userId = currentUser.uid;
        console.log('Current User ID:', userId);
  
        // Move setDoc inside this block to ensure userId is defined
        await setDoc(doc(db, 'users', userId), {
          question: question,  // Ensure 'question' is defined in your state
          createdAt: new Date(),
        });
        console.log('Question added successfully!');
      } else {
        console.log('No user is logged in');
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => navigation.navigate('details')} title="Open Details" />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      <Text>Welcome to the Home Screen!</Text>
      {userId && <Text>User ID: {userId}</Text>}
      <Button title="Add User" onPress={handleAddUser} />
      <Text>Post your question</Text>
      <TextInput onChangeText={onQuestion} value={question} style ={styles.input}/>
      <Button title='Post' onPress={addQuestion}></Button>

    </View>
    
  );
};

export default List;
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1, 
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50, 
        borderWidth:1, 
        borderRadius: 4, 
        padding: 10, 
    }
});
