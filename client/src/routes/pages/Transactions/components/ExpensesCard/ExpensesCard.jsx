import React from "react";
import {Card, Skeleton, Stack, Typography} from "@mui/material";
import SouthIcon from "@mui/icons-material/South.js";
import formatCurrency from "../../../../../helpers/formatCurrency.js";

const ExpensesCard = ({value, isFetched}) => {
    return (
        <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, minWidth: 200, flex: "1 1 auto"}}>
            <Stack sx={{height: "100%"}} justifyContent="space-between" gap={5}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <SouthIcon color={"error"}/>
                    <Typography variant="h5" component="h4">Расходы</Typography>
                </Stack>
                {
                    isFetched ?
                        <Typography
                            variant="h6"
                            component="h4"
                            sx={{color: "#F44336"}}
                        >
                            {formatCurrency(value)}
                        </Typography> :
                        <Skeleton height={30}/>
                }
            </Stack>
        </Card>
    )
}

export default ExpensesCard;