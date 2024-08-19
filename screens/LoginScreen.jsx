import {useState, useContext} from "react";
import { SafeAreaView, Text, View, TextInput, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "../components/FormTextField";
import {login, getUser} from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    async function handleLogin(){
        setErrors({});
        try {

            await login({
                email: email,
                password: password,
                device_id: `${Platform.OS} ${Platform.Version}`
            });


            const user = await getUser();
            setUser(user);
            
        } catch (e) {
            if (e.response?.status == 422) {
                setErrors(e.response.data.errors);
            }

            //console.log(e.response);
        }

        
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <FormTextField label="Email Address"  value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" errors={errors.email} />
                <FormTextField label="Password" secureTextEntry={true}  value={password} onChangeText={(text) => setPassword(text)} errors={errors.password} />
                    <Button title="Login" onPress={handleLogin} />
                    <Button title="Register" onPress={() => navigation.navigate("Register")} />
                        <Button title="Forgot Password" onPress={() => navigation.navigate("ForgotPassword")} />

            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    wrapper:{
        flex: 1, backgroundColor: 'white'
    },
    container: {
        padding: 20,
        rowGap: 20,
    }
});