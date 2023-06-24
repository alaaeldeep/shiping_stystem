import { Product } from "../components/types";
export const permissions = [
    { privilegeId: 1, name: "الصلاحيات" },
    { privilegeId: 2, name: "الاعدادات" },
    { privilegeId: 3, name: "البنوك" },
    { privilegeId: 4, name: "الخزن" },
    { privilegeId: 5, name: "الافرع" },
    { privilegeId: 6, name: "الموظفين" },
    { privilegeId: 7, name: "التجار" },
    { privilegeId: 8, name: "المناديب" },
    { privilegeId: 9, name: "المحافظات" },
    { privilegeId: 10, name: "المدن" },
    { privilegeId: 11, name: "الطلبات" },
    { privilegeId: 12, name: "الحسابات" },
    { privilegeId: 13, name: "تقارير الطلبات" },
];

export const statuses = [
    {
        orderStatus: "جديد",
        id: 0,
    },
    {
        orderStatus: "قيد الانتظار",
        id: 1,
    },
    {
        orderStatus: "تم التسليم للمندوب",
        id: 2,
    },
    {
        orderStatus: "تم التسليم",
        id: 3,
    },
    {
        orderStatus: "لا يمكن الوصول",
        id: 4,
    },
    {
        orderStatus: "تم التاجيل",
        id: 5,
    },
    {
        orderStatus: "تم التسليم جزئيا",
        id: 6,
    },
    {
        orderStatus: "تم الالغاء من قبل المستلم",
        id: 7,
    },
    {
        orderStatus: "تم الرفض مع الدفع",
        id: 8,
    },
    {
        orderStatus: "رفض مع سداد جزء",
        id: 9,
    },
    {
        orderStatus: "رفض ولم يتم الدفع",
        id: 10,
    },
];
export const RepresentativeHomeScreen = [
    {
        orderStatus: "تم التسليم للمندوب",
        id: 2,
    },
    {
        orderStatus: "تم التسليم",
        id: 3,
    },
    {
        orderStatus: "لا يمكن الوصول",
        id: 4,
    },
    {
        orderStatus: "تم التاجيل",
        id: 5,
    },
    {
        orderStatus: "تم التسليم جزئيا",
        id: 6,
    },
    {
        orderStatus: "تم الالغاء من قبل المستلم",
        id: 7,
    },
    {
        orderStatus: "تم الرفض مع الدفع",
        id: 8,
    },
    {
        orderStatus: "رفض مع سداد جزء",
        id: 9,
    },
    {
        orderStatus: "رفض ولم يتم الدفع",
        id: 10,
    },
];
export const RepresentativeStatusesOptions = [
    {
        orderStatus: "تم التسليم",
        id: 3,
    },
    {
        orderStatus: "لا يمكن الوصول",
        id: 4,
    },
    {
        orderStatus: "تم التاجيل",
        id: 5,
    },
    {
        orderStatus: "تم التسليم جزئيا",
        id: 6,
    },
    {
        orderStatus: "تم الالغاء من قبل المستلم",
        id: 7,
    },
    {
        orderStatus: "تم الرفض مع الدفع",
        id: 8,
    },
    {
        orderStatus: "رفض مع سداد جزء",
        id: 9,
    },
    {
        orderStatus: "رفض ولم يتم الدفع",
        id: 10,
    },
];
export const AdminStatusesOptions = [
    {
        orderStatus: "قيد الانتظار",
        id: 1,
    },
    {
        orderStatus: "تم الالغاء من قبل المستلم",
        id: 7,
    },
];

export const states: string[] = [
    "أسوان",
    "أسيوط",
    "الإسكندرية",
    "الإسماعيلية",
    "الأقصر",
    "البحر الاحمر",
    "البحيرة",
    "الجيزة",
    "الدقهلية",
    "السويس",
    "الشرقية",
    "الغربية",
    "الفيوم",
    "القاهرة",
    "القليوبية",
    "المنوفية",
    "المنيا",
    "الوادي الجديد",
    "بني سويف",
    "بور سعيد",
    "جنوب سيناء",
    "دمياط",
    "سوهاج",
    "شمال سيناء",
    "قنا",
    "كفر الشيخ",
    "مطروح",
];
export const convertIdToOrderStatus = (id: number) => {
    switch (id) {
        case 0:
            return "جديد";

        case 1:
            return "قيد الانتظار";

        case 2:
            return "تم التسليم للمندوب";

        case 3:
            return "تم التسليم";

        case 4:
            return "لا يمكن الوصول";

        case 5:
            return "تم التاجيل";

        case 6:
            return "تم التسليم جزئيا";

        case 7:
            return "تم الالغاء من قبل المستلم";

        case 8:
            return "تم الرفض مع الدفع";

        case 9:
            return "رفض مع سداد جزء";

        case 10:
            return "رفض ولم يتم الدفع";
    }
};
export const convertOrderStatusToId = (status: string) => {
    switch (status) {
        case "جديد":
            return 0;

        case "قيد الانتظار":
            return 1;

        case "تم التسليم للمندوب":
            return 2;

        case "تم التسليم":
            return 3;

        case "لا يمكن الوصول":
            return 4;

        case "تم التاجيل":
            return 5;

        case "تم التسليم جزئيا":
            return 6;

        case "تم الالغاء من قبل المستلم":
            return 7;

        case "تم الرفض مع الدفع":
            return 8;

        case "رفض مع سداد جزء":
            return 9;

        case "رفض ولم يتم الدفع":
            return 10;
    }
};
export const convertBranchToID = (branches: any, branch: string) => {
    let BranchId!: number;
    branches?.data.forEach((branchObj: { id: number; branch: string }) => {
        if (branchObj.branch === branch) {
            BranchId = branchObj.id;
        }
    });
    return BranchId;
};

export const convertStateToID = (states: any, state: string) => {
    let stateId!: number;
    states?.data.forEach((stateObj: { id: number; name: string }) => {
        if (stateObj.name === state) {
            stateId = stateObj.id;
        }
    });
    return stateId;
};
export const convertShippingTypeToID = (typesOfShipping: any, type: string) => {
    let shippingTypeId!: number;
    typesOfShipping?.data.forEach(
        (shippingTypeObj: { id: number; type: string }) => {
            if (shippingTypeObj.type === type) {
                shippingTypeId = shippingTypeObj.id;
            }
        }
    );
    return shippingTypeId;
};
export const convertCityToID = (cities: any, city: string) => {
    let cityId!: number;
    cities?.data.forEach((cityObj: { id: number; name: string }) => {
        if (cityObj.name === city) {
            cityId = cityObj.id;
        }
    });
    return cityId;
};
export const convertRoleToID = (roles: any, role: string) => {
    let roleId;
    roles?.data.forEach((roleObj: { id: number; roleName: string }) => {
        if (roleObj.roleName === role) {
            roleId = roleObj.id;
        }
    });
    return roleId;
};
export const convertOrderItems = (products: Product[]) => {
    return products.map((product: Product) => {
        return {
            productName: product.productName,
            productWeight: Number(product.productWeight),
            productQuantity: Number(product.productQuantity),
        };
    });
};

/* permissions */
export const convertIdToPermission = (privilegeId: number) => {
    let name!: string;
    permissions.forEach(
        (privilegeObj: { privilegeId: number; name: string }) => {
            if (privilegeObj.privilegeId === privilegeId) {
                name = privilegeObj.name;
            }
        }
    );
    return name;
};
export const convertPermissionToID = (privilege: string) => {
    let privilegeId!: number;
    permissions.forEach(
        (privilegeObj: { privilegeId: number; name: string }) => {
            if (privilegeObj.name === privilege) {
                privilegeId = privilegeObj.privilegeId;
            }
        }
    );
    return privilegeId;
};
export const convertIDToCities = (cities: any, citiesId: string) => {
    let privilegeName!: string;
    cities?.data.forEach((cityObj: { id: number; name: string }) => {
        if (cityObj.id === +citiesId) {
            privilegeName = cityObj.name;
        }
    });
    return privilegeName;
};
export const convertIDToStates = (states: any, stateId: string) => {
    let stateName!: string;
    states?.data.forEach((cityObj: { id: number; name: string }) => {
        if (cityObj.id === +stateId) {
            stateName = cityObj.name;
        }
    });
    return stateName;
};
