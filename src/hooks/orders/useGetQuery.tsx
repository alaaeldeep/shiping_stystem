/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useQuery } from "react-query";

/* store */
import { useOwnStore } from "../../store";
import { convertOrderStatusToId } from "../../utils/converter";

const fetch = (endpoint: string) => {
    return request({ url: endpoint });
};
const UseOrderQuery = (pageNumber: number, orderStatus: string | undefined) => {
    const userType = useOwnStore((store) => store.user.userType);
    const userId = useOwnStore((store) => store.user.userId);
    let type: string;

    switch (userType) {
        case "Employee":
            type = orderStatus
                ? `GetAllByEmployeeWithStatusAsNoTrakingAsync?orderStatus=${convertOrderStatusToId(
                      orderStatus
                  )}&`
                : "GetAllByEmployeeAsNoTrakingAsync?";
            break;

        case "Trader":
            type = orderStatus
                ? `GetAllByTraderIDWithStatusAsNoTrakingAsync?orderStatus=${convertOrderStatusToId(
                      orderStatus
                  )}&TraderID=${userId}&`
                : `GetAllByTraderIDAsNoTrakingAsync?TraderID=${userId}&`;
            break;
        case "Representative":
            type = orderStatus
                ? `GetAllByRepresentativeIDWithStatusAsNoTrakingAsync?RepresentativeID=${userId}&orderStatus=${convertOrderStatusToId(
                      orderStatus
                  )}&`
                : `GetAllByRepresentativeIDAsNoTrakingAsync?RepresentativeID=${userId}&`;
            break;
        default:
            type = orderStatus
                ? `GetAllByRepresentativeIDWithStatusAsNoTrakingAsync?RepresentativeID=${userId}&orderStatus=${convertOrderStatusToId(
                      orderStatus
                  )}&`
                : `GetAllByRepresentativeIDAsNoTrakingAsync?RepresentativeID=${userId}&`;
    }

    return useQuery([type, pageNumber], () =>
        fetch(`/Orders/${type}pageNumber=${pageNumber}`)
    );
};

export default UseOrderQuery;
