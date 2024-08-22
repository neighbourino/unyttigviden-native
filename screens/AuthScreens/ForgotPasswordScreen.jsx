import {useState, useContext} from "react";
import { SafeAreaView, Text, View, TextInput, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "../components/FormTextField";
import {sendPasswordResetLink} from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [resetStatus, setResetStatus] = useState("");

    async function handleForgotPassword(){
        setErrors({});

        try {
            const status = await sendPasswordResetLink(email);
            setResetStatus(status);
            
        } catch (e) {

            if (e.response?.status == 422) {
                setErrors(e.response.data.errors);
            }
        }

        
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                {resetStatus && <Text style={styles.resetStatus}>{resetStatus}</Text>}
                <FormTextField label="Email Address"  value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" errors={errors.email} />
                    <Button title="E-mail reset password link" onPress={handleForgotPassword} />

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
    },
    resetStatus: {
        marginBottom: 10,
        color: 'green'
    }
});