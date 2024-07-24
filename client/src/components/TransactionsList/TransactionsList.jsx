import React from "react";
import dayjs from "dayjs";
import formatCurrency from "../../helpers/formatCurrency.js";
import relativeTime from "dayjs/plugin/relativeTime";
import Stack from "@mui/material/Stack";
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
                        <ListItem disablePadding>
                            <ListItemText>
                                <Stack
                                    justifyContent="space-between"
                                    flexDirection="row"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{width: "25%"}}
                                    >
                                        {description}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{width: "25%"}}
                                    >
                                        {mccInfo.smile} {mccInfo.shortDescription}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{
                                            width: "25%",
                                            textAlign: "right",
                                            color: amount > 0 ? "#66BB6A" : "#F44336"
                                        }}
                                    >
                                        {amount > 0 ? "+" : ""}
                                        {formatCurrency(amount / 100)}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{
                                            width: "25%",
                                            textAlign: "right"
                                        }}
                                    >
                                        <Tooltip placement="top"
                                                 title={dayjs(occurredAt).format("YYYY.MM.DD HH:mm:ss")}>
                                            {dayjs(occurredAt).fromNow()}
                                        </Tooltip>
                                    </Typography>
                                </Stack>
                            </ListItemText>
                        </ListItem>
                        {transactions.length !== index + 1 ? <Divider/> : null}
                    </React.Fragment>
                )
            })}
        </List>
    );
}

export default TransactionsList;