/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";
import { useOwnStore } from "../../store";

const deleteBranch = (id: number) => {
    return request({ url: `/Branches/${id}`, method: "delete" });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    const BranchPageNumber = useOwnStore((store) => store.BranchPageNumber);
    return useMutation(deleteBranch, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `/Branches/paginate?pageNumber=${BranchPageNumber}&pageSize=5`
            );
        },
    });
};

export default UseMutate;
