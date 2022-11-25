import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, Callout, AnimatedRegion } from "react-native-maps";
import { GOOGLE_MAP_KEY } from "../../../constants/googleMapKey";
import MapViewDirections from "react-native-maps-directions";
import Loader from "../../../components/Loader/Loader";
import logoMarker from "../../../../assets/logo-marker.png";
import * as Location from "expo-location";
import styles from "./MapScreenStyles";
import * as geoLocation from "expo-location";
import Constants from "expo-constants";
import Loading from "../../../components/Loading/Loading";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL_CAR = process.env.REACT_APP_BASE_URL_CAR;

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const MapScreen = () => {
  const [load, setLoad] = useState(false);
  const [notification, setNotification] = useState();
  const [seconds, setSeconds] = useState(0);
  const [myLocation, setMyLocation] = useState({
    latitude: 33.450736,
    longitude: 35.396315,
  });

  const [car, setCar] = useState({});
  const [longitude, setLongitude] = useState(35.49548);
  const [latitude, setLatitude] = useState(33.88863);

  useEffect(() => {
    const getCarLocation = async () => {
      console.log("data");

      const res = await axios.get(`${BASE_URL_CAR}getCarLocation/1`);
      await AsyncStorage.setItem("@cars", JSON.stringify(res.data.cars));
      setCar(res.data.data);
      sendNotification();
    };
    getCarLocation();
  }, []);

  useEffect(() => {
    setLoad(true);
    const getLocation = async () => {
      let { status } = await geoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let getLocation = await geoLocation.getCurrentPositionAsync({});
      setMyLocation({
        latitude: getLocation.coords.latitude,
        longitude: getLocation.coords.longitude,
      });
      setLoad(false);
    };
    getLocation();
  }, []);

  const notificationListener = useRef();
  const responseListener = useRef();

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

    // getPermission();

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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.mapView}
          initialRegion={{
            latitude: 33.88863,
            longitude: 35.49548,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsUserLocation={true}
          onUserLocationChange={(e) => {
            // setMyLocation({
            //   longitude: e.nativeEvent.longitude,
            //   latitude: e.nativeEvent.latitude,
            // });
          }}
        >
          <Marker.Animated
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <Image
              source={logoMarker}
              style={{
                width: 50,
                height: 40,
              }}
              resizeMode="contain"
            />
            <Callout>
              <Text>Your Car is here</Text>
            </Callout>
          </Marker.Animated>

          <MapViewDirections
            origin={myLocation}
            apikey={GOOGLE_MAP_KEY}
            strokeWidth={4}
            optimizeWaypoints={true}
            strokeColor="red"
            onStart={() => {
              console.log(`Started routing"`);
            }}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
