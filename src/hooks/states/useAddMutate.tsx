/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

type stateType = {
    name: string;
};
const addState = (data: stateType) => {
    return request({ url: "/states", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addState);
};

export default UseMutate;
