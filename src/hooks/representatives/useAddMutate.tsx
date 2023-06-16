/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

/* types */
import { RepresentativeType } from "../../components/types";

const addRepresentative = (data: RepresentativeType) => {
    return request({ url: "/representatives", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addRepresentative);
};

export default UseMutate;
