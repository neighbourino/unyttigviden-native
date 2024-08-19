import { Text, View, TextInput, StyleSheet } from "react-native";

export default function FormTextField({label, errors = [], ...props}) {
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput style={styles.input}  autoCapitalize="none" {...props} />
            {errors.map((err) => {
                return (
                    <Text key={err} style={styles.error}>{err}</Text>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    },
    error:{
        color: 'red',
        fontWeight: 'bold'
    }
});