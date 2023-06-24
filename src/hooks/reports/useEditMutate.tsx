/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* types */
import { OrderPut } from "../../components/types";

const updateOrder = (data: OrderPut) => {
    return request({
        url: `/Orders/UpdateAllOrder`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries("/orders");
        },
    });
};

export default UseMutate;

/* update status Order*/
type OrderStatus = { id: number; orderStatus: number };
const updateStatusOrder = (data: OrderStatus) => {
    return request({
        url: `/Orders/UpdateStatusOnlyByEmployee`,
        method: "put",
        data: data,
    });
};
export const UseMutateStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(updateStatusOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Employees");
        },
    });
};
/* assign Order to representative*/
type assignOrderToRepresentative = { id: number; representativeID: string };
const assignOrderToRepresentative = (data: assignOrderToRepresentative) => {
    return request({
        url: `/Orders/UpdateStatusGiveRepresentative`,
        method: "put",
        data: data,
    });
};
export const UseMutateOrderAssign = () => {
    const queryClient = useQueryClient();
    return useMutation(assignOrderToRepresentative, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Employees");
        },
    });
};
