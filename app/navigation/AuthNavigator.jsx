import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";

import {
  createDrawerNavigator
} from "@react-navigation/drawer";

// screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FactsScreen from "../screens/FactsScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";
import BookmarksScreen from "../screens/BookmarksScreen";



const Drawer = createDrawerNavigator();

export default AuthNavigator = () => {
  const token = useSelector((state) =>
    state.reducer.auth ? state.reducer.auth.token : null
  );

  return (
    <Drawer.Navigator
      initialRouteName={token ? "Home" : "Home"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {token ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Facts" component={FactsScreen} />
          <Drawer.Screen
            name="CategoryDetail"
            component={CategoryDetailScreen}
          />
          <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Facts" component={FactsScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
          <Drawer.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};