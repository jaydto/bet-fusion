import React, {useState, useEffect, useContext, useCallback, useRef, useLayoutEffect} from 'react';
import {Context} from '../../context/store';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {
    addToSlip,
    removeFromSlip,
    removeFromJackpotSlip,
    addToJackpotSlip,
    getBetslip
} from '../utils/betslip';

import CurrencyFormat from 'react-currency-format';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import padlock from '../../assets/img/padlock.png';


const clean = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = (props) => {
    const {odd_key} = props;

    return (
        <div className="btn btn-disabled match-detail col"
             style={{
                 width: "100%",
                 height: "30px",
                 padding: "2px",
                 color: "#fff",
                 background: "#334c5c",
                 opacity: 0.7
             }}>
            {odd_key && <span className="et label btn-disabled ">{odd_key}</span>}
            <span className="label label-inverse right">
             <LazyLoadImage
                 style={{opacity: "0.3", width: "15px"}}
                 src={padlock}
                 effect="blur"
                 alt="--"/>
         </span>
        </div>
    );
};

const MatchHeaderRow = (props) => {
    const {live, first_match} = props;
    //const [state, ]  = useContext(Context);;
    const [sportName, setSportName] = useState('Soccer');
    const [showX, setShowX] = useState(true);
    const [market, setMarket] = useState('1x2');
    const [marketCols, setMarketCols] = useState(3)
    const [extraMarketDisplays, setExtraMarketDisplays] = useState([])

    const getSelectedMarkets = () => {

        const markets = [
            {
                id: "1,18", name: "1X2 & Total Over/Under 2.5", extra_market_cols: "2", extra_markets_display: [
                    "Over", "Under"
                ]
            },
            {
                id: "1,10", name: "1X2 & Double Chance", extra_market_cols: "3", extra_markets_display: [
                    "1X", "X2", "12"
                ]
            },
            {
                id: "1,29", name: "1X2 & Both Teams to Score", extra_market_cols: "2", extra_markets_display: [
                    "YES", "NO"
                ]
            },
        ]

        let url = new URL(window.location)

        let sub_types = url.searchParams.get('sub_type_id')

        if (sub_types) {
            let selectedMarket = markets.filter((market) => market.id === sub_types)
            if (selectedMarket.length > 0) {
                setMarketCols(selectedMarket[0].extra_market_cols)
                setExtraMarketDisplays(selectedMarket[0].extra_markets_display)
            }
        }
    }


    useEffect(() => {
        getSelectedMarkets()
        if (first_match) {
            setSportName(first_match.sport_name);
            setMarket(first_match.market_name);
            /**
             * I blew the shiet here someone help recoil this to API call results
             */
            setShowX(!["186", "340"].includes(first_match.sub_type_id));

        }
    }, [first_match?.parent_match_id])


    return (
        <Container>
            <Row className="events-header">
                <div className="col-5 left-text">
                    <h3 className="main-heading-1">
                        {live && <span className="live-header">LIVE </span>}
                        {sportName} {market && <>( {market} )</>}
                    </h3>
                </div>
                <div className={'col-3 d-flex flex-row'}>
                    <div className="col-4">1</div>
                    {showX
                        ? <div className="col-4 events-odd">X</div>
                        : <div className="col-4 events-odd">&nbsp;</div>
                    }
                    <div className="col-4">2</div>
                    <div className="col-4 events-odd"></div>
                </div>
                <div className={'col-3 d-flex flex-row'}>
                    <div className="col-4">
                        {extraMarketDisplays?.[0] || "1X"}
                    </div>
                    <div className={`col-4 events-odd ${marketCols > 1 ? 'd-block' : 'd-none'}`}>
                        {extraMarketDisplays?.[1] || "X2"}
                    </div>
                    <div className={`col-4 ${marketCols > 2 ? 'd-block' : 'd-none'}`}>
                        {extraMarketDisplays?.[2] || "12"}
                    </div>
                    <div className="col-4 events-odd"></div>
                </div>
            </Row>
        </Container>
    )
}

const MoreMarketsHeaderRow = (props) => {
    const {
        home_team,
        away_team,
        game_id,
        category,
        competition,
        start_time,
        match_time,
        score,
        live,
        match_status
    } = props;

    return (
        <Container>
            <Row className="panel-header primary-bg">

                <h4 className="inline-block">
                    {home_team} <small> - </small> {away_team}
                </h4>
                {live &&
                    <Row className="header-text">
                        <Col style={{
                            color: "#cc5500",
                            marginBottom: "5px"
                        }}> {match_status === 'Ended' && 'Ended '} {score}</Col>
                    </Row>
                }
                <Row className="header-text">
                    <Col>{category} {competition}</Col>
                </Row>
                {match_status !== 'Ended' &&
                    <Row className="start-time">
                        {live
                            ? <Col>Live: <span style={{color: "#cc5500"}}>{match_time || match_status}</span></Col>
                            : <Col>Start: {start_time}</Col>}

                        <Col>Game ID: {game_id} </Col>
                    </Row>
                }
            </Row>
        </Container>
    )
}

const SideBets = (props) => {
    const {match, live} = props;
    const [picked,] = useState();

    return (

        <div className={`col-lg-1 col-sm-1 col-md-1 col-xs-1 events-odd pad ${picked}`}>
            <a className="side"
               href={`/match/${live ? 'live/' : ''}${
                   live ? match.parent_match_id : match?.match_id}`
               }>+{match.side_bets}
            </a>
        </div>
    )

}

const OddButton = (props) => {
    const {match, mkt, detail, live, jackpot, subType, marketKey} = props
    // console.log("MKT are ", mkt)
    const [ucn, setUcn] = useState('');
    // console.log(ucn)
    const [picked, setPicked] = useState('');
    // console.log("Picked", picked?picked:'na')
    const [oddValue, setOddValue] = useState(null);

    const [state, dispatch] = useContext(Context);
    const ref = useRef();
    let reference = match.match_id + "_selected";
    const [betslip_key, setBetslipKey] = useState('betslip');

    const updateBeslipKey = useCallback(() => {
        if (jackpot) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot]);

    useEffect(() => {
        updateBeslipKey();
    }, [updateBeslipKey])

    // here

    const updatePickedChoices = useCallback(() => {
        // let betslip = state?.[betslip_key];
        let betslip = getBetslip() || {};
        let uc = clean(
            match.match_id
            + "" + match.sub_type_id
            + (match?.[mkt] || match?.odd_key || 'draw')
        );
        // here
        // console.log(betslip?.[match.match_id]?.match_id)
        // console.log(uc)
        if ((betslip?.[match.match_id]?.match_id == match.match_id)
            && uc == betslip?.[match.match_id]?.ucn) {
            setPicked('picked');
        } else {
            setPicked('');
        }
    }, [picked, state[betslip_key]])

    useEffect(() => {
        updatePickedChoices();
    }, [updatePickedChoices]);

    const updateOddValue = useCallback(() => {
        if (match) {
            let uc = clean(
                match.match_id
                + "" + match.sub_type_id
                + (match?.[mkt] || match?.odd_key || 'draw')
            );
            setUcn(uc);
            if (mkt === 'home_team') {

                setOddValue(match.odds.home_odd)

            } else if (mkt === 'away_team') {

                setOddValue(match.odds.away_odd)

            } else if (mkt === 'draw') {
                setOddValue(match.odds.neutral_odd)
            } else {
                setOddValue(match.odd_value);
            }
        }
    }, [match]);

    useLayoutEffect(() => {
        updateOddValue();
    }, [updateOddValue]);

    const updateMatchPicked = useCallback(() => {
        if (state?.[reference]) {
            if (state?.[reference].startsWith('remove.')) {
                setPicked('');
            } else {
                let uc = clean(
                    match.match_id
                    + "" + match.sub_type_id
                    + (match?.[mkt] || match?.odd_key || 'draw')
                );
                // console.log(uc)
                //
                // console.log(state?.[reference])

                if (state?.[reference] === uc) {
                    setPicked('picked')
                } else {
                    setPicked('');
                }
            }
        }
    }, [state?.[reference]])

    useEffect(() => {
        updateMatchPicked();
    }, [updateMatchPicked])

    const handleButtonOnClick = (event) => {
        let pmid = event.currentTarget.getAttribute("parent_match_id");
        let mid = event.currentTarget.getAttribute("match_id");
        let stid = event.currentTarget.getAttribute("sub_type_id");
        let sbv = event.currentTarget.getAttribute("special_bet_value");
        let oddk = event.currentTarget.getAttribute("odd_key");
        let odd_value = event.currentTarget.getAttribute("odd_value");
        let bet_type = event.currentTarget.getAttribute("bet_type");
        let odd_type = event.currentTarget.getAttribute("odd_type");
        let home_team = event.currentTarget.getAttribute("home_team");
        let away_team = event.currentTarget.getAttribute("away_team");
        let sport_name = event.currentTarget.getAttribute("sport_name");
        let market_active = event.currentTarget.getAttribute("market_active");
        let cstm = clean(mid + "" + stid + oddk + (marketKey !== undefined ? marketKey : ''))

        let slip = {
            "match_id": mid,
            "parent_match_id": pmid,
            "special_bet_value": sbv,
            "sub_type_id": stid,
            "bet_pick": oddk,
            "odd_value": odd_value,
            "home_team": home_team,
            "away_team": away_team,
            "bet_type": bet_type,
            "odd_type": odd_type,
            "sport_name": sport_name,
            "live": live,
            "ucn": cstm,
            "market_active": market_active,
        }

        // console.log("Slip", slip)
        // console.log(cstm)

        if (cstm === ucn) {
            let betslip;
            if (picked === 'picked') {
                betslip = jackpot !== true
                    ? removeFromSlip(mid)
                    : removeFromJackpotSlip(mid);

                setPicked('');
            } else {
                betslip = jackpot !== true
                    ? addToSlip(slip)
                    : addToJackpotSlip(slip);

                dispatch({type: "SET", key: reference, payload: cstm});
            }
            dispatch({type: "SET", key: betslip_key, payload: betslip});
        }
    };

    return (
        <button
            ref={ref}
            className={`home-team ${match.match_id} ${ucn} ${picked}`}
            home_team={match.home_team}
            odd_type={match?.name || match?.market_name || "1X2"}
            bet_type={live ? 1 : 0}
            away_team={match.away_team}
            market_active={match.market_active}
            odd_value={oddValue}
            odd_key={match?.[mkt] || match?.odd_key || 'draw'}
            parent_match_id={match.parent_match_id}
            match_id={match.match_id}
            custom={ucn}
            sport_name={match.sport_name}
            sub_type_id={match.sub_type_id}
            special_bet_value={match?.special_bet_value || ''}
            onClick={handleButtonOnClick}>
            {!detail &&
                (
                    <span className="theodds">
                            {oddValue}
                        </span>
                )
            }
            {detail &&
                (<>
                      <span
                          className="label label-inverse blueish">
                        {match.odd_key}
                      </span>
                    <span
                        className="label label-inverse blueish odd-value">
                            {oddValue}
                     </span>
                </>)}
        </button>
    )
}


const MarketRow = (props) => {
    const {markets, match, market_id, width, live, pdown} = props;

    const MktOddsButton = (props) => {
        const {match, mktodds, live, pdown} = props;
        const fullmatch = {...match, ...mktodds};
        // console.log("Market odds", fullmatch)
        return (
            !pdown
            && fullmatch?.odd_value !== 'NaN'
            && fullmatch.market_active == 1
            && fullmatch.odd_active == 1
        )
            ? <OddButton match={fullmatch} detail mkt={"detail"} live={live}/>
            : <EmptyTextRow odd_key={fullmatch?.odd_key}/>;
    }

    return (
        <div className="top-matches match">
            <Row className="top-matches header">
                {live &&
                    <div
                        style={{
                            width: "2px",
                            marginTop: "-5px",
                            marginRight: "5px",
                            opacity: 0.6
                        }}>
                        <ColoredCircle color="#cc5500"/>
                    </div>
                }
                {market_id}
            </Row>

            {markets && markets.map((mkt_odds) => {
                // console.log(mkt_odds)
                return (<>
                    <Col className="match-detail" style={{width: width, float: "left"}}>
                        <MktOddsButton
                            match={match}
                            mktodds={mkt_odds}
                            live={live}
                            pdown={pdown}
                        />
                    </Col>
                </>)
            })
            }
        </div>
    )
}

const ColoredCircle = ({color}) => {
    const styles = {backgroundColor: color};
    return color ? (
        <>
            <span className="colored-circle" style={styles}/>
        </>
    ) : null;
};

const getUpdatedMatchFromOdds = (props) => {
    const {match, marketName, odd_key, odd_data} = props;
    let newMatch = {...match, ...odd_data};
    newMatch.name = marketName;
    newMatch.odd_key = odd_key;
    newMatch.odd_value = odd_data.odd_value;
    newMatch.odd_active = odd_data.odd_active;
    newMatch.market_active = true;
    newMatch.special_bet_value = odd_data.special_bet_value;
    delete newMatch['odds']
    delete newMatch['extra_odds']

    // console.log("New match details", newMatch)
    return newMatch;

}

const MatchRow = (props) => {
    const {match, jackpot, live, pdown} = props;
    return (
        <Row className="top-matches">
            <div className="col-sm-1 col-xs-12 pad left-text">
                {live &&
                    <>
                        <small style={{color: "green"}}> {match?.match_status} </small>
                        <br/>
                    </>
                }
                {(live && match?.match_time) ?
                    <>{`${match.match_time}'`}</> : match?.start_time}
            </div>
            <div className="col-sm-4 col-xs-12">
                <a href={`/match/${match.match_id}`}>
                    <div className="compt-detail"> {match.category} | {match.competition_name}</div>
                    <div className="compt-teams">
                        {live && (match?.match_status !== 'ended') && <ColoredCircle color="red"/>}
                        {match.home_team}
                        <span className="opacity-reduce-txt vs-styling">
                        {live && match?.score}
                            {!live && 'VS'}
                    </span>
                        {match.away_team}
                    </div>
                </a>
            </div>
            <Row className={`${jackpot ? 'col-4' : 'col-lg-3 col-xs-12'} m-0 p-2`}>
                <div className="col-4 match-div-col" style={{padding: 0}}>
                    {(!pdown && match?.odds?.home_odd && match.odds.home_odd !== 'NaN' &&
                        match.market_active == 1 && match.odds.home_odd_active == 1)
                        ? <OddButton match={match} mkt="home_team" live={live} jackpot={jackpot}/>
                        : <EmptyTextRow odd_key={match?.odd_key}/>
                    }
                </div>
                <div className="col-4 events-odd match-div-col" style={{padding: 0}}>
                    {(!pdown && match?.odds?.neutral_odd && match.odds.neutral_odd !== 'NaN' &&
                        match.market_active == 1 && match.odds.neutral_odd_active == 1)
                        ? <OddButton match={match} mkt="draw" live={live} jackpot={jackpot}/>
                        : <EmptyTextRow odd_key={match?.odd_key}/>
                    }
                </div>
                <div className="col-4 match-div-col" style={{padding: 0}}>
                    {(!pdown && match?.odds?.away_odd && match.odds.away_odd !== 'NaN' &&
                        match.market_active == 1 && match.odds.away_odd_active == 1)
                        ? <OddButton match={match} mkt="away_team" live={live} jackpot={jackpot}/>
                        : <EmptyTextRow odd_key={match?.odd_key}/>
                    }
                </div>
            </Row>
            {!jackpot && <Row className={`${jackpot ? 'col-4' : 'col-lg-3 col-xs-12'} m-0 p-2`}>
                {Object.entries(match?.extra_odds || {}).map(([marketName, odds]) => {
                    return Object.entries(odds || {}).map(([odd_key, odd_data]) => {
                        return <div className={'col-4 match-div-col'}>
                            <OddButton match={getUpdatedMatchFromOdds({match, marketName, odd_key, odd_data})}
                                       key={odd_key} live={live}/>
                        </div>
                    });
                })
                }
            </Row>
            }
            {!pdown && !jackpot && (match?.side_bets > 1) &&
                <SideBets match={match} live={live} style={{d: "inline"}}/>}
        </Row>
    )

}

export const MarketList = (props) => {

    const {live, matchwithmarkets, pdown} = props;

    return (
        <div className="matches full-width">
            {!matchwithmarkets
                ? <div className="top-matches">Event not available for betting.</div>
                : <MoreMarketsHeaderRow
                    {...matchwithmarkets?.data?.match}
                    score={matchwithmarkets?.data?.match?.score}
                    live={live}
                />
            }
            <Container className="web-element">
                {Object.entries(matchwithmarkets?.data?.odds || {}).map(([mkt_id, markets]) => {
                    return <MarketRow
                        market_id={mkt_id}
                        markets={markets}
                        width={markets.length === 3 ? "33.333%" : "50%"}
                        match={matchwithmarkets?.data?.match}
                        key={mkt_id}
                        live={live}
                        pdown={pdown}
                    />
                })
                }
            </Container>
        </div>
    )

}

export const JackpotHeader = (props) => {
    const {jackpot} = props

    return (
        <Container>
            <Row className="top-matches">
                <Row className="jp-header-text">
                    <div className="jp-header-top">
                        {jackpot?.type} - {jackpot?.total_games} GAMES {jackpot?.name}
                    </div>
                </Row>
                <Row className="jp-header-text mb-2">
                    <div className="jackpot-amount mt-3">
                        <CurrencyFormat
                            value={jackpot?.jackpot_amount}
                            displayType={'text'}
                            thousandSeparator={true} prefix={'KES'}/>
                    </div>
                </Row>

            </Row>
        </Container>
    )

}

export const JackpotMatchList = (props) => {
    const {matches} = props;

    return (
        <div className="matches full-width mt-5">

            <MatchHeaderRow first_match={matches ? matches[0] : []}/>

            <Container className="web-element">
                {matches && Object.entries(matches?.data).map(([key, match]) => (
                    <MatchRow match={match} jackpot key={key}/>
                ))
                }
                {(matches !== null && matches.length === 0) &&
                    <div className="top-matches row">
                        No events found.
                    </div>
                }
            </Container>
        </div>
    )
}

const MatchList = (props) => {
    const {live, matches, pdown} = props;

    return (
        <div className="matches full-width">

            {matches && <MatchHeaderRow live={live} first_match={matches ? matches[0] : {}}/>}

            <Container className="web-element">
                {matches &&
                    Object.entries(matches).map(([key, match]) => (
                        <MatchRow match={match} key={key} live={live} pdown={pdown}/>
                    ))
                }
                {(matches !== null && matches.length === 0) &&
                    <div className="top-matches row">
                        No events found.
                    </div>
                }
            </Container>
        </div>
    )
}
export default MatchList;
