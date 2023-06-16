/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

const deleteState = (id: number) => {
    return request({ url: `/states/${id}`, method: "delete" });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteState, {
        onSuccess: () => {
            queryClient.invalidateQueries("/states");
        },
    });
};

export default UseMutate;
