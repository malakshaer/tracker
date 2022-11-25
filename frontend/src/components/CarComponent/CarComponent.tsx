import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CarComponent = ({ carName, pin, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.carDetails}>
        <Icon style={styles.icon} name={"car"} size={30} color={"#032955"} />
        <View>
          <Text style={styles.textStyle}>Name: {carName}</Text>
          <Text style={styles.textStyle}>PIN: {pin}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  carDetails: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#032955",
    marginHorizontal: 25,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  textStyle: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "#032955",
  },
  icon: {
    textAlignVertical: "center",
  },
});
export default CarComponent;
