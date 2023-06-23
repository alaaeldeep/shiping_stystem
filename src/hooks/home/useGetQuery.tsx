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
    let type: string;

    switch (userType) {
        case "Employee":
            type = "GetAllByEmployeeGroupByStatusAsync";
            break;
        case "Trader":
            type = "GetAllByTraderIDGroupByStatusAsync";
            break;
        case "Representative":
            type = "GetAllByRepresentativeIDGroupByStatusAsync";
            break;
        default:
            type = "GetAllByRepresentativeIDAsNoTrakingAsync";
    }
    return useQuery([type], () => fetch(`/Orders/${type}`));
};

export default UseOrderSummeryQuery;
