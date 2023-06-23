/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

const deletePermission = (id: string) => {
    return request({ url: `/RolesPrivileges/${id}`, method: "delete" });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(deletePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("/RolesPrivileges");
        },
    });
};

export default UseMutate;
