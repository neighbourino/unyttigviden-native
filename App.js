import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  Provider as PaperProvider,
  Drawer as PaperDrawer,
  Divider,
  Text,
  View,
  TouchableRipple,
  Avatar,
} from "react-native-paper";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FactsScreen from "./screens/FactsScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryDetailScreen from "./screens/CategoryDetailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./services/store";
import { getUser } from "./services/api";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [active, setActive] = useState("");
  const token = useSelector((state) => (state.auth ? state.auth.token : null));
  const [user, setUser] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        setError("Failed to load user data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      {token ? (
        <>
          {user && (
            <PaperDrawer.Item
              label={user.name}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
              icon={() => (
                <Avatar.Image
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
                  }}
                  size={40}
                />
              )}
            />
          )}

          <Divider style={{ marginBottom: 10 }} />

          <PaperDrawer.Item
            label="Home"
            active={active === "home"}
            onPress={() => {
              setActive("home");
              props.navigation.navigate("Home");
            }}
            icon="home"
          />
          <PaperDrawer.Item
            label="Facts"
            active={active === "facts"}
            onPress={() => {
              setActive("facts");
              props.navigation.navigate("Facts");
            }}
            icon="head-question"
          />

          <PaperDrawer.Item
            label="Categories"
            active={active === "categories"}
            onPress={() => {
              setActive("categories");
              props.navigation.navigate("Categories");
            }}
            icon="shape"
          />

          <Divider style={{ marginTop: 5, marginBottom: 5, padding: 0 }} />
          <PaperDrawer.Item
            label="Profile"
            active={active === "profile"}
            onPress={() => {
              setActive("profile");
              props.navigation.navigate("Profile");
            }}
            icon="account"
          />
          <PaperDrawer.Item
            label="Settings"
            active={active === "settings"}
            onPress={() => {
              setActive("settings");
              props.navigation.navigate("Settings");
            }}
            icon="cog"
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
              icon="login"
            />

            <PaperDrawer.Item
              label="Register"
              active={active === "register"}
              onPress={() => {
                setActive("register");
                props.navigation.navigate("Register");
              }}
              icon="account"
            />
          </PaperDrawer.Section>
        </>
      )}
    </DrawerContentScrollView>
  );
}

const AuthNavigator = () => {
  const token = useSelector((state) => (state.auth ? state.auth.token : null));

  return (
    <Drawer.Navigator
      initialRouteName={token ? "Home" : "Login"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {token ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Facts" component={FactsScreen} />
          <Drawer.Screen name="Categories" component={CategoriesScreen} />
          <Drawer.Screen name="CategoryDetail" component={CategoryDetailScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
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

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.drawerContent}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <AuthNavigator />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 20,
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

export default App;
