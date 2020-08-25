import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_APP_API_KEY,
//     authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_APP_DATABASE_URL,
//     projectId: process.env.FIREBASE_APP_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_APP_MESSAGE_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_APP_MEASUREMENT_ID
// };

require('dotenv').config()

const firebaseConfig = {
    apiKey: "AIzaSyCQmHKMWJjeGz5kJuC_NgZmLzUBah_aLU4",
    authDomain: "bus-sharp.firebaseapp.com",
    databaseURL: "https://bus-sharp.firebaseio.com",
    projectId: "bus-sharp",
    storageBucket: "bus-sharp.appspot.com",
    messagingSenderId: "483376447021",
    appId: "1:483376447021:web:5820efb82ad44df85e42a4",
    measurementId: "G-Z7NRDEESN2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export global components.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Sign in with Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider).catch(e => console.error("Failed to sign in with pop up", e));
};

// Get user document, create new entry if doesn't exist.
export const generateUserDocument = async (user: firebase.User | null, additionalData?: firebase.firestore.DocumentData | undefined) => {
    if (!user) return null;

    // Get user firestore entry.
    const userRef = firestore.doc(`users/${user.uid}`);
    const document = await userRef.get();

    // User not in database, create new entry.
    if (!document.exists) {
        const {email, displayName} = user;
        await userRef.set({
            displayName,
            email,
            ...additionalData
        }).catch((e) => console.error("Error creating user document", e));
    }

    // Get entry from database.
    return getUserDocument(user.uid);
};

// Get user document from the firestore.
const getUserDocument = async (uid: string) => {
    if (!uid) return null;

    return await firestore.doc(`users/${uid}`).get()
        .then((userDocument) => {
            return {uid, ...userDocument.data()};
        })
        .catch((e) => {
            console.error("Error fetching user", e)
            return null;
        });
};
