import React, {useEffect, useMemo} from 'react';
import {Box, Card, CircularProgress, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencyHistory} from "../../../../../store/currency/currency.actions.js";
import formatNumber from "../../../../../helpers/formatNumber.js";
import Chart from "../../../../../components/Chart/Chart.jsx";

const CurrencyCard = () => {
    const {data, isLoading} = useSelector((state) => state.currency)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrencyHistory());
    }, []);

    const chartData = useMemo(() => {
        return [{
            "id": "rates",
            data: data.map((item) => ({x: item.exchangedate, y: item.rate}))
        }]
    }, [data]);

    if (isLoading) {
        return (
            <Card sx={{
                p: "30px",
                background: "transparent",
                border: "2px solid #36393E",
                borderRadius: 4,
                minWidth: 400
            }}>
                <CircularProgress/>
            </Card>
        )
    }

    return (
        <Card sx={{background: "transparent", border: "2px solid #36393E", borderRadius: 4, minWidth: 400}}>
            <Stack justifyContent="space-between" sx={{height: "100%"}}>
                <Box padding="30px" paddingBlockEnd={0}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" component="h4">UAH/USD</Typography>
                        <Typography variant="h5" component="h4">{formatNumber(data.at(-1).rate)}</Typography>
                    </Stack>
                </Box>
                <div style={{width: "100%", height: 90}}>
                    <Chart data={chartData}/>
                </div>
            </Stack>
        </Card>
    )
}

export default CurrencyCard;