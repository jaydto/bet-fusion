import React, {useState} from 'react';
import makeRequest from "../utils/fetch-request";
import {Card, CardActionArea, Typography} from "@material-ui/core";

const BetHistoryDetails= props => {
        const {bet}=props
    console.log("betslip_details_obtained", bet)
    console.log("betslip_details_obtained2", bet.bet_id)
        const [betStatus, setBetStatus] = useState(bet.status_desc);
        const [canCancel, setCanCancel] = useState(bet.can_cancel === 1);

        const cancelBet = () => {
            let endpoint = '/bet-cancel';
            let data = {
                bet_id:bet.bet_id,
                cancel_code:101,
            }
            makeRequest({url: endpoint, method: "POST", data: data, use_jwt:true}).then(([status, result]) => {
                if(status === 201){
                    setBetStatus('CANCEL RQ');
                    setCanCancel(false);
                }
            });
        };

        const cancelBetMarkup = () => {
            return (
                <div className="col">
                    <button
                        title="Cancel Bet"
                        className="col btn btn-sm place-bet-btn "
                        onClick={()=> cancelBet()}
                    >
                        Cancel
                    </button>
                </div>
            )
        }


//     Card sx={{ maxWidth: 345 }}>
// <CardActionArea>
//     <CardMedia
//     component="img"
//     height="140"
//     image="/static/images/cards/contemplative-reptile.jpg"
//     alt="green iguana"
//         />
//         <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//         Lizard
//         </Typography>
//     <Typography variant="body2" color="text.secondary">
//         Lizards are a widespread group of squamate reptiles, with over 6,000
//         species, ranging across all continents except Antarctica
//     </Typography>
// </CardContent>
// </CardActionArea>
//     <CardActions>
//         <Button size="small" color="primary">
//             Share
//         </Button>
//     </CardActions>
// </Card>

    return (
        <div>
            {bet.map((bets) => (
                <Card sx={{ maxWidth: 345 }} key={bets.parent_match_id} className={'card-bet-details'}>
                    <CardActionArea className={'card-bet-details'}>
                        <Typography variant="body2" color="text.secondary">Home Team: {bets.home_team} | Away Team: {bets.away_team}</Typography>
                         <Typography variant="body2" color="text.secondary">Bet Pick: {bets.bet_pick} | Win: {bets.win}</Typography>
                         <Typography variant="body2" color="text.secondary">Outcomes: {bets.outcomes}</Typography>
                         <Typography variant="body2" color="text.secondary">Odd Value: {bets.odd_value} | Status: {bets.status}</Typography>
                    </CardActionArea>
                </Card>
            ))}
        </div>
        )
};


export default BetHistoryDetails;
