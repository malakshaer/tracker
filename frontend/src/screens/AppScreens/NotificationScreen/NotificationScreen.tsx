import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  Pressable,
} from "react-native";
import styles from "./NotificationScreenStyles";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import storage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import NotificationComponent from "../../../components/Notifications/NotificationComponent";
import { readNotification } from "../../../api/notificationFirebase";
import { getAllNotifications } from "../../../api/notificationFirebase";
import axios from "axios";
import logo from "../../../../assets/logo-marker.png";
import Loading from "../../../components/Loading/Loading";
import { firebase } from "../../../config/firebase";

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

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      message: "Your car is active now",
      create_at: "22:10",
    },
  ]);

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

  const notificationRef = firebase.firestore().collection("notifications");

  useEffect(() => {
    notificationRef.onSnapshot((querySnapshot) => {
      const not = [];
      querySnapshot.forEach((doc) => {
        const { message, created_at } = doc.data();
        not.push({
          id: doc.id,
          message,
          created_at,
        });
      });
      setNotifications(not);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.note}>
          <Text style={styles.text}>
            Mark <Icon name={"checkmark-circle"} size={25} color={"#032955"} />
            if you made the action
          </Text>
        </View>
        <View>
          <FlatList
            style={{ height: "100%" }}
            data={notifications}
            numColumns={1}
            renderItem={({ item }) => (
              <Pressable>
                <NotificationComponent
                  id={item.id}
                  text={item.message}
                  time={item.created_at}
                />
              </Pressable>
            )}
          ></FlatList>
        </View>
        {loading && <Loading />}

        {/* <TouchableOpacity onPress={sendNotification}>
            <Text
              style={{ backgroundColor: "red", padding: 10, color: "white" }}
            >
              Click me to send a push notification
            </Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );
}
