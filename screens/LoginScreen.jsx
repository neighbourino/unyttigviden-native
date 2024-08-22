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
      navigation.replace("Home");
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
      <View
        style={{
          marginBottom: 0,
          backgroundColor: theme.colors.primary,
          paddingTop: 30,
          paddingBottom: 30,
          borderRadius: 0,
        }}
      >
        <Headline
          style={{
            color: theme.colors.onPrimary,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Login
        </Headline>
      </View>
      <View style={styles.container}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
