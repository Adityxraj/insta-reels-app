import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';  //for authorization   
import 'firebase/compat/storage'; //storing our videos
import 'firebase/compat/firestore'; //database where we store our data in key value pairs like user data post data

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDZhllAXRMHNFfgSuv3Mt5otQ7XuP4RPk",
    authDomain: "reels-ffe63.firebaseapp.com",
    projectId: "reels-ffe63",
    storageBucket: "reels-ffe63.appspot.com",
    messagingSenderId: "234762062691",
    appId: "1:234762062691:web:a5b4c640ae79935ff26156"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Same till here ----------------------------------------------------

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    //   comments : firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp, // coz we will sort the reels post according to time posted
}

export const storage = firebase.storage()