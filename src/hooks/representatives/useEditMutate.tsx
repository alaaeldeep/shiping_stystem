/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* types */
import { RepresentativeUpdate } from "../../components/types";
import { useOwnStore } from "../../store";

const updateRepresentative = (data: RepresentativeUpdate) => {
    return request({
        url: `/representatives/${data.id}`,
        method: "put",
        data: data,
    });
};
const UseMutate = () => {
    const queryClient = useQueryClient();
    const RepresentativesPageNumber = useOwnStore(
        (store) => store.RepresentativesPageNumber
    );
    return useMutation(updateRepresentative, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `/Representatives/paginate?pageNumber=${RepresentativesPageNumber}&pageSize=5`
            );
        },
    });
};
export default UseMutate;

/* update status */
type RepresentativeStatus = { id: string; status: boolean };
const updateStatusRepresentative = (data: RepresentativeStatus) => {
    return request({
        url: `/representatives/status/${data.id}`,
        method: "put",
        data: data,
    });
};
export const UseMutateStatus = () => {
    const RepresentativesPageNumber = useOwnStore(
        (store) => store.RepresentativesPageNumber
    );
    const queryClient = useQueryClient();
    return useMutation(updateStatusRepresentative, {
        onSuccess: () => {
            queryClient.invalidateQueries(
                `/Representatives/paginate?pageNumber=${RepresentativesPageNumber}&pageSize=5`
            );
        },
    });
};
