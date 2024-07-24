import React from "react"
import {Stack, Typography} from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

const EmptyState = ({title, subtitle, actions}) => {
    return (
        <Stack spacing={2} alignItems="center">
            <img src="/assets/emptyState.webp" height={100}/>
            <Stack spacing={1} alignItems="center">
                <Typography variant="h4">{title}</Typography>
                <Typography variant="subtitle1">{subtitle}</Typography>
            </Stack>
        </Stack>
    )
}

export default EmptyState;