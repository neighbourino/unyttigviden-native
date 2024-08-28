import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  HelperText,
  Headline,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { setToken } from "../services/authSlice";
import { login } from "../services/api";
import { useNavigation } from "@react-navigation/native";

import ScreenAppbar from "../components/ScreenAppbar";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    setError("");
    try {
      const data = await login({
        email,
        password,
        device_id: `${Platform.OS} ${Platform.Version}`,
      });
      dispatch(setToken(data.token));
      navigation.navigate("Home");
    } catch (err) {
      if (err.response?.status == 422) {
        setErrors(err.response.data.errors);
      } else {
        setError("Failed to login: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <View style={styles.container}>
        <ScreenAppbar title="Log ind" />

        <View style={styles.screenContent}>

          <View style={styles.inputWrapper}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <HelperText type="error" visible={errors.email}>
            {errors.email}
          </HelperText>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <HelperText type="error" visible={errors.password}>
            {errors.password}
          </HelperText>
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Login
        </Button>
        {error && (
          <Text style={{ color: theme.colors.error, padding: 20 }}>
            {error}
          </Text>
        )}

        <Button
          mode="text"
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
        >
          Don't have an account? Register
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.button}
        >
          Forgot Password?
        </Button>
          </View>

        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  screenContent: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
