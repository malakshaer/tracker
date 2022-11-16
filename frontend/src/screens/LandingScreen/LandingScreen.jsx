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
