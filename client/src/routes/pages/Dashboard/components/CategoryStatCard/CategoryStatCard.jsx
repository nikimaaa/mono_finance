import React, {useEffect, useMemo} from "react";
import {
    AppBar,
    Button,
    Card,
    Dialog,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    ListItemText,
    Divider, CircularProgress, Box
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchTransactionsCategoriesStat
} from "../../../../../store/transactions/transactions.actions.js";
import PieChart from "../../../../../components/PieChart/PieChart.jsx";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import useActive from "../../../../../hooks/useActive.js";
import formatMoney from "../../../../../helpers/formatCurrency.js";
import CloseIcon from "@mui/icons-material/Close";
import formatCurrency from "../../../../../helpers/formatCurrency.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FullScreen from "./FullScreen/FullScreen.jsx";

const CategoryStatCard = () => {
    const [modalOpen, openModal, closeModal] = useActive(false);
    const {isFetched, data} = useSelector((state) => state.transactions.categoriesStat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactionsCategoriesStat());
    }, []);

    const normalizedData = useMemo(() => {
        return data.map((row) => ({
            ...row,
            label: row.mccTitle,
            id: row.mcc,
            value: -row.amount
        }))
    }, [data]);

    const chart = useMemo(() => {
        if(!isFetched) {
            return <CircularProgress/>
        }
        return (
            <PieChart
                margin={8}
                data={normalizedData}
                enableArkLabels={false}
                arcLabel={e => `${e.data.smile} ${e.data.percentage}%`}
            />
        )
    }, [normalizedData, isFetched]);

    return (
        <Card
            sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, flex: "1 0 450px", overflow: "visible"}}>
            <Stack justifyContent="space-between" sx={{height: "100%"}} gap={2}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography variant="h5" component="h4">Расходы по категориям</Typography>
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
                <Box sx={{
                    height: 300,
                    display: "Flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {chart}
                </Box>
            </Stack>
            <FullScreen data={normalizedData} onClose={closeModal} open={modalOpen}/>
        </Card>
    )
}

export default CategoryStatCard;