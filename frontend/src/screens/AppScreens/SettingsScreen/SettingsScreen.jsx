import React from "react";
import { View, Text, Image } from "react-native";
import SettingsComponent from "../../../components/SettingsComponent/SettingsComponent";
import ModalPopup from "../../../components/Modal/Modal";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LandingScreen from "../../LandingScreen/LandingScreen";
import { deleteAllCars } from "../../../api/carApi";
import { deleteAccount } from "../../../api/userApi";
import styles from "./SettingsScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [visibleVehicle, setVisibleVehicle] = React.useState(false);
  const [visibleNotification, setVisibleNotification] = React.useState(false);
  const [visibleSendNotification, setVisibleSendNotification] =
    React.useState(false);

  const Logout = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("Landing");
  };

  return (
    <View style={styles.container}>
      <SettingsComponent
        text={"Clear all Vehicles"}
        onPress={() => {
          setVisibleVehicle(true);
        }}
      />
      <SettingsComponent
        text={"Delete Account"}
        onPress={() => {
          setVisibleSendNotification(true);
        }}
      />
      <SettingsComponent
        text={"Sign Out"}
        onPress={() => {
          setVisible(true);
        }}
      />

      <ModalPopup visible={visibleSendNotification}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to delete you account?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                deleteAccount();
                setVisibleSendNotification(false);
              }}
            >
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleSendNotification(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>

      <ModalPopup visible={visibleVehicle}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to Clear all vehicles?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                deleteAllCars();
                setVisibleVehicle(false);
              }}
            >
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleVehicle(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>

      <ModalPopup visible={visible}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to Sign Out?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => Logout()}>
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>
    </View>
  );
};

export default SettingsScreen;
