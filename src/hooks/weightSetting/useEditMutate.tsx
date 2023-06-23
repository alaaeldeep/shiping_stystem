/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useMutation, useQueryClient } from "react-query";

type WeightSettingType = {
    defaultWeight: number;
    villageShipingCost: number;
    overCostPerKG: number;
    id: number;
};
const WeightSetting = (data: WeightSettingType) => {
    return request({
        url: `/Settings/${data.id}`,
        method: "put",
        data: data,
    });
};

const UseMutate = () => {
    const queryClient = useQueryClient();
    return useMutation(WeightSetting, {
        onSuccess: () => {
            queryClient.invalidateQueries("/Settings");
        },
    });
};

export default UseMutate;
