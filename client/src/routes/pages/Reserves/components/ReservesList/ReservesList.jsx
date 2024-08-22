import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, Tooltip, Typography} from "@mui/material";
import formatCurrency from "../../../../../helpers/formatCurrency.js";
import dayjs from "dayjs";
import Divider from "../../../../../components/Divider/Divider.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack"

const ReservesList = ({reserves, onDelete, onEdit}) => {
    return (
        <List disablePadding>
            {reserves.map(({id, name, price, link, createdAt}, index) => {
                const handleDelete = () => onDelete(id);
                const handleEdit = () => onEdit(id);
                return (
                    <React.Fragment key={id}>
                        <ListItem>
                            <ListItemText sx={{width: "25%"}}>
                                {name}
                            </ListItemText>
                            <ListItemText>
                                {formatCurrency(price)}
                            </ListItemText>
                            <Tooltip
                                placement="top"
                                title={dayjs(createdAt).format("YYYY.MM.DD HH:mm:ss")}
                            >
                                <Typography sx={{textAlign: "right"}}>
                                    {dayjs(createdAt).fromNow()}
                                </Typography>
                            </Tooltip>
                            <Stack gap={2} direction="row">
                                <Tooltip title="Редактировать">
                                    <IconButton
                                        edge="end"
                                        aria-label="comments"
                                        sx={{marginLeft: "20px"}}
                                        onClick={handleEdit}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Удалить">
                                    <IconButton
                                        edge="end"
                                        aria-label="comments"
                                        onClick={handleDelete}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </ListItem>
                        {reserves.length !== index + 1 ? <Divider/> : null}
                    </React.Fragment>
                )
            })}
        </List>
    )
}

export default ReservesList;