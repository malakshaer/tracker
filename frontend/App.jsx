import "react-native-gesture-handler";
import { createContext, useState, createRef } from "react";
import TabStack from "./src/navigation/TabStack";
import { OnboardingStack } from "./src/navigation/OnboardingStack";
import { NavigationContainer } from "@react-navigation/native";
import { StackSwitcher } from "./src/navigation/StackSwitcher";
// import { AuthProvider } from "./src/redux/AuthContext";

// const ContextProvider = createContext();

export const UserContext = createContext("");

const App = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [token, setToken] = useState("");
  return (
    <TabStack />
    //<OnboardingStack />
    // <>
    //   <UserContext.Provider
    //     value={{
    //       id,
    //       setId,
    //       token,
    //       setToken,
    //       name,
    //       setName,
    //       email,
    //       setEmail,
    //     }}
    //   >
    //     <NavigationContainer ref={createRef()}>
    //       <OnboardingStack />
    //     </NavigationContainer>
    //   </UserContext.Provider>
    // </>
  );
};

export default App;
