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

// const screen = Dimensions.get("window");
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
      //  console.log("my ", getLocation);
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
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          //   console.log("e", e.nativeEvent.coordinate);
          // setMyLocation({
          //   longitude: e.nativeEvent.longitude,
          //   latitude: e.nativeEvent.latitude,
          // });
        }}
      >
        {/* <Marker coordinate={myLocation} title={"Your car is here"} /> */}
        <Marker.Animated coordinate={myLocation}>
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
          origin={{
            latitude: 33.88863,
            longitude: 35.49548,
          }}
          destination={myLocation}
          apikey={GOOGLE_MAP_KEY}
          strokeWidth={3}
          // strokeColor={colors.darker}
        />
        <Marker
          coordinate={{
            latitude: 33.88863,
            longitude: 35.49548,
          }}
          title={"Picker Location"}
        />
      </MapView>

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
          // onPress={onCenter}
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
      {/* <Loader isLoading={isLoading} /> */}
    </SafeAreaView>
  );
};

export default MapScreen;
