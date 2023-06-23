/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* types */
import { RepresentativeUpdate } from "../../components/types";

const updateRepresentative = (data: RepresentativeUpdate) => {
    return request({
        url: `/representatives/${data.id}`,
        method: "put",
        data: data,
    });
};
const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateRepresentative, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Representatives");
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
    const queryClient = useQueryClient();
    return useMutation(updateStatusRepresentative, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Representatives");
        },
    });
};
