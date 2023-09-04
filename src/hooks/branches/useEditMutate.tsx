/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";
import { useOwnStore } from "../../store";

type branchType = {
    name: string;
    status: boolean;
    id: number;
};
const updateBranches = (data: branchType) => {
    return request({
        url: `/Branches/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    const BranchPageNumber = useOwnStore((store) => store.BranchPageNumber);

    return useMutation(updateBranches, {
        onSuccess: () => {
            queryClient.invalidateQueries("/activities");
            queryClient.invalidateQueries(
                `/Branches/paginate?pageNumber=${BranchPageNumber}&pageSize=5`
            );
        },
    });
};

export default UseMutate;
