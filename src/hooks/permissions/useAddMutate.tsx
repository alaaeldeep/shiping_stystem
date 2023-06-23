/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

type permissionType = {
    roleName: string;
    rolePrivileges: any;
};
const addPermission = (data: permissionType) => {
    return request({ url: "/RolesPrivileges", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addPermission);
};

export default UseMutate;
