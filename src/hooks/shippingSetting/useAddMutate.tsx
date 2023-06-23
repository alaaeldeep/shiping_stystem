/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

/* type */
import { ShippingTypePOST } from "../../components/types";

const addShippingType = (data: ShippingTypePOST) => {
    return request({
        url: "/ShippingTypeSettings",
        method: "post",
        data: data,
    });
};

const UseMutate = () => {
    return useMutation(addShippingType);
};

export default UseMutate;
