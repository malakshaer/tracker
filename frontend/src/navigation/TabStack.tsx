import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from "react-native-ionicons";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import MapScreen from "../screens/AppScreens/MapScreen/MapScreen";
import ProfileScreen from "../screens/AppScreens/ProfileScreen/ProfileScreen";
import NotificationScreen from "../screens/AppScreens/NotificationScreen/NotificationScreen";
import SettingsScreen from "../screens/AppScreens/SettingsScreen/SettingsScreen";
import LandingScreen from "../screens/LandingScreen/LandingScreen";

//Screen names
const MapName = "Map";
const ProfileName = "Profile";
const NotificationName = "Notification";
const settingsName = "Settings";
const Landing = "Landing";

const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={MapName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === MapName) {
              iconName = "md-location-sharp";
            } else if (rn === ProfileName) {
              iconName = "person";
            } else if (rn === NotificationName) {
              iconName = "notifications";
            } else if (rn === settingsName) {
              iconName = "settings";
            }

            //return any component
            return <Icon name={iconName} size={35} color={color} />;
          },
          tabBarStyle: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "#032955",
            height: 70,
          },
          headerStyle: {
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: "#032955",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 24,
          },
          tabBarHideOnKeyboard: "true",
        })}
        tabBarOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 5, fontSize: 12, display: "none" },
        }}
      >
        <Tab.Screen name={MapName} component={MapScreen} />
        <Tab.Screen name={ProfileName} component={ProfileScreen} />
        <Tab.Screen name={NotificationName} component={NotificationScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        <Tab.Screen name={Landing} component={LandingScreen} options={{ headerShown: false, tabBarStyle:{display:"none"} }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabStack;
