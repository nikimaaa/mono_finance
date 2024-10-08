import React, {useEffect, useMemo} from 'react';
import {Box, Card, CircularProgress, Skeleton, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencyHistory} from "../../../../../store/currency/currency.actions.js";
import formatNumber from "../../../../../helpers/formatNumber.js";
import LineChart from "../../../../../components/LineChart/LineChart.jsx";

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

    return (
        <Card sx={{background: "transparent", border: "2px solid #36393E", borderRadius: 4, width: "100%", flex: "1 1 400px", overflow: "visible"}}>
            <Stack justifyContent="space-between" sx={{height: "100%"}} gap={2}>
                <Box padding="30px" paddingBlockEnd={0}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" component="h4">UAH/USD</Typography>
                        {
                            !isLoading ?
                                <Typography variant="h5" component="h4">{formatNumber(data.at(-1).rate)}</Typography> :
                                <Skeleton height={28} width={80}/>
                        }
                    </Stack>
                </Box>
                <div style={{width: "100%", height: 90, display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {!isLoading ? <LineChart data={chartData}/> : <CircularProgress/>}
                </div>
            </Stack>
        </Card>
    )
}

export default CurrencyCard;