import React from 'react';
import { Typography, Button, Box } from '@mui/material';
const GettingStarted = () => {
    return (
        <Box sx={
            {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to "Talk to your data"
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Getting Started
            </Typography>
            <Typography variant="body1" gutterBottom>
                In order to start, you should add a new context
            </Typography>
            <Typography variant="body1" gutterBottom>
                Or you can select one of the existing contexts
            </Typography>
        </Box>
    );
};

export default GettingStarted;
