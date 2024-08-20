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
    Divider
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

    return (
        <Card
            sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, flex: "1 0 450px"}}>
            <Stack justifyContent="space-between" sx={{height: "100%"}} gap={2}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography variant="h5" component="h4">Расходы по категориям</Typography>
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
                    <PieChart
                        margin={8}
                        data={normalizedData}
                        enableArkLabels={false}
                        arcLabel={e => `${e.data.smile} ${e.data.percentage}%`}
                    />
                </div>
                <Dialog open={modalOpen} fullScreen sx={{background: "#282B30"}}>
                    <AppBar sx={{position: 'relative'}}>
                        <Toolbar>
                            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                Расходы по категориям
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
                                {normalizedData
                                    .sort((item1, item2) => item2.percentage - item1.percentage)
                                    .map((item) => (
                                        <React.Fragment key={item.mcc}>
                                            <ListItem>
                                                <ListItemText>{item.smile} {item.label}</ListItemText>
                                                <ListItemText
                                                    sx={{textAlign: "right"}}>{formatCurrency(item.value)} ({item.percentage}%)</ListItemText>
                                            </ListItem>
                                            <Divider/>
                                        </React.Fragment>
                                    ))}
                            </List>
                        </div>
                        <div style={{flex: "1 1 auto", padding: 30}}>
                            <PieChart
                                margin={20}
                                data={normalizedData}
                                arcLabel={e => `${e.data.smile} ${e.label} (${e.data.percentage}%)`}
                            />
                        </div>
                    </div>
                </Dialog>
            </Stack>
        </Card>
    )
}

export default CategoryStatCard;