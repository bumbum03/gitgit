import Axios from "axios";
import jwtService from "../core/services/JwtService";
import { formDataToObject } from "./utils";

const axios = Axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    transformRequest: Axios.defaults.transformRequest
});

axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = "Bearer" + jwtService.getToken()
    config.headers['Accept'] = "application/json"

    return config;
})

axios.interceptors.response.use((response) => {
    if(response.data == null) {
        return Promise.reject({
            error: "Error",
            message: "Error",
        });
    }
    if (response.data.code == "0") {
        return Promise.reject({
            error: "Error",
            message: response.data.msg,
        });
    }

    return response;
})

export default axios;