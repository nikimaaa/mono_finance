import React from 'react';
import {Card, Stack, Typography} from "@mui/material";

const WelcomeCard = () => {
    return (
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
    )
}

export default WelcomeCard;