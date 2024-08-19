import axiosLib from "axios";
import { getAccessToken } from "../services/TokenService";



const axios = axiosLib.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

axios.interceptors.request.use(async config => {
    const access_token = await getAccessToken();

    if(access_token !== null) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
});

export default axios;