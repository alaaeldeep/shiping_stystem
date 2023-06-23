/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useQuery } from "react-query";

const fetch = (endpoint: string) => {
    return request({ url: endpoint });
};
const UseQuery = (endpoint: string) => {
    return useQuery(endpoint, () => fetch(endpoint));
};

export default UseQuery;
