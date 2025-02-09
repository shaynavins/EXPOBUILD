
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState, createContext, useContext } from 'react'
import { db, FIREBASE_AUTH } from '@/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

const signIn = async() => {
    setLoading(true);
    try{
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
}
const signUp = async() => {
    console.log("Auth instance:", auth);


    setLoading(true);
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch(error:any) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    }

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
            <TextInput value={email} style ={styles.input} onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput 
            value={password} 
            style={styles.input} 
            onChangeText={(text) => setPassword(text)} 
            secureTextEntry/>

        { loading ? <ActivityIndicator size="large" color="#0000ff"/> 
        : <>
        <Button title="Login" onPress={() => signIn()} /> 
        <Button title="createacct" onPress={() => signUp()} /> 

        </>}
        </KeyboardAvoidingView>
        </View>

    );


};


export default Login;


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