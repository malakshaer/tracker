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

export default LogInScreen;
