import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FactsScreen from "./screens/FactsScreen";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./services/store";

const Drawer = createDrawerNavigator();

const AuthNavigator = () => {
  const token = useSelector((state) => (state.auth ? state.auth.token : null));

  return (
    <Drawer.Navigator initialRouteName={token ? "Home" : "Login"}>
      {token ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Facts" component={FactsScreen} />

          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Facts" component={FactsScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
