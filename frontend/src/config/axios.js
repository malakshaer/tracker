import axios from "axios";
import AsyncStorage from "react-native";

const BASE_URL = "http://127.0.0.1:8000/api/auth";

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: Boolean(AsyncStorage.getItem("JWT"))
      ? `Bearer ${AsyncStorage.getItem("JWT")}`
      : undefined,
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: BASE_URL,
});

export const request = ({ ...options }) => {
  return api(options)
    .then((response) => response)
    .catch((error) => error);
};
