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
export default CarComponent;
