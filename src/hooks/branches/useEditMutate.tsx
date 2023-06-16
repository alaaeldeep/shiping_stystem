/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

type branchType = {
    branch: string;
    id: number;
};
const updateBranches = (data: branchType) => {
    return request({
        url: `/branches/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateBranches, {
        onSuccess: () => {
            queryClient.invalidateQueries("/branches");
        },
    });
};

export default UseMutate;
