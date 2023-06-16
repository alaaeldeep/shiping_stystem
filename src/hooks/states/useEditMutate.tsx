/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

type stateType = {
    state: string;
    id: number;
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
    return useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("/states");
        },
    });
};

export default UseMutate;
