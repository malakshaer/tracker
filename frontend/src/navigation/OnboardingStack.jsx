import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "../screens/LandingScreen/LandingScreen";
import LogInScreen from "../screens/LogInScreen/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import TabStack from "./TabStack";
// import MapScreen from "../screens/AppScreens/MapScreen/MapScreen";
// import { colors } from "../constants/palette";

export function OnboardingStack() {
  const Stack = createStackNavigator();
  const navigationRef = useRef(null);

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#032955",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen name="Tracker" component={LandingScreen} />
        <Stack.Screen
          name="Login"
          component={LogInScreen}
          options={{ title: "Tracker" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Tracker" }}
        />
        {/* <Stack.Screen name={"Tab"} component={TabStack} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
