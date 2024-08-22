import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import store from './services/store';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import FactsScreen from './screens/FactsScreen';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const AuthNavigator = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <Drawer.Navigator initialRouteName={token ? 'Home' : 'Login'}>
      {token ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Facts" component={FactsScreen} />
        </>
      ) : (
        <Drawer.Screen name="Login" component={LoginScreen} />
      )}
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
