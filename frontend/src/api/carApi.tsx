import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export const getAllCars = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`http://10.0.2.2:8000/api/auth/getAllCars`, {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  });

  return res;
};

export const getCar = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`http://10.0.2.2:8000/api/auth/getCar`, {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  });

  return res;
};

export const createNewCar = async (carName, pin) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = axios.post(`http://10.0.2.2:8000/api/auth/createNewCar`,
    {
      carName,
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

export const editCar = async (carName, pin) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(
    `http://10.0.2.2:8000/api/auth/editCar`,
    {
      carName,
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

export const changeCarStatus = async (status) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(
    `http://10.0.2.2:8000/api/auth/changeCarStatus`,
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
    `http://10.0.2.2:8000/api/auth/deleteAllCars`,

    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};

export const deleteCar = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.delete(
    `http://10.0.2.2:8000/api/auth/deleteCar`,

    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};
