import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

// theme + ui
import { Drawer as PaperDrawer, Divider, Avatar, Modal, Portal, Text, Button } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

// services
import { getUser, logout } from "../services/api";

export default function CustomDrawerContent(props) {
  const [active, setActive] = useState("");
  const token = useSelector((state) =>
    state.reducer.auth ? state.reducer.auth.token : null
  );
  const [user, setUser] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const showLogoutModal = () => setLogoutModalVisible(true);
  const hideLogoutModal = () => setLogoutModalVisible(false);

  const navigation = useNavigation();

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

  const handleLogout = async () => {
    await logout();
        hideLogoutModal();
    navigation.navigate("Home"); // Navigate to Login screen after logout
  };

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
                    uri: user.profile_image_url
                      ? user.profile_image_url
                      : "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
                  }}
                  size={40}
                  style={{ width: 40, height: 40 }}
                  resizeMode="cover"
                />
              )}
            />
          )}

          <Divider style={{ marginBottom: 10 }} />

          <PaperDrawer.Item
            label="Dashboard"
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

          {/* <PaperDrawer.Item
            label="Categories"
            active={active === "categories"}
            onPress={() => {
              setActive("categories");
              props.navigation.navigate("Categories");
            }}
            icon="shape"
          /> */}

          {/* <Divider style={{ marginTop: 5, marginBottom: 5, padding: 0 }} />
          <PaperDrawer.Item
            label="Profil"
            active={active === "profile"}
            onPress={() => {
              setActive("profile");
              props.navigation.navigate("Profile");
            }}
            icon="account"
          />
          <PaperDrawer.Item
            label="Indstillinger"
            active={active === "settings"}
            onPress={() => {
              setActive("settings");
              props.navigation.navigate("Settings");
            }}
            icon="cog"
          /> */}
          <PaperDrawer.Item
            label="Bogmærker"
            active={active === "bookmarks"}
            onPress={() => {
              setActive("bookmarks");
              props.navigation.navigate("Bookmarks");
            }}
            icon="bookmark"
          />
          <Divider style={{ marginTop: 5, marginBottom: 5, padding: 0 }} />
          <PaperDrawer.Item
            label="Log ud"
            onPress={showLogoutModal}
            icon="logout"
          />
          <Portal>
        <Modal visible={logoutModalVisible} onDismiss={hideLogoutModal} contentContainerStyle={styles.modal}>
          <Text style={styles.title}>Er du sikker på at du vil logge ud?</Text>
          
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>Log ud</Button>
            <Button mode="outlined" onPress={hideLogoutModal} style={styles.cancelButton}>Fortryd</Button>
          </View>
        </Modal>
      </Portal>
        </>
      ) : (
        <>
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
          <Divider style={{ marginTop: 5, marginBottom: 5, padding: 0 }} />
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


const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  logoutButton: {
    marginRight: 10,
  },
  cancelButton: {
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});