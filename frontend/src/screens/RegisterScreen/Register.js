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
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Register</Text>
      <View>
        <TextInput
          style={styles.input}
          onUpdateValue={updateInputValueHandler.bind(this, "name")}
          value={enterName.value}
          placeholder="Enter your name"
          placeholderTextColor="grey"
          isInvalid={nameIsInvalid}
        />

        <TextInput
          style={styles.input}
          value={enterEmail.value}
          placeholder="Enter email"
          placeholderTextColor="grey"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          isInvalid={emailIsInvalid}
        />

        <TextInput
          style={styles.input}
          value={enterPassword.value}
          placeholder="Enter password"
          placeholderTextColor="grey"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          isInvalid={passwordIsInvalid}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={enterConfirmPassword.value}
          placeholder="Confirm password"
          placeholderTextColor="grey"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
          isInvalid={passwordsUnMatched}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        handlePress={handleSignup}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Create</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={styles.appButtonText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.navText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#032955",
    alignItems: "center",
  },
  titleText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
  },
  input: {
    height: 50,
    width: 250,
    marginVertical: 10,
    backgroundColor: "#032955",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontSize: 20,
    color: "#C0BCBC",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#1648AD",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  navText: {
    color: "#1648AD",
    fontSize: 18,
  },
});

export default RegisterScreen;