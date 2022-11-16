import axios from "axios";
import { React, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { validateInput } from "./loginValidation";
import { loginUser } from "./loginValidation";
import { AuthContext } from "../../redux/AuthContext";
// import AsyncStorage from "react-native";

const LogInScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const [sendRequest, setSendRequest] = useState(false);
  const [credentials, setCredentials] = useState({});
  const [isAuthenticating, setIsAuthenticating] = useState("");
  const [token, setToken] = useState();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  const { email: emailIsInvalid, password: passwordIsInvalid } =
    credentialsInvalid;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
      <View>
        <TextInput
          style={styles.input}
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail.value}
          placeholder="Enter Email"
          placeholderTextColor="grey"
          isInvalid={emailIsInvalid}
        />
        <TextInput
          style={styles.input}
          value={enteredPassword.value}
          placeholder="Enter Password"
          placeholderTextColor="grey"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secureTextEntry
          isInvalid={passwordIsInvalid}
        />
      </View>
      <TouchableOpacity
        style={styles.appButtonContainer}
        activeOpacity={0.5}
        onPress={() => {
          setSendRequest(true);
        }}
      >
        <Text style={styles.appButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={styles.appButtonText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.navText}>Register</Text>
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

export default LogInScreen;
