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
import imagePath from "../../../constants/imagePath";
import MapViewDirections from "react-native-maps-directions";
import Loader from "../../../components/Loader/Loader";
import { locationPermission, getCurrentLocation } from "./helperFunction";
import logoMarker from "../../../../assets/logo-marker.png";
import { sendNewNotification } from "../../../api/notificationFirebase";
import sendNotification from "../NotificationScreen/NotificationScreen";
import locate from "../../../../assets/locate.png";
import * as Location from "expo-location";
import styles from "./MapScreenStyles";
import * as geoLocation from "expo-location";
import Constants from "expo-constants";
import Loading from "../../../components/Loading/Loading";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = () => {
  const [load, setLoad] = useState(false);
  const [myLocation, setMyLocation] = useState({
    latitude: 33.450736,
    longitude: 35.396315,
  });

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

  if (load) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          // latitude: myLocation.latitude,
          // longitude: myLocation.longitude,
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
        //  coordinate={myLocation}
        coordinate={{
          latitude: 33.88863,
          longitude: 35.49548,
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
          strokeColor= "red"
          onStart={() => {
            //push notification
            sendNotification();
            //send notification to the server
            sendNewNotification();
            console.log(`Started routing"`);
          }}
        />        
      </MapView>

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
          // onPress={}
        >
          <Image
            source={locate}
            style={{
              width: 70,
              height: 70,
            }}
          />
        </TouchableOpacity>
      </View>      
    </SafeAreaView>
  );
};

export default MapScreen;
