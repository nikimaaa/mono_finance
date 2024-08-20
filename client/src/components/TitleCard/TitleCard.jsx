import React from 'react';
import {Card, Stack, Typography} from "@mui/material";

const TitleCard = ({title, description, imageSrc, imageSize = 110}) => {
    return (
        <Card sx={{p: "30px", background: "#2B4BAE", borderRadius: 4, flex: "1 1 1000px"}}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Stack spacing={3}>
                    <Typography variant="h5" component="h4">{title}</Typography>
                    <Typography variant="subtitle1" component="p" color="textSecondary" sx={{maxWidth: 800}}>
                        {description}
                    </Typography>
                </Stack>
                <img height={imageSize} src={imageSrc} alt="money"/>
            </Stack>
        </Card>
    )
}

export default TitleCard;