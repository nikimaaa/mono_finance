import React from 'react';
import {Card, Stack, Typography} from "@mui/material";
import formatCurrency from "../../../../../helpers/formatCurrency.js";

const CurrencyCard = () => {
    return (
        <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, minWidth: 400}}>
            <Stack sx={{height: "100%"}} justifyContent="space-between">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="h4">UAH/USD</Typography>
                    <Typography variant="h5" component="h4">1000.00</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}

export default CurrencyCard;