/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

type cityType = {
    name: string;
    stateId: number;
    shippingCost: number;
};
const addCity = (data: cityType) => {
    return request({ url: "/cities", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addCity);
};

export default UseMutate;
