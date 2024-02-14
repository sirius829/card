import { Skeleton, Typography } from "@mui/material";
import { CardInterface } from "../interfaces";
import Grid2 from "@mui/material/Unstable_Grid2";


const CardComponent: React.FC<{card: CardInterface, addCard: (addingCard: CardInterface) => void}> = ({card, addCard}) => {
    
    return (
        <Grid2 sm={12} md={6} lg={4} xl={3}>
            {card.imageUrl ? (
                <img style={{ width: '100%', cursor: "pointer" }} src={card.imageUrl} onClick={() => addCard(card)} />
            ) :
                <Skeleton width='100%' height="100%" sx={{ cursor: 'pointer' }} onClick={() => addCard(card)}>
                    <Typography>.</Typography>
                </Skeleton>
            }
        </Grid2>
    )
}
export default CardComponent;