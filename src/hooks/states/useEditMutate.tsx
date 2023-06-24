/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";
import { useOwnStore } from "../../store";

type stateType = {
    name: string;
    id: number;
    status: boolean;
};
const updatePermission = (data: stateType) => {
    return request({
        url: `/states/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    const StatesPageNumber = useOwnStore((store) => store.StatesPageNumber);
    return useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `/states/paginate?pageNumber=${StatesPageNumber}&pageSize=5`
            );
        },
    });
};

export default UseMutate;
