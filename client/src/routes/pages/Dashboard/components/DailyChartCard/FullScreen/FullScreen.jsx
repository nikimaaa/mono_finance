import React, {useMemo} from "react";
import {AppBar, Dialog, Divider, IconButton, ListItemText, Toolbar, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import formatCurrency from "../../../../../../helpers/formatCurrency.js";
import PieChart from "../../../../../../components/PieChart/PieChart.jsx";
import dayjs from "dayjs";
import BarChart from "../../../../../../components/BarChart/BarChart.jsx";

const FullScreen = ({open, onClose, data, normalizedData}) => {
    const dataList = useMemo(() => {
        return (
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
        )
    }, [data]);

    return (
        <Dialog open={open} fullScreen>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Транзакции по дням
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
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
                <div style={{
                        minWidth: 400,
                        borderRight: "2px solid #36393E",
                        height: "100%",
                        overflow: "auto"
                }}>
                    {dataList}
                </div>
                <div style={{flex: "1 1 auto", padding: "30px 0"}}>
                    <BarChart data={normalizedData} indexBy="date" keys={["Доходы", "Расходы"]}/>
                </div>
            </div>
        </Dialog>
    )
}

export default FullScreen;