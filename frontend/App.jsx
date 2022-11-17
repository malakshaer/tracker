import "react-native-gesture-handler";
import { createContext, useState, createRef } from "react";
import { Provider } from "react-redux";
import TabStack from "./src/navigation/TabStack";
import { OnboardingStack } from "./src/navigation/OnboardingStack";
import { NavigationContainer } from "@react-navigation/native";
import { StackSwitcher } from "./src/navigation/StackSwitcher";
import store from "./src/redux/store";
// import { AuthProvider } from "./src/redux/AuthContext";

// const ContextProvider = createContext();

export const UserContext = createContext("");

const App = () => {
  return (
    // <TabStack />
    //<OnboardingStack />

    <Provider store={store}>
      <StackSwitcher />
    </Provider>
  );
};

export default App;
