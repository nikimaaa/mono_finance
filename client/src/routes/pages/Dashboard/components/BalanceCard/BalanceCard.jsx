import React, {useEffect} from 'react';
import {Card, Stack, Typography} from "@mui/material";
import formatMoney from "../../../../../helpers/formatCurrency.js";
import Divider from "../../../../../components/Divider/Divider.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchBalance} from "../../../../../store/balance/balance.actions.js";

const BalanceCard = () => {
    const dispatch = useDispatch();
    const {
        total,
        creditLimit,
        realBalance,
        monthlyExpenses,
        balanceAfterMonthlyExpenses,
        reservedExpenses,
        freeBalance,
        isLoading
    } = useSelector((state) => state.balance);

    useEffect(() => {
        dispatch(fetchBalance());
    }, []);
    return (
        <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, flex: "1 1 500px"}}>
            <Stack justifyContent="space-between" sx={{height: "100%"}} gap={2}>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="h4">Баланс</Typography>
                    <Typography variant="h5" component="h4">{formatMoney(total)}</Typography>
                </Stack>
                <Divider/>
                <Stack flexDirection="column" gap={1}>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" component="p" sx={{color: "#F44336"}}>Кредитный лимит</Typography>
                        <Typography variant="body1" component="p" sx={{color: "#F44336"}}>-{formatMoney(creditLimit)}</Typography>
                    </Stack>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" component="p">Реальный лимит</Typography>
                        <Typography variant="body1" component="p" >{formatMoney(realBalance)}</Typography>
                    </Stack>
                </Stack>
                <Divider/>
                <Stack flexDirection="column" gap={1}>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" component="p" sx={{color: "#F44336"}}>Месячные расходы</Typography>
                        <Typography variant="body1" component="p" sx={{color: "#F44336"}}>-{formatMoney(monthlyExpenses)}</Typography>
                    </Stack>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" component="p">Остаток</Typography>
                        <Typography variant="body1" component="p">{formatMoney(balanceAfterMonthlyExpenses)}</Typography>
                    </Stack>
                </Stack>
                <Divider/>
                <Stack flexDirection="column" gap={1}>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" component="p" sx={{color: "#F44336"}}>Зарезервированные расходы</Typography>
                        <Typography variant="body1" component="p" sx={{color: "#F44336"}}>-{formatMoney(reservedExpenses)}</Typography>
                    </Stack>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" component="p">Остаток</Typography>
                        <Typography variant="body1" component="p">{formatMoney(freeBalance)}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}

export default BalanceCard;