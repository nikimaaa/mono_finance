import React, {useMemo} from "react";
import {AppBar, Dialog, Divider, IconButton, ListItemText, Toolbar, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import formatCurrency from "../../../../../../helpers/formatCurrency.js";
import PieChart from "../../../../../../components/PieChart/PieChart.jsx";

const FullScreen = ({open, onClose, data}) => {
    const dataList = useMemo(() => {
        return (
            <List disablePadding>
                {data
                    .sort((item1, item2) => item2.percentage - item1.percentage)
                    .map((item) => (
                        <React.Fragment key={item.mcc}>
                            <ListItem>
                                <ListItemText>{item.smile} {item.label}</ListItemText>
                                <ListItemText sx={{textAlign: "right"}}>
                                    {formatCurrency(item.value)} ({item.percentage}%)
                                </ListItemText>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
            </List>
        )
    }, [data]);

    return (
        <Dialog open={open} fullScreen>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <Typography sx={{flex: 1}} variant="h6" component="div">
                        Расходы по категориям
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
                <div style={{flex: "1 1 auto", padding: 30}}>
                    <PieChart
                        margin={20}
                        data={data}
                        arcLabel={e => `${e.data.smile} ${e.label} (${e.data.percentage}%)`}
                    />
                </div>
            </div>
        </Dialog>
    )
}

export default FullScreen;