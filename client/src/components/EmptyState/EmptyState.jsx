import React from "react"
import {Button, Stack, Typography} from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

const EmptyState = ({title, subtitle, imageSrc, actions = []}) => {
    return (
        <Stack spacing={2} alignItems="center">
            <img src={imageSrc} height={150}/>
            <Stack spacing={1} alignItems="center">
                <Typography variant="h4">{title}</Typography>
                <Typography variant="subtitle1">{subtitle}</Typography>
            </Stack>
            <Stack>
                {actions.map(({label, onAction}) => <Button onClick={onAction} variant="contained">{label}</Button>)}
            </Stack>
        </Stack>
    )
}

export default EmptyState;