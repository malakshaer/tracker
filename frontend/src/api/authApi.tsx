import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "http://10.0.2.2:8000/api/auth";

export interface loginProps {
  name?: string
  email: string;
  password: string
}

export const login = async (email, password) => {
  const res = axios.post(`${BASE_URL}/login`, {
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
  const res = axios.post(`${BASE_URL}/register`, {
    name,
    email,
    password,
    password_confirmation,
  });
  return res;
};

export const showProfile = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  const res = axios.get(`${BASE_URL}/showProfile`, {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  });
  return res;
};
