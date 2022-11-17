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
  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345678910k");
  const [verifyPassword, setVerifyPassword] = useState("12345678910k");

  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const res = await register(name, email, password, verifyPassword);
      console.log(res);

      dispatch(set(res?.data));
      const user = await AsyncStorage.setItem(
        "user",
        JSON.stringify(res?.data)
      );

      props.navigation.navigate("MapScreen");
    } catch (error) {
      console.log(error);
    }
  };
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
        handlePress={handleRegister}
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
