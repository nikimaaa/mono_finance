import React, {useEffect} from 'react';
import {Card, Skeleton, Stack, Typography} from "@mui/material";
import formatCurrency from "../../../../../helpers/formatCurrency.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchReservesTotal} from "../../../../../store/reserves/reserves.actions.js";

const TotalCard = ({isLoading, value}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReservesTotal());
    }, []);

    return (
        <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, minWidth: 200}}>
            <Stack sx={{height: "100%"}} justifyContent="space-between">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="h4">Общая сумма</Typography>
                </Stack>
                <Typography
                    variant="h6"
                    component="h4"
                    sx={{textAlign: "center"}}
                >
                    {
                        !isLoading ?
                            formatCurrency(value) :
                            <Skeleton variant="rounded" sx={{width: "100%"}} height={30} />
                    }
                </Typography>
            </Stack>
        </Card>
    )
}

export default TotalCard;