import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

//Get all cars of the user
export const getAllCars = async () => {
  const token = await AsyncStorage.getItem("@token");
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`${BASE_URL}getUserCars`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await AsyncStorage.setItem("@cars", JSON.stringify(res.data.cars));

  return res;
};

//Create New Car
export const createNewCar = async (carName, pin) => {
  const data = {
    carName,
    pin,
  };
  const token = await AsyncStorage.getItem("@token");

  await axios({
    headers: { Authorization: `Bearer  ${token}` },
    method: "POST",
    url: `${BASE_URL}createNewCar`,
    data: data,
  }).catch(function (error) {
    console.log(error);
    return false;
  });

  return res;
};

//Edit Car
export const editCar = async (carName, pin) => {
  const data = {
    carName,
    pin,
  };
  const token = await AsyncStorage.getItem("@token");

  await axios({
    headers: { Authorization: `Bearer  ${token}` },
    method: "PUT",
    url: `${BASE_URL}editCar`,
    data: data,
  }).catch(function (error) {
    console.log(error);
    return false;
  });

  return res;
};

//Delete All Cars
export const deleteAllCars = async () => {
  const token = await AsyncStorage.getItem("@token");
  await axios({
    headers: { Authorization: `Bearer  ${token}` },
    method: "DELETE",
    url: `${BASE_URL}deleteAllCars`,
  }).catch(function (error) {
    console.log(error);
  });
};

//Delete All Cars
export const deleteCar = async (car_id) => {
  const token = await AsyncStorage.getItem("@token");
  await axios({
    headers: { Authorization: `Bearer  ${token}` },
    method: "DELETE",
    url: `${BASE_URL}deleteCar`,
    data: { car_id },
  }).catch(function (error) {
    console.log(error);
  });
};
