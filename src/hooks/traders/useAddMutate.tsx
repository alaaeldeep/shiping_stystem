/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

/* types */
import { TraderType } from "../../components/types";

const addTrader = (data: TraderType) => {
    return request({ url: "/traders", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addTrader);
};

export default UseMutate;
