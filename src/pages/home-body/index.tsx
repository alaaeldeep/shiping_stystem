/* MUI */
import { Grid } from "@mui/material";

/* react query */
import UseOrderSummeryQuery from "../../hooks/home/useGetQuery";

/* components */
import Card from "./card";
import {
    RepresentativeHomeScreen,
    convertIdToOrderStatus,
} from "../../utils/converter";

/* store */
import { useOwnStore } from "../../store";

const statuses = [
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
        orderStatus: "رفض مع سداد الجزاء",
        id: 9,
    },
    {
        orderStatus: "رفض ولم يتم الدفع",
        id: 10,
    },
];

const HomeMainContent = () => {
    const { data, isLoading, isError } = UseOrderSummeryQuery();
    const userType = useOwnStore((store) => store.user.userType);
    return (
        <>
            <Grid container spacing={3}>
                {data?.data.map(
                    (card: { orderStatus: number; numberOrder: number }) => {
                        return (
                            <Card
                                orderStatus={convertIdToOrderStatus(
                                    card.orderStatus
                                )}
                                numberOrder={card.numberOrder}
                                key={card.orderStatus}
                            />
                        );
                    }
                )}
                {userType === "Representative"
                    ? RepresentativeHomeScreen.map((card) => {
                          if (
                              data?.data
                                  .map(
                                      (card: {
                                          orderStatus: number;
                                          numberOrder: number;
                                      }) => card.orderStatus
                                  )
                                  .includes(card.id) === false
                          )
                              return (
                                  <Card
                                      orderStatus={card.orderStatus}
                                      numberOrder={0}
                                      key={card.orderStatus}
                                  />
                              );
                      })
                    : statuses.map((card) => {
                          if (
                              data?.data
                                  .map(
                                      (card: {
                                          orderStatus: number;
                                          numberOrder: number;
                                      }) => card.orderStatus
                                  )
                                  .includes(card.id) === false
                          )
                              return (
                                  <Card
                                      orderStatus={card.orderStatus}
                                      numberOrder={0}
                                      key={card.orderStatus}
                                  />
                              );
                      })}
                {}
            </Grid>
        </>
    );
};

export default HomeMainContent;
