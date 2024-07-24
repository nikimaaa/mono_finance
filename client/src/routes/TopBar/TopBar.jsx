import React from 'react';
import {Box, InputAdornment, Stack, TextField} from "@mui/material";

const TopBar = () => {
    return (
        <Box sx={{borderBottom: "3px solid #36393E", position: 'sticky', top: "0", padding: "10px 20px", background: "#282B30", zIndex: 10}}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                    <TextField
                        sx={{textAlign: "right"}}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">₴</InputAdornment>,
                        }}
                        variant="standard"
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default TopBar