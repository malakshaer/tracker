// // Import the functions you need from the SDKs you need
// import  initializeApp  from "firebase/app";
// import  getAnalytics  from "firebase/analytics";
// import firebase from "firebase";
// import '@firebase/auth';
// import '@firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyArtd9N_jp8qlojUxUSMvFst2zKhr1Vt_c",
//   authDomain: "tracker-52806.firebaseapp.com",
//   databaseURL: "https://tracker-52806-default-rtdb.firebaseio.com",
//   projectId: "tracker-52806",
//   storageBucket: "tracker-52806.appspot.com",
//   messagingSenderId: "911093155748",
//   appId: "1:911093155748:web:20c06a0e052fe239ace331",
//   measurementId: "G-CCQNTFRVJJ",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export { firebase };

import * as firebase from "firebase";
import firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArtd9N_jp8qlojUxUSMvFst2zKhr1Vt_c",
  authDomain: "tracker-52806.firebaseapp.com",
  databaseURL: "https://tracker-52806-default-rtdb.firebaseio.com",
  projectId: "tracker-52806",
  storageBucket: "tracker-52806.appspot.com",
  messagingSenderId: "911093155748",
  appId: "1:911093155748:web:20c06a0e052fe239ace331",
  measurementId: "G-CCQNTFRVJJ",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
