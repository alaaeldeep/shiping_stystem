/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useQuery } from "react-query";

/* store */
import { useOwnStore } from "../../store";

const fetch = (endpoint: string) => {
    return request({ url: endpoint });
};
const UseOrderSummeryQuery = () => {
    const userType = useOwnStore((store) => store.user.userType);
    const userId = useOwnStore((store) => store.user.userId);
    let type: string;

    switch (userType) {
        case "Employee":
            type = "GetAllByEmployeeGroupByStatusAsync";
            break;
        case "Trader":
            type = `GetAllByTraderIDGroupByStatusAsync?TraderID=${userId}`;
            break;
        case "Representative":
            type = `GetAllByRepresentativeIDGroupByStatusAsync?RepresentativeID=${userId}`;
            break;
        default:
            type = `GetAllByRepresentativeIDAsNoTrakingAsync?RepresentativeID=${userId}`;
    }
    return useQuery([type], () => fetch(`/Orders/${type}`));
};

export default UseOrderSummeryQuery;
