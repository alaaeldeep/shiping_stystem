/* axios utils */
import { request } from "../../lib/axios.utls";

/* router */
import { useNavigate } from "react-router";

/* react query */
import { useMutation, useQueryClient } from "react-query";

/* types */
import { OrderPut } from "../../components/types";

/* store */
import { useOwnStore } from "../../store";

/* update all order */
const updateOrder = (data: OrderPut) => {
    return request({
        url: `/Orders/UpdateAllOrder`,
        method: "put",
        data: data,
    });
};
const UseMutate = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(updateOrder, {
        onSuccess: () => {
            navigate("/");
        },
    });
};
export default UseMutate;

///////////////////////////////////////////////////////////////
/* update status Order*/
type OrderStatus = {
    id: number;
    orderStatus: number;
    userType: string;
    receivedShippingCost?: number;
    receivedCost?: number;
};
const updateStatusOrder = (data: OrderStatus) => {
    let type: string;
    let requestData: {
        id: number;
        orderStatus: number;
        receivedShippingCost?: number;
        receivedCost?: number;
    };
    switch (data.userType) {
        case "Employee":
            type = "UpdateStatusOnlyByEmployee";
            requestData = { id: data.id, orderStatus: data.orderStatus };
            break;

        case "Representative":
            type = [3, 6, 8, 9].includes(data.orderStatus)
                ? "UpdateStatusAndRecievedCost"
                : "UpdateStatusOnlyByRepresentative";

            requestData = [3, 6, 8, 9].includes(data.orderStatus)
                ? {
                      id: data.id,
                      orderStatus: data.orderStatus,
                      receivedCost: data.receivedCost,
                      receivedShippingCost: data.receivedShippingCost,
                  }
                : {
                      id: data.id,
                      orderStatus: data.orderStatus,
                  };
            break;
        default:
            type = "UpdateStatusOnlyByEmployee";
            requestData = { id: data.id, orderStatus: data.orderStatus };
    }
    return request({
        url: `/Orders/${type}`,
        method: "put",
        data: requestData,
    });
};
export const UseMutateStatus = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(updateStatusOrder, {
        onSuccess: () => {
            navigate("/");
        },
    });
};

///////////////////////////////////////////////////////////////
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
    const navigate = useNavigate();
    return useMutation(assignOrderToRepresentative, {
        onSuccess: () => {
            navigate("/");
        },
    });
};
