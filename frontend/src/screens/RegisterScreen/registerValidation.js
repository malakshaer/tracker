import { Alert } from "react-native";
const BASE_URL = "https://127.0.0.1:8000/api/auth";

export default function validateInput(credentials) {
  let { name, email, password, confirmPassword } = credentials;

  name = name.trim();
  email = email.trim();
  password = password.trim();

  const nameIsValid = name.length > 2;
  const emailIsValid = email.includes("@");
  const passwordIsValid = password.length > 8;
  const passwordsAreEqual = password === confirmPassword;

  if (!nameIsValid || !emailIsValid || !passwordIsValid || !passwordsAreEqual) {
    Alert.alert("Invalid input", "Please check your input");
    return {
      name: !nameIsValid,
      email: !emailIsValid,
      password: !passwordIsValid,
      confirmPassword: !passwordIsValid || !passwordsAreEqual,
    };
  }
  return "valid";
}

export const RegisterNewUser = async (credentials) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    return handleResponse(data);
  } catch (err) {
    console.log({ err });
  }
};

function handleResponse(data) {
  if (data?.email) {
    Alert.alert("Invalid Email", "Email has already been taken");
    return;
  }
  if (data?.message) {
    Alert.alert("Success", "User successfully registered");
    return "success";
  }
}
