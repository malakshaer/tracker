import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import LogInScreen from "../LogInScreen/LogInScreen";
import RegisterScreen from "../RegisterScreen/RegisterScreen";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logoImage}
          source={require("../../../../frontend/assets/logo.png")}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Login")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Register")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#032955",
    alignItems: "center",
    paddingTop: 50,
  },
  logoImage: {
    paddingTop: 400,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#1648AD",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default LandingScreen;
