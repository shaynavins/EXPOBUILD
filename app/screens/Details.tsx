import { View, Text } from 'react-native'
import React from 'react'
import {collection, doc, getDoc, getDocs} from 'firebase/firestore';
import { db } from '@/FirebaseConfig';

const Details = () => {
   
    const fetchQuestions = async () => {
        const querySnapshot = await getDocs(collection(db, "questions"));
        const questions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(questions);
        return(
            <View>
                <Text>{questions}</Text>
            </View>
        )
    };
    
}

export default Details;