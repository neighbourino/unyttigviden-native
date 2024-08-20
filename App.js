import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { PaperProvider, Drawer as PaperDrawer, Divider } from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import FactListScreen from "./screens/FactListScreen";
import LogoutScreen from "./screens/LogoutScreen";
import AuthContext from "./contexts/AuthContext";
import FactSwipeScreen from "./screens/FactSwipeScreen";
import { getUser } from "./services/AuthService";


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [active, setActive] = useState("");
  const [user, setUser] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await getUser();
        setUser(user);
      } catch (e) {
        console.log("Failed to get user", e);
      }
      setStatus("idle");
    }

    runEffect();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      {user ? (
        <>

          <View style={styles.userInfoSection}>
            <Text style={styles.title}>{user.name}</Text>
          </View>
          <Divider />

          <PaperDrawer.Item
              label="Home"
              active={active === "home"}
              onPress={() => {
                setActive("home");
                props.navigation.navigate("Home");
              }}
            />
            <PaperDrawer.Item
              label="Facts"
              active={active === "facts"}
              onPress={() => {
                setActive("facts");
                props.navigation.navigate("FactSwipe");
              }}
            />
          
              <Divider />
          <PaperDrawer.Item
              label="Logout"
              active={active === "logout"}
              onPress={() => {
                setActive("logout");
                props.navigation.navigate("Logout");
              }}
            />
        </>
      ) : (
        <>
          <PaperDrawer.Section title="">
            <PaperDrawer.Item
              label="Login"
              active={active === "login"}
              onPress={() => {
                setActive("login");
                props.navigation.navigate("Login");
              }}
            />
            <PaperDrawer.Item
              label="Second Item"
              active={active === "second"}
              onPress={() => {
                setActive("second");
                props.navigation.navigate("FactsList");
              }}
            />
          </PaperDrawer.Section>
        </>
      )}
    </DrawerContentScrollView>
  );
}

function CustomDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="FactsList" component={FactListScreen} />
      <Drawer.Screen name="FactSwipe" component={FactSwipeScreen} />

      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await getUser();
        setUser(user);
      } catch (e) {
        console.log("Failed to get user", e);
      }

      setStatus("idle");
    }

    runEffect();
  }, []);

  if (status === "loading") {
    return (
      <PaperProvider>
        <SplashScreen />
      </PaperProvider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <SafeAreaView style={styles.drawerContent}>
        <PaperProvider>
          <NavigationContainer>
            <CustomDrawer />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom : 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {},
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
