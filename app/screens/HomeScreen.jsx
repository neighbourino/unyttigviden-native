import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  ActivityIndicator,
  useTheme,
  Appbar,
  Card,
  Avatar,
} from "react-native-paper";
import { getUser } from "../services/api";
import { useSelector } from "react-redux";

import ScreenAppbar from "../components/ScreenAppbar";

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const token = useSelector((state) =>
    state.reducer.auth ? state.reducer.auth.token : null
  );

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

    if (token) {
      fetchUser();
    }else{
      fetchUser();
      setUser(null);
    }
    
    
  }, [token]);


  const LeftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="folder"
      style={{ backgroundColor: theme.colors.onPrimary }}
      color={theme.colors.primary}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenAppbar title="Unyttig Viden" />
      <View style={styles.contentContainer}>
        <Card
          style={{ backgroundColor: theme.colors.primary, marginBottom: 20 }}
          elevation={1}
        >
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
            titleStyle={{ color: theme.colors.onPrimary, fontWeight: "bold" }}
            subtitleStyle={{ color: theme.colors.onPrimary }}
          />
          <Card.Content>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onPrimary }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
              voluptates quidem earum dignissimos pariatur eum inventore sint
              labore accusamus hic.
            </Text>
          </Card.Content>
        </Card>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.colors.primaryContainer,
            marginLeft: -20,
            marginRight: -20,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <View style={{ width: "75%" }}>
            {user ? (
              <>
                <Text variant="titleLarge">Velkommen tilbage, {"\n"}{user.name}!</Text>
              </>
            ) : (
              <Text variant="titleLarge">Hej med dig!</Text>
            )}
          </View>
          <View>
            <Avatar.Image
              source={{
                uri:
                  user && user.profile_image_url
                    ? user.profile_image_url
                    : "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
              }}
              size={50}
              style={{ width: 50, height: 50 }}
              resizeMode="cover"
            />
          </View>
        </View>
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
  card: {},
});

export default HomeScreen;
