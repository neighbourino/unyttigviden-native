import  * as SecureStore from "expo-secure-store";

let access_token = null;

export async function setAccessToken(newToken) {
    access_token = newToken;

    if (access_token !== null) {
        await SecureStore.setItemAsync("access_token", access_token);
        
    }else{
        await SecureStore.deleteItemAsync("access_token");
    }
    

    return access_token;
}

export async function getAccessToken() {

    if (access_token !== null) {
        return access_token;
    }

    access_token = await SecureStore.getItemAsync("access_token");
    return access_token;
}