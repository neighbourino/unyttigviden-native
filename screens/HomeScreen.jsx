import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  ActivityIndicator,
  useTheme,
  Appbar,
} from "react-native-paper";
import { logout, getUser } from "../services/api";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
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
    navigation.navigate("Login"); // Navigate to Login screen after logout
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        {/* Custom Drawer Icon */}
        <Appbar.Action
          icon="menu" // Replace with your custom icon name
          color={theme.colors.accent} // Custom color for the icon
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title="Facts" />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        {user ? (
          <>
            <Text style={styles.text}>Welcome, {user.name}!</Text>
            <Button mode="contained" onPress={handleLogout} style={styles.button}>
              Logout
            </Button>
          </>
        ) : (
          <Text>User not found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    marginTop: 10,
  },
});

export default HomeScreen;
