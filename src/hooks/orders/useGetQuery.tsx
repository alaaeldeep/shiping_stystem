/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useQuery } from "react-query";

/* store */
import { useOwnStore } from "../../store";

const fetch = (endpoint: string) => {
    return request({ url: endpoint });
};
const UseOrderQuery = (pageNumber: number) => {
    const userType = useOwnStore((store) => store.user.userType);
    let type: string;

    switch (userType) {
        case "Employee":
            type = "GetAllByEmployeeAsNoTrakingAsync";
            break;
        case "Trader":
            type = "GetAllByTraderIDAsNoTrakingAsync";
            break;
        case "Representative":
            type = "GetAllByRepresentativeIDAsNoTrakingAsync";
            break;
        default:
            type = "GetAllByRepresentativeIDAsNoTrakingAsync";
    }
    return useQuery([type, pageNumber], () =>
        fetch(`/Orders/${type}?pageNumber${pageNumber}`)
    );
};

export default UseOrderQuery;
