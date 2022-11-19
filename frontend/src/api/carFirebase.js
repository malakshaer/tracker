import firebase from "firebase";
import { db } from "../config/firebase";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import database from "@react-native-firebase/database";

export const createNewCar = async (carName, pin) => {
  await setDoc(doc(db, "cars", "id"), {
    carName: carName,
    pin: pin,
  });
};

export const editCar = async (carName, pin, id) => {
  database()
    .ref(`/cars/${id}`)
    .update({
      carName: carName,
      pin: pin,
    })
    .then(() => console.log("Data updated."));
};

export const deleteCar = async ({ id }) => {
  await database().ref(`/cars/${id}`).remove();
};

export const deleteAllCars = async () => {
  await database().ref("/cars").remove();
};

export const changeCarStatus = async ({ id }) => {
  await database()
    .ref(`/cars/${id}`)
    .update({
      status: "active",
    })
    .then(() => console.log("Car is active"));
};

export const getAllCars = async () => {
  await database().ref(`/cars`).get();
};

export const getCar = async ({ id }) => {
  await database().ref(`/cars/${id}`).get();
};
