import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/auth";

export const editUser = async (name, email, password) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(
    `${BASE_URL}/editUser`,
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};

export const showProfile = async (name, email) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.get(
    `${BASE_URL}/showProfile`,
    {
      name,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return res;
};
