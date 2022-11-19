import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const editUser = async (name, email, password) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(
    `http://10.0.2.2:8000/api/editUser`,
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'content-type': 'application/x-www-form-urlencoded' 
      },
    }
  );

  return res;
};

export const deleteAccount = async () => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.delete(`http://10.0.2.2:8000/api/auth/deleteAccount`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};
