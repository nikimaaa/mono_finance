import React from "react"
import {Box, Stack} from "@mui/material";
import BalanceCard from "./components/BalanceCard/BalanceCard.jsx";
import LastTransactionsCard from "./components/LastTransactionsCard/LastTransactionsCard.jsx";
import TitleCard from "../../../components/TitleCard/TitleCard.jsx";
import CurrencyCard from "./components/CurrencyCard/CurrencyCard.jsx";

const Dashboard = () => {
    return (
        <Box sx={{p: "30px"}}>
            <Stack spacing={2}>
                <Stack justifyContent="space-between" direction="row" spacing={2}>
                    <TitleCard
                        imageSrc="/assets/money.webp"
                        title="Добро пожаловать"
                        subtitle="Здесь вы можете посмотреть информацию о последних транзакциях, состоянии счёта и расходах за месяц."
                    />
                    <CurrencyCard value={1000}/>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <BalanceCard/>
                    <LastTransactionsCard/>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Dashboard;