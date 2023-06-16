/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

const deleteBranch = (id: number) => {
    return request({ url: `/branches/${id}`, method: "delete" });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteBranch, {
        onSuccess: () => {
            queryClient.invalidateQueries("/branches");
        },
    });
};

export default UseMutate;
