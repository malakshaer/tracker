import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationActions } from "react-navigation";
import { register } from "../../api/authApi";
import { addUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading/Loading";

interface RegisterScreenProps {
  navigation;
}

const RegisterScreen = (props: RegisterScreenProps) => {

  const goToLogInScreen = () => props.navigation.navigate("Login");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await register(name, email, password,verifyPassword);
      console.log(res);

      dispatch(addUser(res?.data));
      const user = await AsyncStorage.setItem(
        "user",
        JSON.stringify(res?.data)
      );

      props.navigation.navigate("Tab");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Register</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder={"name"}
        />

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder={"Email"}
        />

        <TextInput
          style={styles.input}
          textContentType="password"
          onChangeText={setPassword}
          secureTextEntry
          value={password}
          placeholder={"Password"}
        />
        <TextInput
          style={styles.input}
          textContentType="password"
          onChangeText={setVerifyPassword}
          value={verifyPassword}
          secureTextEntry
          placeholder={"Verify Password"}
        />
        {loading && <Loading />}
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleRegister}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Create</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={styles.appButtonText}>Already have an account? </Text>
        <TouchableOpacity onPress={goToLogInScreen}>
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
