import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/auth";

export const getAllCars = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`${BASE_URL}/getAllCars`, {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  });

  return res;
};

export const getCar = async (data) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`${BASE_URL}/getCar/${data}`, {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  });

  return res;
};

export const createNewCar = async (name, pin) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.post(
    `${BASE_URL}/createNewCar`,
    {
      name,
      pin,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};

export const editCar = async (name, pin, data) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(
    `${BASE_URL}/editCar/${data}`,
    {
      name,
      pin,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};

export const changeCarStatus = async (status, data) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(
    `${BASE_URL}/changeCarStatus/${data}`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};

export const deleteAllCars = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.delete(
    `${BASE_URL}/deleteAllCars`,

    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};
