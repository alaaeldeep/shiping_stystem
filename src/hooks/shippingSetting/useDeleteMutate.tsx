/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

const deleteShippingTypeSetting = (id: number) => {
    return request({
        url: `/ShippingTypeSettings/${id}`,
        method: "delete",
        data: id,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteShippingTypeSetting, {
        onSuccess: () => {
            queryClient.invalidateQueries("/ShippingTypeSettings");
        },
    });
};

export default UseMutate;
