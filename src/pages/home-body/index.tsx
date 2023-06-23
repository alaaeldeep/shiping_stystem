/* MUI */
import { Box, Grid, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

/* react query */
import UseOrderSummeryQuery from "../../hooks/home/useGetQuery";

/* components */
import Card from "./card";
import { convertIdToOrderStatus } from "../../utils/converter";
import { useState } from "react";

const HomeMainContent = () => {
    const { data, isLoading, isError } = UseOrderSummeryQuery();

    const [statusFromBack, setStatusFromBack] = useState<number[]>(
        data?.data.map(
            (card: { orderStatus: number; numberOrder: number }) =>
                card?.orderStatus
        )
    );
    console.log(statusFromBack);
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
            </Grid>
        </>
    );
};

export default HomeMainContent;
