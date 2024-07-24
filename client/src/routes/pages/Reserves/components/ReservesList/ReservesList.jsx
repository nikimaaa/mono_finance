import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import {Tooltip, Typography} from "@mui/material";
import formatCurrency from "../../../../../helpers/formatCurrency.js";
import dayjs from "dayjs";
import Divider from "../../../../../components/Divider/Divider.jsx";

const ReservesList = ({reserves}) => {
    return (
        <List disablePadding>
            {reserves.map(({id, name, price, link, createdAt}, index) => {
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
                                        {name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{
                                            width: "25%",
                                            textAlign: "right",
                                        }}
                                    >
                                        {formatCurrency(price)}
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
                                                 title={dayjs(createdAt).format("YYYY.MM.DD HH:mm:ss")}>
                                            {dayjs(createdAt).fromNow()}
                                        </Tooltip>
                                    </Typography>
                                </Stack>
                            </ListItemText>
                        </ListItem>
                        {reserves.length !== index + 1 ? <Divider/> : null}
                    </React.Fragment>
                )
            })}
        </List>
    )
}

export default ReservesList;