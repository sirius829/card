import { Delete } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';

const DeckBuilder: React.FC = () => {
    const [deck, setDeck] = useState<string[]>([]);
    const [dense, setDense] = useState<boolean>(false);

    const addToDeck = (card: string) => {
        setDeck([...deck, card]);
    }

    const removeFromDeck = (card: string) => {
        const updatedDeck = deck.filter((c) => c !== card);
        setDeck(updatedDeck);
    }

    return (
        <Box>
            <Typography variant='h2'>
                Deck Builder
            </Typography>
            <Box>
                <Typography variant='h3'>Current Decker</Typography>
                <List dense={dense}>
                    {deck.map((value: string, index: number) => (
                        <ListItem key={index}
                            secondaryAction={
                                <IconButton edge="end" aria-label='delete' onClick={() => removeFromDeck(value)}>
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <Typography variant='body1'>{value}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default DeckBuilder;