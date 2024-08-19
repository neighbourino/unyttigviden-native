import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import FactListScreen from "./screens/FactListScreen";
import AuthContext from './contexts/AuthContext';
import FactSwipeScreen from "./screens/FactSwipeScreen";
import { getUser } from './services/AuthService';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function runEffect() {
      try {
          const user = await getUser();
          setUser(user);
      } catch (e) {
        console.log('Failed to get user', e);
      }
    
      setStatus("idle");
    
    }


    runEffect();

  }, []);

  if (status === "loading") {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="FactsList" component={FactListScreen} />
                        <Stack.Screen name="FactSwipe" component={FactSwipeScreen} />
            </>
          ) : (
            <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

            </>
            
          )}
          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}