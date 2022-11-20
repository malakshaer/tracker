import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { readNotification } from "../../api/notificationFirebase";

const NotificationComponent = ({ time, text, id }) => {
  const [iconName, setIconName] = React.useState("checkmark-circle-outline");

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
                  readNotification(id);
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

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "column",
    marginHorizontal: 40,
    borderWidth: 2,
    borderColor: "#032955",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  notification: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default NotificationComponent;
