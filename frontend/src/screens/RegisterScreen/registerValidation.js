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