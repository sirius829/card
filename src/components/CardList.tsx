import React, { useEffect, useState } from "react";
import CardSearch from "./CardSearch";
import { fetchData } from "../apis/api";
import { CardInterface } from "../interfaces";
import { Container, Skeleton, TablePagination, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const CardList: React.FC = () => {
    const [cardList, setCardList] = useState<CardInterface[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [countPerPage, setPerPage] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const getCardList = async () => {
        setLoading(true);
        const result = await fetchData({ pageSize: countPerPage, page: page + 1, name: searchTerm });
        if (result.status === 200) {
            setCardList(result.data.cards);
            setTotal(result.totalCount);
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
        setSearchTerm(str);
        setPage(1);
    }

    return (
        <Container>
            <CardSearch onSearch={searchCards} />
            {!isLoading ? (
                <Grid2 container spacing={2}>
                    {cardList.map((card: CardInterface, index: number) => (
                        <Grid2 sm={12} md={6} lg={4} xl={3} key={index}>
                            {card.imageUrl ? (
                                <img style={{ width: '100%' }} src={card.imageUrl} />
                            ) :
                                <Skeleton width='100%' height="100%">
                                    <Typography>.</Typography>
                                </Skeleton>
                            }
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <Grid2 container spacing={2}>
                    {new Array(8).fill(0).map((value: number, index: number) => (
                        <Grid2 sm={12} md={6} lg={4} xl={3} key={index}>
                            <Skeleton width='100%' height="300px" key={index}>
                                <Typography>.</Typography>
                            </Skeleton>
                        </Grid2>
                    ))}
                </Grid2>
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
        </Container>
    )
}
export default CardList;