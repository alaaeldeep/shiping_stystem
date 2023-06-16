/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

/* types */
import { OrderPost } from "../../components/types";

const addOrder = (data: OrderPost) => {
    return request({ url: "/orders", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addOrder);
};

export default UseMutate;
