import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { readNotification } from "../../api/notificationsApi";
import UserContext from "../../../App";

const NotificationComponent = ({ time, text }) => {
  return (
    <View>
      <View style={styles.notificationContainer}>
        <View style={styles.notification}>
          <Text>{text}</Text>
          <TouchableOpacity>
            <Icon
              name={iconName}
              size={30}
              color={"#032955"}
              onPress={() => {
                if (iconName == "checkmark-circle-outline") {
                  readNotification(userId);
                  setIconName("checkmark-circle");
                }
                // if (iconName == "checkmark-circle") {
                //   setIconName("checkmark-circle-outline");
                // }
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>{time}</Text>
        </View>
      </View>
    </View>
  );
};
//readNotification();

export default NotificationComponent;
