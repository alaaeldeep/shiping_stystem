/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation } from "react-query";

type NewEmployee = {
    roleId: string;
    fullName: string;
    userName: string;
    email: string;
    password: string;
    branchId: number;
    phoneNumber: string;
    address: string;
};
const addEmployee = (data: NewEmployee) => {
    return request({ url: "/Employees", method: "post", data: data });
};

const UseMutate = () => {
    return useMutation(addEmployee);
};

export default UseMutate;
