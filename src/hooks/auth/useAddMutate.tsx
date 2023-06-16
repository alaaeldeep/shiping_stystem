/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

type user = {
    userName: string;
    password: string;
};
const logIn = (data: user) => {
    return request({ url: "/api/Users/Login", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(logIn);
};

export default UseMutate;
