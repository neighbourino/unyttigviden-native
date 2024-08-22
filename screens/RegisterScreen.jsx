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
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        device_id: `${Platform.OS} ${Platform.Version}`,
      });
      // Assuming the response contains the token
      const { token } = response.data;
      dispatch(setToken(token));
      navigation.replace("Home"); // Navigate to Home after successful registration
    } catch (err) {
      if (err.response?.status == 422) {
        setErrors(err.response.data.errors);
      } else {
        setError(
          "Failed to register: " + err.response?.data?.message || err.message
        );
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
          Register
        </Headline>
      </View>

      <View style={styles.container}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <HelperText type="error" visible={errors.name}>
          {errors.name}
        </HelperText>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <HelperText type="error" visible={errors.email}>
          {errors.email}
        </HelperText>
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <HelperText type="error" visible={errors.password}>
          {errors.password}
        </HelperText>
        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Register
        </Button>
        {error && (
          <Text style={{ color: theme.colors.error, padding: 20 }}>
            {error}
          </Text>
        )}

        <Button
          mode="text"
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          Already have an account? Login
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
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default RegisterScreen;
