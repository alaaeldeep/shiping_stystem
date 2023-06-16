/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

const deletePermission = (id: number) => {
    return request({ url: `/permissions/${id}`, method: "delete" });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(deletePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("/permissions");
        },
    });
};

export default UseMutate;
