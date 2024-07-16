import React from "react"
import {Box, Card, Stack, Typography} from "@mui/material";
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";

const Dashboard = () => {
    return (
        <Box sx={{p: "30px"}}>
            <Stack spacing={2}>
                <Stack justifyContent="space-between" direction="row" spacing={2}>
                    <WelcomeCard/>
                    <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, minWidth: 200}}>
                        <Stack sx={{height: "100%"}} justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <SouthIcon color={"error"}/>
                                <Typography variant="h5" component="h4">Расходы</Typography>

                            </Stack>

                            <Typography variant="h6" component="h4" sx={{color: "#F44336"}}>-10,000$</Typography>
                        </Stack>
                    </Card>
                    <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, minWidth: 200}}>
                        <Stack sx={{height: "100%"}} justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <NorthIcon color="success"/>
                                <Typography variant="h5" component="h4">Доходы</Typography>
                            </Stack>

                            <Typography variant="h6" component="h4" sx={{color: "#66BB6A"}}>+10,000$</Typography>
                        </Stack>

                    </Card>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, flex: "1 1 auto"}}>
                        <Typography variant="h5" component="h4">50,000$</Typography>
                    </Card>
                    <Card sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, flex: "1 1 auto"}}>
                        <Typography variant="h5" component="h4">Последние транзакции</Typography>
                    </Card>
                </Stack>
            </Stack>


        </Box>
    )
}

export default Dashboard;