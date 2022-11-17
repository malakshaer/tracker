import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "https://127.0.0.1:8000/api/auth";

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
