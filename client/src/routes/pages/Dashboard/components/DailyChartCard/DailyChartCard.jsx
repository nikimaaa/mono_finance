import React, {useEffect, useMemo} from "react";
import {
    Card,
    Dialog,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    AppBar,
    ListItemText,
    Divider,
    CircularProgress
} from "@mui/material";
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
import FullScreen from "./FullScreen/FullScreen.jsx";

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

    const chart = useMemo(() => {
        if(!isFetched) {
            return <CircularProgress/>
        }
        return (
            <BarChart
                data={normalizedData}
                indexBy="date"
                keys={["Доходы", "Расходы"]}
            />
        )
    }, [normalizedData, isFetched]);

    return (
        <Card
            sx={{
                p: "30px",
                background: "transparent",
                border: "2px solid #36393E",
                borderRadius: 4,
                flex: "1 1 auto",
                overflow: "visible"
            }}>
            <Stack justifyContent="space-between" sx={{height: "100%"}} gap={2}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography variant="h5" component="h4">Транзакции по дням</Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={openModal}
                        aria-label="close"
                        disabled={!isFetched}
                    >
                        <FullscreenIcon/>
                    </IconButton>
                </Stack>
                <div style={{
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {chart}
                </div>
            </Stack>
            <FullScreen
                open={modalOpen}
                onClose={closeModal}
                data={data}
                normalizedData={normalizedData}
            />
        </Card>
    )
}

export default DailyChartCard;