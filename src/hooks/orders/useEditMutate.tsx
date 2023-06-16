/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* types */
import { OrderPost } from "../../components/types";

const updateOrder = (data: OrderPost) => {
    return request({
        url: `/orders/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries("/orders");
        },
    });
};

export default UseMutate;
