import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SettingsComponent = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.dropDown} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#032955",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  text: {
    color: "#032955",
    fontSize: 18,
  },
});
export default SettingsComponent;
