import { Box, Typography } from "@mui/material";
import React from "react";

const NoCardFound: React.FC = () => {

    return (
        <Box sx={{
            minHeight: "40vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h2">No Card Found!</Typography>
        </Box>
    )
}

export default NoCardFound;