import React from 'react';
import {Card, Stack, Typography} from "@mui/material";

const TitleCard = ({title, subtitle, imageSrc, imageSize = 110}) => {
    return (
        <Card sx={{p: "30px", background: "#2B4BAE", borderRadius: 4, flex: "1 1 auto"}}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Stack spacing={3}>
                    <Typography variant="h5" component="h4">{title}</Typography>
                    <Typography variant="subtitle1" component="p" color="textSecondary">
                        {subtitle}
                    </Typography>
                </Stack>
                <img height={imageSize} src={imageSrc} alt="money"/>
            </Stack>
        </Card>
    )
}

export default TitleCard;