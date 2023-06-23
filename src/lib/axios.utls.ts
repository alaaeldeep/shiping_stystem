import axios from "axios";

const instance = axios.create({
    /*  baseURL: "http://localhost:3000", */
    baseURL: "https://localhost:7157/api",
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const token: any = JSON.parse(localStorage.getItem("store")!)?.state.user.token;

export const request = async ({ ...options }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;

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
