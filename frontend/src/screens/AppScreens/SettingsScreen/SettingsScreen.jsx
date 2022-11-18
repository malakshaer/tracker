import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SettingsComponent from "../../../components/SettingsComponent/SettingsComponent";
import ModalPopup from "../../../components/Modal/Modal";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LandingScreen from "../../LandingScreen/LandingScreen";
import { deleteAllNotifications } from "../../../api/notificationsApi";
import { deleteAllCars } from "../../../api/carApi";
import { deleteAccount } from "../../../api/userApi";
import { deleteUser } from "../../../redux/slices/userSlice";

const SettingsScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [visibleVehicle, setVisibleVehicle] = React.useState(false);
  const [visibleNotification, setVisibleNotification] = React.useState(false);
  const [visibleSendNotification, setVisibleSendNotification] =
    React.useState(false);

  const handleNavigation = () => {
    navigation.navigate(LandingScreen);
  };

  return (
    <View style={styles.container}>
      <SettingsComponent
        text={"Clear Notifications"}
        onPress={() => {
          setVisibleNotification(true);
        }}
      />
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
            <TouchableOpacity onPress={() => deleteUser()}>
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

      <ModalPopup visible={visibleNotification}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to Clear all Notifications?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => deleteAllNotifications()}>
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleNotification(false)}>
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
            <TouchableOpacity onPress={() => deleteAllCars()}>
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
            <TouchableOpacity onPress={() => handleNavigation()}>
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  popUpContainer: {
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  textPopUp: {
    marginVertical: 30,
    fontSize: 20,
    textAlign: "center",
    color: "#032955",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  textPermission: {
    marginVertical: 20,
    fontSize: 20,
    color: "#032955",
    paddingRight: 50,
  },
});

export default SettingsScreen;
