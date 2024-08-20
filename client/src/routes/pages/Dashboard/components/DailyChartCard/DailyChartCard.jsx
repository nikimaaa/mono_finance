import React, {useEffect, useMemo} from "react";
import {Card, Dialog, IconButton, Stack, Toolbar, Typography, AppBar, ListItemText, Divider} from "@mui/material";
import BarChart from "../../../../../components/BarChart/BarChart.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactionsDailyStat} from "../../../../../store/transactions/transactions.actions.js";
import dayjs from "dayjs";
import FullscreenIcon from "@mui/icons-material/Fullscreen.js";
import CloseIcon from "@mui/icons-material/Close.js";
import useActive from "../../../../../hooks/useActive.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import formatCurrency from "../../../../../helpers/formatCurrency.js";
import PieChart from "../../../../../components/PieChart/PieChart.jsx";

const DailyChartCard = () => {
    const [modalOpen, openModal, closeModal] = useActive(false);
    const {isFetched, data} = useSelector((state) => state.transactions.dailyStat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactionsDailyStat());
    }, []);

    const normalizedData = useMemo(() => {
        return data.map(
            (row) => ({
                "Доходы": row.incomes,
                "Расходы": row.expenses,
                date: dayjs(row.date).format("DD.MM.YYYY")
            })
        )
    }, [data]);

    return (
        <Card
            sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, flex: "1 1 auto"}}>
            <Stack justifyContent="space-between" sx={{height: "100%"}} gap={2}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography variant="h5" component="h4">Транзакции по дням</Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={openModal}
                        aria-label="close"
                    >
                        <FullscreenIcon/>
                    </IconButton>
                </Stack>
                <div style={{height: 300}}>
                    <BarChart data={normalizedData} indexBy="date" keys={["Доходы", "Расходы"]}/>
                </div>
                <Dialog open={modalOpen} fullScreen>
                    <AppBar sx={{position: 'relative'}}>
                        <Toolbar>
                            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                Транзакции по дням
                            </Typography>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={closeModal}
                                aria-label="close"
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div style={{
                        flex: "1 1 auto",
                        background: "#282B30",
                        display: "flex",
                        height: "calc(100vh - 64px)",
                        width: "100%"
                    }}>
                        <div
                            style={{minWidth: 400, borderRight: "2px solid #36393E", height: "100%", overflow: "auto"}}>
                            <List disablePadding>
                                {data
                                    .map((item, index) => {
                                        const incomes = (
                                            <Typography sx={{color: "#66BB6A"}}>
                                                +{formatCurrency(item.incomes)}
                                            </Typography>
                                        );
                                        const expenses = (
                                            <Typography sx={{color: "#F44336"}}>
                                                -{formatCurrency(item.expenses)}
                                            </Typography>
                                        )
                                        return (
                                            <React.Fragment key={item.mcc}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={expenses}
                                                        secondary={incomes}
                                                    ></ListItemText>
                                                    <ListItemText sx={{textAlign: "right"}}>
                                                        {dayjs(item.date).format("DD.MM.YYYY")}
                                                    </ListItemText>
                                                </ListItem>
                                                <Divider/>
                                            </React.Fragment>
                                        )
                                    })}
                            </List>
                        </div>
                        <div style={{flex: "1 1 auto", padding: "30px 0"}}>
                            <BarChart data={normalizedData} indexBy="date" keys={["Доходы", "Расходы"]}/>
                        </div>
                    </div>
                </Dialog>
            </Stack>
        </Card>
    )
}

export default DailyChartCard;