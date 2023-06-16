/* MUI */
import { Box, Grid, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

/* react query */
import UseQuery from "../../hooks/serverState/useQuery";

/* components */
import Card from "./card";

type props = { drawerWidth: number };

const HomeMainContent = () => {
    const { data, isLoading, isError } = UseQuery("/homeReport");

    return (
        <>
            <Grid container spacing={3}>
                {data?.data.map((card: { title: string; number: number }) => (
                    <Card tittle={card.title} number={card.number} />
                ))}
            </Grid>
        </>
    );
};

export default HomeMainContent;
/* <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",

                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            padding: "10px",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                جديد
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
                                11
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
                    </Box>
                </Grid>

                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                قيد الانتظار
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                تم التسليم للمندوب
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                تم التسليم
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                لا يمكن الوصول
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                تم التاجيل
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                تم التسليم جزئيا
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                تم الالغاء من قبل المستلم
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                تم الرفض مع الدفع
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            padding: "10px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                رفض مع سداد الجزاء
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
                                11
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
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "8rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            cursor: "pointer",
                            padding: "10px",
                            boxShadow:
                                "#00000033 0px 12px 28px 0px , #0000001a 0px 2px 4px 0px, #ffffff0d 0px 0px 0px 1px inset",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "0.9rem",
                                        md: "1.1rem",
                                    },
                                    fontWeight: "600",
                                }}
                            >
                                رفض ولم يتم الدفع
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
                                11
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
                    </Box>
                </Grid> */
