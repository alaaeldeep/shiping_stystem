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
    branchId: number;
    phoneNumber: string;
    address: string;
    id: string;
};

const updatePermission = (data: NewEmployee) => {
    return request({
        url: `/Employees/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(updatePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Employees");
        },
    });
};

export default UseMutate;

/* update status */
type EmployeeStatus = { id: string; status: boolean };
const updateStatusEmployee = (data: EmployeeStatus) => {
    return request({
        url: `/Employees/status/${data.id}`,
        method: "put",
        data: data,
    });
};
export const UseMutateStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(updateStatusEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Employees");
        },
    });
};
