import { Button, SafeAreaView, Text } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { logout } from "../services/AuthService";

export default function LogoutScreen({navigation}) {
    const { user, setUser } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
        setUser(null);
        navigation.navigate("Home");
    }
    return (
        <SafeAreaView>
            <Button title="Logout" onPress={handleLogout} />     
        </SafeAreaView>
    );
}