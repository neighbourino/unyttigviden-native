import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, Button, ActivityIndicator, useTheme } from 'react-native-paper';

const SettingsScreen = () => {
 
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

export default SettingsScreen;
