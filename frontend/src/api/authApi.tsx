import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export interface loginProps {
  name?: string
  email: string;
  password: string
}

export const login = async (email, password) => {
  const res = axios.post(`http://10.0.2.2:8000/api/auth/login`, {
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
  const res = axios.post(`http://10.0.2.2:8000/api/auth/register`, {
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
  const res = axios.get(`http://10.0.2.2:8000/api/auth/showProfile`, {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  });
  return res;
};
