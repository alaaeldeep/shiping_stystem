/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* types */
import { RepresentativeType } from "../../components/types";

type RepresentativeID = {
    id: number;
};
const updateRepresentative = (data: RepresentativeType & RepresentativeID) => {
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
            queryClient.invalidateQueries("/representatives");
        },
    });
};

export default UseMutate;
