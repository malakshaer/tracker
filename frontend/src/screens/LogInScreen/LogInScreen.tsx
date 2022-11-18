import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { login } from "../../api/authApi";
import "localstorage-polyfill";
import Loading from "../../components/Loading/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabStack from "../../navigation/TabStack";

interface loginScreenProps {
  navigation;

}

const LogInScreen = (props: loginScreenProps) => {
  const goToRegisterScreen = () => props.navigation.navigate("Register");

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("malakshaer@gmail.com");
  const [password, setPassword] = useState("12345678910k");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login(email, password);
      dispatch(addUser(res?.data));
      const user = await AsyncStorage.setItem(
        "user",
        JSON.stringify(res?.data)
      );

      if (res?.status === 200) {
        props.navigation.navigate("Map");
        
      }
    } catch (error) {
      console.log(error);
      alert("invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
      <View>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder={"Enter your email"}
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder={"Enter your password"}
          style={styles.input}
          secureTextEntry
        />
        {loading && <Loading />}
      </View>
      <TouchableOpacity
        style={styles.appButtonContainer}
        activeOpacity={0.5}
        onPress={() => {
          handleLogin();
        }}
      >
        <Text style={styles.appButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={styles.appButtonText}>Don't have an account? </Text>
        <TouchableOpacity onPress={goToRegisterScreen}>
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
