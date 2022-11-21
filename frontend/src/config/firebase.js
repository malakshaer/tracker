import * as firebase from "firebase";
// import firestore from "firebase/firestore";
// import initializeApp from "firebase/app";
// import { getFirestore } from "firebase/firestore";

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

// firebase.initializeApp(firebaseConfig);
// firebase.firestore();
// export default firebase;

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default db;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase
  .firestore()
  .settings({ experimentalForceLongPolling: true, merge: true });

export { firebase };
