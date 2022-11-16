import React, { useState, useNavigation } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationActions } from "react-navigation";
import validateInput from "./registerValidation";
import RegisterNewUser from "./registerValidation";

const RegisterScreen = ({ navigation }) => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterPassword, setEnterPassword] = useState("");
  const [enterConfirmPassword, setEnterConfirmPassword] = useState("");

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const {
    name: nameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsUnMatched,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setEnterName(enteredValue);
        break;
      case "email":
        setEnterEmail(enteredValue);
        break;
      case "password":
        setEnterPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnterConfirmPassword(enteredValue);
        break;
    }
  }
  async function handleSignup() {
    let validation = validateInput({
      name: enterName,
      email: enterEmail,
      password: enterPassword,
      confirmPassword: enterConfirmPassword,
    });
    if (validation !== "valid") {
      setCredentialsInvalid(validation);
    } else {
      let credentials = {
        name: enterName,
        email: enterEmail,
        password: enterPassword,
        password_confirmation: enterConfirmPassword,
      };
      let response = await RegisterNewUser(credentials);
      if (response === "success") {
        navigation.navigate("Login");
      }
    }
  }
};
