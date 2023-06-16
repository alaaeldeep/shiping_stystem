import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    /* headers:{"":""} */
});

export const request = async ({ ...options }) => {
    const onSuccess = (response: any) => response;
    const onError = (error: any) => {
        console.log(error);
        throw new Error();
    };
    try {
        const response = await instance(options);
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
};
