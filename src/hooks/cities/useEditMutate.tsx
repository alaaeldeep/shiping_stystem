/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

type cityType = {
    stateId: number;
    name: string;
    shippingCost: number;
    id: number;
};
const updateCity = (data: cityType) => {
    return request({
        url: `/cities/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateCity, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Cities/GetCitiesWithShippingCost");
        },
    });
};

export default UseMutate;
