import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import storage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import NotificationComponent from "../../../components/Notifications/NotificationComponent";
import readNotification from "../../../api/notificationsApi";
const BASE_URL = "https://127.0.0.1:8000/api/auth";
import UserContext from "../../../../App";
import axios from "axios";
import EmptyStateView from "@tttstudios/react-native-empty-state";
import logo from "../../../../assets/logo-marker.png";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function NotificationScreen() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const id = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/getAllNotifications/${id}`,
    })
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get permission for notification
  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Enable push notifications to use the app!");
          await storage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem("expopushtoken", token);
      } else {
        alert("Allow Push Notifications?");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    getPermission();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //Schedule push notifications
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        channelId: "reminders",
        title: "Tracker",
        body: "Your Car is Active now!",
        data: { data: "data goes here" },
        repeatType: "second",
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.note}>
            <Text style={styles.text}>
              Mark{" "}
              <Icon name={"checkmark-circle"} size={25} color={"#032955"} />
              if you made the action
            </Text>
          </View>
          {/* <EmptyStateView
            enableButton
            buttonText="Refresh"
            imageSource={logo}
            imageStyle={styles.imageStyle}
            headerText="No Notification yet"
            headerTextStyle={styles.headerTextStyle}
          /> */}
          {messages.map((msg) => {
            // console.warn(msg);
            const date = new Date(msg.created_at);
            return <NotificationComponent text={msg.message} time={data} />;
          })}

          <NotificationComponent
            text={"Your car is active now"}
            time={"13:15"}
          />

          {/* <TouchableOpacity onPress={sendNotification}>
            <Text
              style={{ backgroundColor: "red", padding: 10, color: "white" }}
            >
              Click me to send a push notification
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  note: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  text: {
    color: "#032955",
    fontSize: 16,
  },
  headerTextStyle: {
    color: "rgb(76, 76, 76)",
    fontSize: 18,
    marginBottom: 20,
  },
  imageStyle: {
    height: "50%",
    resizeMode: "contain",
    marginTop: 100,
  },
});
