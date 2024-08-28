import React from 'react';
import {
  useTheme,
  Appbar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ScreenAppbar = ({ title }) => {
  const theme = useTheme();
    const navigation = useNavigation();

  return (
    <Appbar.Header style={{ borderBottomColor: theme.colors.tertiary, borderBottomWidth: 0.25 }}>
        {/* Custom Drawer Icon */}
        <Appbar.Action
          icon="menu" // Replace with your custom icon name
          color={theme.colors.accent} // Custom color for the icon
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={title} />
        
      </Appbar.Header>
  );
};

export default ScreenAppbar;