import { Button, SafeAreaView, Text } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { logout } from "../services/AuthService";

export default function HomeScreen({navigation}) {
    const { user, setUser } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
        setUser(null);
    }
    return (
        <SafeAreaView>
            <Text>Welcome home, {user.name}</Text>
            <Button title="Logout" onPress={handleLogout} />
            <Button title="Facts" onPress={() => navigation.navigate("FactsList")} />
                            <Button title="Facts Swipe" onPress={() => navigation.navigate("FactSwipe")} />
        </SafeAreaView>
    );
}