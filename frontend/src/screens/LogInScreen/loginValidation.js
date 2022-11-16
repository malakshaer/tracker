import { Alert } from "react-native";
const BASE_URL = "https://127.0.0.1:8000/api/auth";

export const loginUser = async (credentials) => {
  const handleResponse = (data) => {
    if (data["email"]) {
      if (data["email"][0]) {
        Alert.alert(data["email"][0]);
        return null;
      }
    }
    if (data.error) {
      if (data.error === "Unauthorized") {
        Alert.alert("Invalid credentials", "Wrong email or password!");
        return null;
      }
    }
    if (data.access_token) {
      let token = data.access_token;
      return token;
    }
  };

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    return handleResponse(data);
  } catch (err) {
    console.log(err);
  }
};

export function validateInput(credentials) {
  let { email, password } = credentials;

  email = email.trim();
  password = password.trim();

  const emailIsValid = email.includes("@");
  const passwordIsValid = password.length > 8;

  if (!emailIsValid || !passwordIsValid) {
    Alert.alert("Invalid", "Please check your input");
    return {
      email: !emailIsValid,
      password: !passwordIsValid,
    };
  }
  return "valid";
}
