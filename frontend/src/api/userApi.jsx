import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

//Edit Profile
export const editUser = async (name, email, password) => {
  const user = JSON.parse((await AsyncStorage.getItem("user")) || "");
  console.log("data");

  const res = await axios.put(
    `${BASE_URL}editUser`,
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};

//Delete Account
export const deleteAccount = async () => {
  const token = await AsyncStorage.getItem("@token");
  await axios({
    headers: { Authorization: `Bearer  ${token}` },
    method: "DELETE",
    url: `${BASE_URL}deleteAccount`,
  })
    .then(AsyncStorage.clear())
    .catch(function (error) {
      console.log(error);
    });
};
