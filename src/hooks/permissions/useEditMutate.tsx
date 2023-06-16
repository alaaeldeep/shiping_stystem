/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

type permissionType = {
    roleName: string;
    rolePrivileges: any;
    roleId: number;
};
const updatePermission = (data: permissionType) => {
    return request({
        url: `/permissions/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("/permissions");
        },
    });
};

export default UseMutate;
