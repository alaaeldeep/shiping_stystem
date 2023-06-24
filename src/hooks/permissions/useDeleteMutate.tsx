/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";
import { useOwnStore } from "../../store";

const deletePermission = (id: string) => {
    return request({ url: `/RolesPrivileges/${id}`, method: "delete" });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    const PreveligesPageNumber = useOwnStore(
        (store) => store.PreveligesPageNumber
    );
    return useMutation(deletePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `/RolesPrivileges/paginate?pageNumber=${PreveligesPageNumber}&pageSize=5`
            );
        },
    });
};

export default UseMutate;
