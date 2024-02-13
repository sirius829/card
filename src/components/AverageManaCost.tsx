import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
    deck: string[];
}

const AverageManaCost: React.FC<Props> = ({ deck }) => {

    const calculate = () => {
        if (!deck.length) return 0;

        const totalManaCost = deck.reduce((total, card) => {
            return total;
        }, 0);

        return totalManaCost / deck.length;
    }

    return (
        <Box>
            <Typography variant='h2'>Average Mana Cost</Typography>
            <Typography variant='body1'>Average Cost: {calculate()}</Typography>
        </Box>
    )
}

export default AverageManaCost;