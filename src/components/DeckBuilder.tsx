import { Delete } from '@mui/icons-material';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CardContext } from '..';
import Grid2 from '@mui/material/Unstable_Grid2';
import { CardInterface } from '../interfaces';
import CardComponent from './Card';
import NoCardFound from './NoCardFound';
import { calculateManaCost } from '../utils/util';

const DeckBuilder: React.FC = () => {
    const { cards, removeCard } = useContext(CardContext);
    const [open, setOpen] = useState<boolean>(false);
    const [onRemovingCard, setRemovingCard] = useState<CardInterface | undefined>();
    const [averageCost, setCost] = useState<number>(0);

    useEffect(() => {
        setCost(calculateManaCost(cards));
    }, [cards]);
    const handleCloseModal = () => {
        setOpen(false);
        setRemovingCard(undefined);
    }
    const remove = (removingCard: CardInterface) => {
        setRemovingCard(removingCard);
        setOpen(true);
    }

    const removeFromDeck = () => {
        setOpen(false);
        if (onRemovingCard)
            removeCard(onRemovingCard.id);
    }

    return (
        <Container>
            <Typography variant='h2'>
                Deck Builder
            </Typography>
            <Typography variant='body1' sx={{marginBottom: "24px"}}>
                Average Mana Cost: {averageCost}
            </Typography>
            {cards.length ? (
                <Grid2 container spacing={2}>
                    {cards.map((card: CardInterface, index: number) => (
                        <CardComponent card={card} key={index} addCard={remove} />
                    ))}
                </Grid2>
            ) : <NoCardFound />}
            <Dialog
                open={open}
                onClose={handleCloseModal}
            >
                <DialogTitle>Add a card to the Deck</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you going to add this card to Deck?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={removeFromDeck}>Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default DeckBuilder;