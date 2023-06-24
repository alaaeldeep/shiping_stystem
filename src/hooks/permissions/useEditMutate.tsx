/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";
import { useOwnStore } from "../../store";

type permissionType = {
    roleName: string;
    rolePrivileges: any;
    roleId: string;
};
const updatePermission = (data: permissionType) => {
    return request({
        url: `/RolesPrivileges/${data.roleId}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    const PreveligesPageNumber = useOwnStore(
        (store) => store.PreveligesPageNumber
    );
    return useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `/RolesPrivileges/paginate?pageNumber=${PreveligesPageNumber}&pageSize=5`
            );
        },
    });
};

export default UseMutate;
