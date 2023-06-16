/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

type NewEmployee = {
    roleId: string;
    fullName: string;
    userName: string;
    email: string;
    password: string;
    branchId: string;
    phoneNumber: string;
    address: string;
    id: number;
};

const updatePermission = (data: NewEmployee) => {
    return request({
        url: `/employees/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("/employees");
        },
    });
};

export default UseMutate;
