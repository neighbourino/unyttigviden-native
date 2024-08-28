import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// theme + ui
import {
  Provider as PaperProvider
} from "react-native-paper";

import {
  NavigationContainer
} from "@react-navigation/native";

// services
import store, { persistor } from "./app/services/store";

import AuthNavigator from "./app/navigation/AuthNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.drawerContent}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider >
            <NavigationContainer >
              <AuthNavigator />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
});

export default App;
