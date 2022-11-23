import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

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

initializeApp(firebaseConfig);

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

export const getTokens = async (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BLcOxljpHN1ZdxCen2yvaVA_mD_kXHEQGcVuDvDBaUdTzjwW_DqAiFQWYRFkgGzp7A_JkYQVvv7THi3Ze_7dD-8",
  })
    .then((currentToken) => {
      if (currentToken) {
        localStorage.setItem("device_token", currentToken);
        console.log(currentToken);
        setTokenFound(true);
      } else {
        console.log("No registration token available");
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
