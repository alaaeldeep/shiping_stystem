/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

const deleteRepresentative = (id: number) => {
    return request({ url: `/representatives/${id}`, method: "delete" });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteRepresentative, {
        onSuccess: () => {
            queryClient.invalidateQueries("/representatives");
        },
    });
};

export default UseMutate;
