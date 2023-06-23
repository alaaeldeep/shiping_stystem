/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

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
    return useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("/states");
        },
    });
};

export default UseMutate;
