import axios from "../utils/axios";
import { setAccessToken } from "./TokenService";

export async function login(credentials) {
    const { data } = await axios.post("/login", credentials);
    
    await setAccessToken(data.access_token);
    
}

export async function register(credentials) {
    const {data} = await axios.post("/register", credentials);
    
    await setAccessToken(data.access_token);
}  

export async function logout() {

    const response = await axios.post("/logout");

    await setAccessToken(null);
}

export async function getUser() {

    const {data: user} = await axios.get("/user");

    return user;
}

export async function sendPasswordResetLink(email) {
    const {data} = await axios.post("/forgot-password", {email});
    return data.status;
}