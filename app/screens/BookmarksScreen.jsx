import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import ScreenAppbar from '../components/ScreenAppbar';

const BookmarksScreen = () => {
 
  return (
    <View style={styles.container}>
      <ScreenAppbar title="Bogmærker" />
      <Text>Bogmærker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});

export default BookmarksScreen;
