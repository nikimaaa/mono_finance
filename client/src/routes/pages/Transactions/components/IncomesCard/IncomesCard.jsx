import React from "react"
import {Card, Stack, Typography} from "@mui/material";
import NorthIcon from "@mui/icons-material/North.js";
import formatCurrency from "../../../../../helpers/formatCurrency.js";

const IncomesCard = ({value}) => {
    return (
        <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, minWidth: 200}}>
            <Stack sx={{height: "100%"}} justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <NorthIcon color="success"/>
                    <Typography variant="h5" component="h4">Доходы</Typography>
                </Stack>
                <Typography
                    variant="h6"
                    component="h4"
                    sx={{color: "#66BB6A"}}
                >
                    +{formatCurrency(value)}
                </Typography>
            </Stack>
        </Card>
    )
}

export default IncomesCard;