import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC8oXnYPjm2GihFIjDsFt9iwDfCflvcRos',
  authDomain: 'pharmago-37555. firebaseapp.com',
  projectId: 'pharmago-37555',
  databaseURL: 'https://pharmago-37555-default-rtdb.firebaseio.com',
  storageBucket: 'pharmago-37555.appspot.com',
  messagingSenderId: '1011744781547',
  appId: '1:1011744781547:web:3566b9ee2d62d42eb23aae',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
