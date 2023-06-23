/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

type user = {
    userName: string;
    password: string;
};
const logIn = (data: user) => {
    return request({ url: "/Users/Login", method: "post", data: data });
};

const UseLogin = () => {
    return useMutation(logIn);
};

export default UseLogin;
