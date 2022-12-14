import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getAllNotifications = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`http://10.0.2.2:8000/api/auth/getAllNotifications`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};

export const getSingleNotification = async (data: number) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`http://10.0.2.2:8000/api/auth/getSingleNotification/${data}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};

export const readNotification = async (data: number) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(`http://10.0.2.2:8000/api/auth/readNotification/${data}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};

export const sendNewNotification = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.post(`http://10.0.2.2:8000/api/auth/sendNotification`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};

export const deleteNotification = async (data: number) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.delete(`http://10.0.2.2:8000/api/auth/deleteNotification/${data}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};

export const deleteAllNotifications = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.delete(`http://10.0.2.2:8000/api/auth/deleteAllNotifications`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};
