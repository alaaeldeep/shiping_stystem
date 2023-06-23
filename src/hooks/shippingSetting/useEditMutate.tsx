/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* type */
import { ShippingTypeRow } from "../../components/types";

const updateShippingTypeSetting = (data: ShippingTypeRow) => {
    return request({
        url: `/ShippingTypeSettings/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateShippingTypeSetting, {
        onSuccess: () => {
            queryClient.invalidateQueries("/ShippingTypeSettings");
        },
    });
};

export default UseMutate;
