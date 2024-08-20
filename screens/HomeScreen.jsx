import { Button, SafeAreaView, Text } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { logout } from "../services/AuthService";

export default function HomeScreen({ navigation }) {


  return (
    <SafeAreaView>
      
      <Button title="Facts" onPress={() => navigation.navigate("FactsList")} />
      <Button
        title="Facts Swipe"
        onPress={() => navigation.navigate("FactSwipe")}
      />
    </SafeAreaView>
  );
}
