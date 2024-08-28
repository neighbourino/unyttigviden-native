import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Headline,
  HelperText,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { forgotPassword } from "../services/api";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [emailSent, setEmailSent] = useState(false);
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    setErrors({});

    try {
      const response = await forgotPassword(email);

      setEmailSent(true);
      setMessage("A password reset link has been sent to your email.");
    } catch (err) {
      if (err.response?.status == 422) {
        setErrors(err.response.data.errors);
      } else {
        setError(
          "Failed to send password reset email: " +
            (err.response?.data?.message || err.message)
        );
      }
    } finally {
      setLoading(false);

      setTimeout(() => {
        setEmailSent(false);
        setEmail("");
      }, 1000);
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
          Forgot Password?
        </Headline>
      </View>

      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          disabled={emailSent}
        />
        <HelperText type="error" visible={errors.email}>
          {errors.email}
        </HelperText>
        <Button
          mode="contained"
          onPress={handleForgotPassword}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Send Reset Link
        </Button>
        {message && (
          <Text style={{ color: theme.colors.primary, padding: 20 }}>
            {message}
          </Text>
        )}
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
          Suddenly Remembered?
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

export default ForgotPasswordScreen;
