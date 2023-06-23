/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

type branchType = {
    name: string;
};
const addBranch = (data: branchType) => {
    return request({ url: "/Branches", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addBranch);
};

export default UseMutate;
