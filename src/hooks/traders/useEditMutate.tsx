/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* types */
import { TraderPostType } from "../../components/types";

type TraderID = {
    id: string;
};
const updateTrader = (data: TraderPostType & TraderID) => {
    return request({
        url: `/Traders/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateTrader, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Traders");
        },
    });
};

export default UseMutate;
/* update status */
type TraderStatus = { id: string; status: boolean };
const updateStatusTrader = (data: TraderStatus) => {
    return request({
        url: `/Traders/status/${data.id}`,
        method: "put",
        data: data,
    });
};
export const UseMutateStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(updateStatusTrader, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Traders");
        },
    });
};
