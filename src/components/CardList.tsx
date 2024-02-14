import React, { useContext, useEffect, useState } from "react";
import CardSearch from "./CardSearch";
import { fetchData } from "../apis/api";
import { CardInterface } from "../interfaces";
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, Snackbar, TablePagination, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import NoCardFound from "./NoCardFound";
import CardComponent from "./Card";
import { CardContext } from "..";

const CardList: React.FC = () => {
    const [cardList, setCardList] = useState<CardInterface[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [countPerPage, setPerPage] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [onAddingCard, setAddingCard] = useState<CardInterface | undefined>();
    const [openToastr, setOpenToastr] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
    

    const { cards, addCard } = useContext(CardContext);

    const handleCloseModal = () => {
        setOpen(false);
        setAddingCard(undefined);
    }

    const handleCloseToastr = () => {
        setMessage("");
        setOpenToastr(false);
    }

    const getCardList = async () => {
        setLoading(true);
        const result = await fetchData({ pageSize: countPerPage, page: page + 1, name: searchTerm });
        if (result.status === 200) {
            setCardList(result.data.cards);
            setTotal(parseInt(result.totalCount));
            setLoading(false);
        } else {
            setError(result.msg);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCardList();
    }, [page, countPerPage, searchTerm]);

    const searchCards = async (str: string) => {
        if (str) {
            setSearchTerm(str);
            setPage(0);
        }
    }

    const NowLoading = () => (
        <Grid2 container spacing={2}>
            {new Array(8).fill(0).map((value: number, index: number) => (
                <Grid2 xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                    <Skeleton width='100%' height="300px" key={index}>
                        <Typography>.</Typography>
                    </Skeleton>
                </Grid2>
            ))}
        </Grid2>
    );

    const AddToCard = (addingCard: CardInterface) => {
        setAddingCard(addingCard);
        setOpen(true);
    }
    const addCardToDeck = () => {
        setOpen(false);
        if (onAddingCard) {
            if (cards.length >= 30) {
                setMessage("You can't add card anymore.");
            } else if (cards.findIndex((card) => card.id === onAddingCard.id)) {
                setMessage("This card was already added.");
            } else {
                addCard(onAddingCard);
                setMessage("Card has added to Deck.");
            }
            setOpenToastr(true);
        }
    }

    return (
        <Container>
            <CardSearch onSearch={searchCards} />
            {!isLoading ? (
                cardList.length ? (
                    <Grid2 container spacing={2}>
                        {cardList.map((card: CardInterface, index: number) => (
                            <CardComponent card={card} key={index} addCard={AddToCard} />
                        ))}
                    </Grid2>
                ) : <NoCardFound />
            ) : (
                <NowLoading />
            )}
            <TablePagination
                component={'div'}
                count={total}
                page={page}
                rowsPerPage={countPerPage}
                onPageChange={(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
                    setPage(newPage);
                }}
                onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    setPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
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
                    <Button onClick={addCardToDeck}>Add</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openToastr}
                autoHideDuration={3000}
                onClose={handleCloseToastr}
                message={message}
            />
        </Container>
    )
}
export default CardList;