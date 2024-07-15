import React from "react"
import {Box, Card, Stack, Typography} from "@mui/material";

const Dashboard = () => {
    return (
        <Box sx={{p: "30px"}}>
            <Stack justifyContent="space-between" direction="row">
                <Card sx={{p: "30px", background: "#2B4BAE", borderRadius: 4}}>
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                        <Stack spacing={3}>
                            <Typography variant="h5" component="h4">Добро пожаловать на дашборд</Typography>
                            <Typography variant="subtitle1" component="p" color="textSecondary">
                                Здесь вы можете посмотреть информацию о последних транзакциях, состоянии счёта и
                                расходах за месяц.
                            </Typography>
                        </Stack>
                        <img height="110" src="/assets/money.webp" alt="money"/>
                    </Stack>
                </Card>
                <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4}}>
                    <Stack sx={{height: "100%"}} justifyContent="space-between">
                    <Typography variant="h5" component="h4">Доходы</Typography>
                    <Typography variant="h5" component="h4">10,000$</Typography>
                    </Stack>
                </Card>
                <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4}}>
                    <Stack sx={{height: "100%"}} justifyContent="space-between">
                        <Typography variant="h5" component="h4">Расходы</Typography>
                        <Typography variant="h5" component="h4">10,000$</Typography>
                    </Stack>

                </Card>
            </Stack>

        </Box>
    )
}

export default Dashboard;