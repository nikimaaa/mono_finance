import React from "react";
import dayjs from "dayjs";
import formatCurrency from "../../helpers/formatCurrency.js";
import relativeTime from "dayjs/plugin/relativeTime";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "../Divider/Divider.jsx";
import {Tooltip, Typography} from "@mui/material";

dayjs.extend(relativeTime)

const TransactionsList = ({transactions}) => {
    return (
        <List disablePadding>
            {transactions.map(({id, amount, description, occurredAt, mccInfo}, index) => {
                return (
                    <React.Fragment key={id}>
                        <ListItem>
                            <ListItemText sx={{width: "25%"}}>
                                {description}
                            </ListItemText>
                            <ListItemText sx={{width: "25%"}}>
                                {mccInfo.smile} {mccInfo.shortDescription}
                            </ListItemText>
                            <ListItemText
                                sx={{textAlign: "right", width: "25%", color: amount > 0 ? "#66BB6A" : "#F44336"}}
                            >
                                {amount > 0 ? "+" : ""}
                                {formatCurrency(amount / 100)}
                            </ListItemText>
                            <Tooltip placement="top-end"
                                     title={dayjs(occurredAt).format("YYYY.MM.DD HH:mm:ss")}>
                                <Typography sx={{width: "25%", textAlign: "right"}}>{dayjs(occurredAt).fromNow()}</Typography>
                            </Tooltip>
                        </ListItem>
                        {transactions.length !== index + 1 ? <Divider/> : null}
                    </React.Fragment>
                )
            })}
        </List>
    );
}

export default TransactionsList;