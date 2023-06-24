/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";
import { useOwnStore } from "../../store";

type cityType = {
    stateId: number;
    name: string;
    shippingCost: number;
    id: number;
    status: boolean;
};
const updateCity = (data: cityType) => {
    return request({
        url: `/cities/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const CitiesPageNumber = useOwnStore((store) => store.CitiesPageNumber);
    const queryClient = useQueryClient();
    return useMutation(updateCity, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `Cities/paginate?pageNumber=${CitiesPageNumber}&pageSize=5`
            );
        },
    });
};

export default UseMutate;
