import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBIIBxUNWpVc0flw5bjA6fE3QH7OBuJKw8",
    authDomain: "net-ninja-marioplan-macska.firebaseapp.com",
    databaseURL: "https://net-ninja-marioplan-macska.firebaseio.com",
    projectId: "net-ninja-marioplan-macska",
    storageBucket: "net-ninja-marioplan-macska.appspot.com",
    messagingSenderId: "1069834288940",
    appId: "1:1069834288940:web:b02dd32745ea63bb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.firestore().settings({ timestampsInSnapshots: true });  //in6.1.1 this settings defaultly true and we no need to explicitly set it.

  export default firebase;