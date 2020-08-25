import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    FIREBASE_PROJECT_API_KEY: process.env.FIREBASE_PROJECT_API_KEY,
    authDomain: "bus-sharp.firebaseapp.com",
    databaseURL: "https://bus-sharp.firebaseio.com",
    projectId: "bus-sharp",
    storageBucket: "bus-sharp.appspot.com",
    messagingSenderId: "483376447021",
    appId: "1:483376447021:web:5820efb82ad44df85e42a4",
    measurementId: "G-Z7NRDEESN2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
