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
};
