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
    { privilegeId: 9, name: "الاعدادات" },
    { privilegeId: 10, name: "المدن" },
    { privilegeId: 11, name: "الطلبات" },
    { privilegeId: 12, name: "الحسابات" },
    { privilegeId: 13, name: "تقارير الطلبات" },
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
export const convertCityToID = (cities2: any, city: string) => {
    let cityId!: number;
    cities2?.data.forEach((cityObj: { id: number; city: string }) => {
        if (cityObj.city === city) {
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
