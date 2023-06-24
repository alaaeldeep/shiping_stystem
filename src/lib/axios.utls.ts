import axios from "axios";
import { useOwnStore } from "../store";

const instance = axios.create({
    /*  baseURL: "http://localhost:3000", */
    baseURL: "https://localhost:7157/api",
});
instance.interceptors.request.use((config) => {
    const token = useOwnStore.getState().user.token;
    // config.headers = { Authorization: `Bearer ${token}` };
    config.headers["Authorization"] = "Bearer " + token;
    return config;
});

export const request = async ({ ...options }) => {
    //  instance.defaults.headers.common.Authorization = `Bearer ${token}`;

    const onSuccess = (response: any) => response;

    const onError = (error: any) => {
        console.log(error.response.data);
        console.log(error);
        throw new Error(error.response.data);
    };
    try {
        const response = await instance(options);
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
};
