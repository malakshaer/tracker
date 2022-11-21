import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { StackSwitcher } from "./src/navigation/StackSwitcher";
import { store } from "./src/redux/store";
import UserProvider from "./src/redux/userContext";


const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <StackSwitcher />
      </UserProvider>
    </Provider>    
  );
};

export default App;
