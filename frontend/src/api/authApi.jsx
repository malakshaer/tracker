import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async (email, password) => {
  const res = axios.post(`${BASE_URL}login`, {
    email,
    password,
  });
  return res;
};

export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  const res = axios.post(`${BASE_URL}register`, {
    name,
    email,
    password,
    password_confirmation,
  });
  return res;
};

//Show Profile
export const profile = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");

  const res = axios.get(`${BASE_URL}showProfile`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};
