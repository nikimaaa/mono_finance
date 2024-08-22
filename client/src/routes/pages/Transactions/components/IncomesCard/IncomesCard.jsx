import React from "react"
import {Card, Skeleton, Stack, Typography} from "@mui/material";
import NorthIcon from "@mui/icons-material/North.js";
import formatCurrency from "../../../../../helpers/formatCurrency.js";

const IncomesCard = ({value, isFetched}) => {
    return (
        <Card sx={{
            p: "30px",
            background: "transparent",
            border: "2px solid #36393E",
            borderRadius: 4,
            minWidth: 200,
            flex: "1 1 auto"
        }}>
            <Stack sx={{height: "100%"}} justifyContent="space-between" gap={5}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <NorthIcon color="success"/>
                    <Typography variant="h5" component="h4">Доходы</Typography>
                </Stack>
                {
                    isFetched ?
                        <Typography
                            variant="h6"
                            component="h4"
                            sx={{color: "#66BB6A"}}
                        >
                            +{formatCurrency(value)}
                        </Typography> :
                        <Skeleton height={30}/>
                }
            </Stack>
        </Card>
    )
}

export default IncomesCard;