import React from "react";
import ListItem from "@mui/material/ListItem";
import {Skeleton, Stack} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Divider from "../Divider/Divider.jsx";

const ListSkeleton = ({rowsCount, columnsCount, gap = 2}) => {
    let listItems = [];

    for (let i = 0; i < rowsCount; i++) {
        const columnsItems = [];

        for(let j = 1; j <= columnsCount; j++){
            columnsItems.push(
                <ListItemText>
                    <Stack>
                        <Skeleton animation="wave" height={15}/>
                        {/*<Skeleton animation="wave" height={10} width="80%"/>*/}
                    </Stack>
                </ListItemText>
            )
        }

        listItems.push(
            <React.Fragment key={i}>
                <ListItem sx={{gap}}>
                    {columnsItems}
                </ListItem>
                {i !== rowsCount - 1 ? <Divider/> : null}
            </React.Fragment>
        )
    }

    return <List>{listItems}</List>;
}

export default ListSkeleton;