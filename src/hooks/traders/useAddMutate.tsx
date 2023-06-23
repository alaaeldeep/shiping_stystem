/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

/* types */
import { TraderPost } from "../../components/types";

const addTrader = (data: TraderPost) => {
    return request({ url: "/traders", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addTrader);
};

export default UseMutate;
