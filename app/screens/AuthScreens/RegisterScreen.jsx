import {useState, useContext} from "react";
import { SafeAreaView, Text, View, TextInput, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "../components/FormTextField";
import {login, getUser, register} from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function RegisterScreen() {
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState({});

    async function handleRegister({navigation}){
        setErrors({});
        try {

            await register({
                email: email,
                password: password,
                name: name,
                password_confirmation: passwordConfirmation,
                device_id: `${Platform.OS} ${Platform.Version}`
            });


            const user = await getUser();
            setUser(user);

            navigation.replace("Home");
            
            
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
                <FormTextField label="Name"  value={name} onChangeText={(text) => setName(text)} errors={errors.name} />
                <FormTextField label="Email Address"  value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" errors={errors.email} />
                <FormTextField label="Password" secureTextEntry={false}  value={password} onChangeText={(text) => setPassword(text)} errors={errors.password} />
                    <FormTextField label="Confirm Password" secureTextEntry={false}  value={passwordConfirmation} onChangeText={(text) => setPasswordConfirmation(text)} errors={errors.password_confirmation} />
                    <Button title="Login" onPress={handleRegister} />
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