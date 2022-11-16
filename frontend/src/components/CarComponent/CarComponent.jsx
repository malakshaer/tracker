import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CarComponent = ({ carName, onPress }) => {
  return (
    <TouchableOpacity style={styles.dropDown} onPress={onPress}>
      <View style={styles.carDetails}>
        <Icon name={"car"} size={30} color={"#032955"} />
        <Text style={styles.textStyle}>{carName}</Text>
        {/* <Icon name={"checkmark-circle-outline"} size={30} color={"#032955"} /> */}
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
    fontSize: 20,
    paddingHorizontal: 20,
  },
});
export default CarComponent;
