import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/auth";

export const getAllNotifications = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(`${BASE_URL}/getAllNotifications`, {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  });

  return res;
};
