export type PermissionRow = {
    privilegeId: number;
    name: string;
};
export type PermissionGET = {
    id: string;
    roleName: string;
    addedDate: string;
    permissions: any;
};
export type RoleRow = {
    id: number;
    roleName: string;
    addedDate: string;
    permissions: any;
};
export type StateRow = {
    id: number;
    name: string;
    status: boolean;
};
export type WeightSettingRow = {
    id: number;
    defaultWeight: number;
    overCostPerKG: number;
    villageShipingCost: number;
};
export type BranchesRow = {
    id: number;
    name: string;
    date: string;
    status: boolean;
};
export type ShippingTypeRow = {
    id: number;
    name: string;
    cost: number;
};
export type ShippingTypePOST = {
    name: string;
    cost: number;
};

export type CityRow = {
    id: number;
    state: { id: number; name: string };
    name: string;
    shippingCost: number;
    status: boolean;
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
    id: string;
    userName: string;
    fullName: string;
    phoneNumber: string;
    branch: { id: number; name: string };
    email: string;
    role: { id: string; name: string };
    address: string;
    status: boolean;
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
export type OrderPut = {
    id: number;
    orderStatus: number;
    clientName: string;
    orderType: number;
    stateId: number;
    adressDetails: string;
    cityId: number;
    branchId: number;
    isVillage: boolean;
    shippingTypeId: number;
    phone1: string;
    phone2?: string;
    email: string;
    paymentType: number;
    orderCost: number;
    orderItem: {
        productName: string;
        productWeight: number;
        productQuantity: number;
    }[];
    traderId: string;
};
export type OrderRow = {
    clientName: string;
    phone1: string;
    phone2: string;
    email: string;
    orderType: number;
    orderStatus: number;
    paymentType: number;
    date: string;
    state: {
        id: number;
        name: string;
    };
    city: {
        id: number;
        name: string;
        stateId: number;
    };
    adressDetails: string;
    isVillage: boolean;
    branch: {
        id: number;
        name: string;
    };
    shippingType: {
        id: number;
        name: string;
        cost: number;
    };
    orderCost: number;
    totalCost: number;
    totalWeight: number;
    orderShipingCost: number;
    comments: string;
    orderItems: [
        {
            id: number;
            productName: string;
            productWeight: number;
            productQuantity: number;
            productPrice: number;
        },
        {
            id: 1;
            productName: string;
            productWeight: number;
            productQuantity: number;
            productPrice: number;
        }
    ];
    id: number;
    trader: { id: string; fullName: string; phoneNumber: string };
    representative?: { id: string; fullName: string };
};
export type ReportRow = {
    orderStatus: number;
    companyOrderRatio: number;
    paymentType: number;
    date: string;
    state: {
        id: number;
        name: string;
    };
    city: {
        id: number;
        name: string;
        stateId: number;
    };
    adressDetails: string;
    isVillage: boolean;
    branch: {
        id: number;
        name: string;
    };

    orderCost: number;
    totalCost: number;
    totalWeight: number;
    orderShipingCost: number;
    receivedCost: number;
    receivedShipingCost: number;
    comments: string;
    orderItems: [
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
            productPrice: number;
        }
    ];
    trader: { id: string; fullName: string; phoneNumber: string };
    clientName: string;
    representative?: { id: string; fullName: string };
    phone1: string;
    phone2: string;
    email: string;
    shippingType: {
        id: number;
        name: string;
        cost: number;
    };
    orderType: number;
    id: number;
};
export type Product = {
    productName: string;
    productQuantity: number;
    productWeight: number;

    id?: number | string;
};
export type TraderRow = {
    id: string;
    status: boolean;
    userName: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    storeName: string;
    city: { id: number; name: string };
    state: { id: number; name: string };
    branch: { id: number; name: string };
    rejectedOrderlossRatio: number;
    date: string;
    specialPackages: {
        city: string;
        state: string;
        shippingCost: number;
    }[];
    /*  specialPackages: {
        city: { id: number; name: string };
        state: { id: number; name: string };
        shippingCost: number;
        id: string;
    }[]; */
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
    status: boolean;
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
    id?: string;
};
export type RepresentativeUpdate = {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    branchId: number;
    states: { stateId: number }[];
    discountType: number;
    companyOrderRatio: number;
    id: string;
};
export type RepresentativeGET = {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    branch: { id: number; name: string };
    states: { id: number; state: string }[];
    discountType: number;
    companyOrderRatio: number;
    id: string;
    status: boolean;
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
export type TraderPostType = {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    storeName: string;
    branchId: number;
    cityId: number;
    rejectedOrderlossRatio: number;
    stateId: number;
    specialPackages: any[];
    id: string;
};
export type TraderPost = {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    storeName: string;
    branchId: number;
    cityId: number;
    rejectedOrderlossRatio: number;
    stateId: number;
    specialPackages: any[];
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
    city: { id: number; name: string };
    state: { id: number; name: string };
    shippingCost: number;
    id: string;
};
export type SpecialPackageGET = {
    city: string;
    state: string;
    shippingCost: number;
};
export type SpecialPackagePost = {
    city: string;
    state: string;
    shippingCost: number;
    id?: string;
};
export type SpecialPackageView = {
    city: string;
    state: string;
    shippingCost: number;
    id?: string;
};
