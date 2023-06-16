/* MUI */
import { Box, Grid, Paper, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

/* styles */
import styles from "./styles.module.css";

export type CardProp = {
    tittle: string;
    number: number;
};
const Card = ({ tittle, number }: CardProp) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center">
            <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <Paper
                    className={styles.cardContainer}
                    sx={{ borderRadius: "15px" }}
                >
                    <Box sx={{ width: "140px" }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.9rem",
                                    md: "1.1rem",
                                },
                                fontWeight: "600",
                            }}
                        >
                            {tittle}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.2rem",
                                    md: "1.6rem",
                                },

                                fontWeight: "900",
                            }}
                        >
                            {number}
                        </Typography>
                    </Box>
                    <AutorenewIcon
                        sx={{
                            fontSize: {
                                xs: 30,
                                md: 35,
                            },
                        }}
                    />
                </Paper>
            </div>
        </Grid>
    );
};

export default Card;
