export type PermissionRow = {
    privilegeId: number;
    name: string;
};
export type PermissionGET = {
    id: number;
    roleName: string;
    addedDate: string;
    rolePrivileges: any;
};
export type RoleRow = {
    id: number;
    roleName: string;
    addedDate: string;
    permissions: any;
};
export type StateRow = {
    id: number;
    state: string;
};
export type BranchesRow = {
    id: number;
    branch: string;
    addedDate: string;
};
export type CityRow = {
    id: number;
    state: string;
    city: string;
    shippingCost: number;
};
export type EmployeeRow = {
    id: number;
    userName: string;
    fullName: string;
    phoneNumber: string;
    branch: string;
    email: string;
    role: string;
    address: string;
};
export type EmployeeGET = {
    id: number;
    userName: string;
    fullName: string;
    phoneNumber: string;
    branch: { id: number; branch: string };
    email: string;
    role: { id: number; role: string };
    address: string;
};
export type OrderPost = {
    id: number;
    OrderStatus: number;
    ClientName: string;
    OrderType: number;
    StateId: number;
    AdressDetails: string;
    CityId: number;
    BranchId: number;
    IsVillage: boolean;
    ShippingTypeId: number;
    Phone1: string;
    Phone2?: string;
    Email: string;
    PaymentType: number;
    OrderCost: number;
    OrderItem: {
        productName: string;
        productWeight: number;
        productQuantity: number;
    }[];
};
export type OrderRow = {
    ClientName: string;
    Phone1: string;
    Phone2: string;
    Email: string;
    OrderType: number;
    OrderStatus: number;
    PaymentType: number;
    addedDate: string;
    StateId: {
        id: number;
        state: string;
    };
    CityId: {
        id: number;
        city: string;
    };
    AdressDetails: string;
    IsVillage: number;
    BranchId: {
        id: number;
        branch: string;
    };
    ShippingTypeId: {
        id: number;
        type: string;
    };
    OrderCost: number;
    comments: string;
    OrderItem: [
        {
            id: number;
            productName: string;
            productWeight: number;
            productQuantity: number;
        },
        {
            id: 1;
            productName: string;
            productWeight: number;
            productQuantity: number;
        }
    ];
    id: number;
};
export type Product = {
    productName: string;
    productQuantity: number;
    productWeight: number;
    id?: number | string;
};
export type TraderRow = {
    id: number;
    userName: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    storeName: string;
    city: string;
    state: string;
    branch: string;
    rejectionOrderlossRatio: string;
};
export type RepresentativeRow = {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    branch: { id: number; branch: string };
    states: { id: number; state: string }[];
    discountType: "0" | "1";
    companyOrderRatio: string;
};
export type RepresentativeType = {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    branchId: number;
    statesId: number[];
    discountType: number;
    companyOrderRatio: number;
};
export type RepresentativeGET = {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    branch: { id: number; name: string };
    states: { id: number; name: string }[];
    discountType: number;
    companyOrderRatio: number;
    id: number;
};
export type TraderType = {
    traderData: {
        userName: string;
        fullName: string;
        email: string;
        password: string;
        phoneNumber: string;
        address: string;
        storeName: string;
        branchId: number;
        cityId: number;
        rejectionOrderLossRatio: string;
        stateId: number;
    };
    SpecialPackage: any[];
};
export type PermissionData = {
    id: number;
    permissionName?: string;
    addedDate?: string;
    settings?: any;
    add?: any;
    view?: any;
    delete?: any;
    edit?: any;
};
export type Data = {
    id: number;
    name?: string;
    permissionName?: string;
    addedDate?: string;
    settings?: any;
    phone?: string;
    branch?: string;
    email?: string;
    role?: string;
    add?: any;
    view?: any;
    delete?: any;
    edit?: any;
    status?: string;
};
export type HeadCell = {
    id: keyof Data;
    label: string;
};
export type SpecialPackage = {
    state: string;
    city: string;
    shippingCost: string;
    id: string;
};
