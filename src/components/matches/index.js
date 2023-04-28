import React, {useState, useEffect, useContext, useCallback, useRef, useLayoutEffect} from 'react';
import {Context} from '../../context/store';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import bgJackpot from '../../assets/img/banner/products/Bet_Nare_300k_Jackpot_New.webp'
import {
    addToSlip,
    removeFromSlip,
    removeFromJackpotSlip,
    addToJackpotSlip,
    getBetslip, getJackpotBetslip
} from '../utils/betslip';

import CurrencyFormat from 'react-currency-format';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import padlock from '../../assets/img/padlock.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faFire} from "@fortawesome/free-solid-svg-icons";
import {getFromLocalStorage} from "../utils/local-storage";

import myGif from '../../assets/img/fire.webp'

import {Input} from "@material-ui/core";
import useWindowDimensions from "../header/Dimensions";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Notify from "../utils/Notify";
import Testimonials from "../carousel/Testimonials";
import './matches.css'

const clean = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = (props) => {
    const {odd_key, classname,live} = props;

    return (
        <button className={`${classname} btn btn-disabled match-detail col c-btn ${live?"c-resize":"width-button-odd"}`}
             style={{
                 width: "100%",
                 height: "40px",
                 padding: "2px",
                 color: "#fff",
                 background: "#334c5c",
                 opacity: 1,
                 lineHeight:"3"
             }}>
            {odd_key && <span className="et label btn-disabled ">{odd_key}</span>}
            <span className="label label-inverse">
             <LazyLoadImage
                 style={{opacity: "0.3", width: "15px"}}
                 src={padlock}
                 effect="blur"
                 alt="--"/>
         </span>
        </button>
    );
};

const marketChoice = () => {


        const markets = [
            {
                id: "18", name: "Over/Under 2.5", extra_market_cols: 2, extra_markets_display: [
                    "Under", "Over"
                ]
            },
            {
                id: "10", name: "Double Chance", extra_market_cols: 3, extra_markets_display: [
                    "1X", "X2", "12"
                ]
            },
            {
                id: "29", name: "Both Teams to Score", extra_market_cols: 2, extra_markets_display: [
                    "NO", "YES"
                ]
            },
            {
                id: "219", name: "Winner (incl. overtime)", extra_market_cols: 2, extra_markets_display: [2, 1]
            },
            {
                id: "186", name: "Winner", extra_market_cols: 2, extra_markets_display: [1, 2]
            },

            {
                id: "202", name: "1 Set Winner", extra_market_cols: 2, extra_markets_display: [1, 2]
            },
            {
                id: "406",
                name: "Winner (incl. overtime and penalties)",
                extra_market_cols: 2,
                extra_markets_display: [
                    2, 1
                ]
            },
            {
                id: "340",
                name: "Winner (incl. super over)",
                extra_market_cols: 2,
                extra_markets_display: [
                    1, 2
                ]
            }
        ]

    return markets

}


const MatchHeaderRow = (props) => {
    const {live, first_match, jackpot} = props;
    //const [state, ]  = useContext(Context);
    const categories = getFromLocalStorage('categories')
    const sport_id = new URL(window.location).searchParams.get('sport_id') || 79
    let sport = categories?.all_sports?.filter((category) => category.sport_id == sport_id)
    const [sportName, setSportName] = useState(sport!=null?sport?.[0].sport_name || 'Soccer':"");    const [showX, setShowX] = useState(true);
    const [market, setMarket] = useState('1x2');
    const [marketCols, setMarketCols] = useState(3)
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [extraMarketDisplays, setExtraMarketDisplays] = useState([])

    const [threeWay, setThreeWay] = useState(false)

    const getSelectedMarkets = () => {


        const markets = marketChoice();

        let url = new URL(window.location)

        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")

        if (sub_types.includes("1")) {
            setThreeWay(true)
        }

        let extraMarkets = []

        sub_types.forEach((sub_type) => {
            let selectedMarket = markets.filter((market) => Number(market.id) === Number(sub_type))

            if (selectedMarket.length > 0) {
                extraMarkets.push(selectedMarket[0])
            }
        })


        setExtraMarketDisplays(extraMarkets)

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

        <Row className={`full-mobile sticky-top ${jackpot?'sticky-jackpot ':user?"sticky-user":'sticky-responsive '}px-lg-3`}>
            <div className="top-matches d-flex position-sticky sticky-top shadow-lg"
                 style={{opacity: "1", top: "100px"}}>
                <div className={"size-info  d-flex col-xs-12 pad left-text"}>
                <div className="col pad left-text d-flex">
                    <div className="align-self-center col">
                        <h3 className="main-heading-1 text-white">
                            {live && <span className="live-header">LIVE </span>}
                            {sportName} {market && <></>}
                        </h3>
                    </div>
                </div>

                <div className={'col match-detail-container'}></div>
                </div>
                {/*match heading*/}
                <div className={'col  to-deskview flex-row justify-content-between space-bets'}>
                    {threeWay &&
                        <div className="d-flex flex-row ">
                            <div className="d-flex flex-column text-center text-white fit-ipad ">
                                {/*<div className={'bold'}>*/}
                                {/*    3 WAY*/}
                                {/*</div>*/}
                                <div className={'c-btn-group align-self-end'}>
                                    <a className="c-btn-header text-white">1</a>
                                    <a className="c-btn-header text-white">X</a>
                                    <a className="c-btn-header text-white">2</a>
                                </div>
                            </div>
                        </div>}
                    {/*conditional render of different views for mobile and desktop*/}
                    {/*mobile*/}
                    <div className={" separations to-tabview"}>
                        {!live && !jackpot && extraMarketDisplays.length > 0 &&
                            extraMarketDisplays?.map((extra_market) => (

                                <div className={'d-flex flex-row'}>
                                    <div className={'d-flex flex-column text-center text-white fit-ipad'}>
                                    <span className={'small'}>
                                        {extra_market.name}
                                    </span>
                                        <div className={'c-btn-group m-lg-1 mt-sm-1 justify-content-center'}>
                                            <a className="c-btn-header mx-2 ">
                                                {(extra_market.extra_markets_display[0])}

                                            </a>
                                            <a className="c-btn-header mx-2 ">
                                                {(extra_market.extra_markets_display[1])}

                                            </a>
                                            {extra_market?.extra_market_cols > 2 &&
                                                <a className={`c-btn-header`}>
                                                    {(extra_market.extra_markets_display[2])}
                                                </a>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/*desktop*/}
                    {!live && !jackpot && extraMarketDisplays.length > 0 && (
                        <>
                            {extraMarketDisplays?.map((extra_market,index) => (
                                <div key={index} className={'to-deskview flex-column text-white'}>
                                    <span className={'small text-center text-uppercase bold'}>
                                        {extra_market.name}
                                    </span>
                                    <div className={'c-btn-group'}>
                                        <a className="c-btn-header">
                                            {(extra_market.extra_markets_display[0])}
                                        </a>
                                        <a className="c-btn-header">
                                            {(extra_market.extra_markets_display[1])}
                                        </a>
                                        {extra_market?.extra_market_cols > 2 &&
                                            <a className={`c-btn-header`}>
                                                {(extra_market.extra_markets_display[2])}
                                            </a>}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    <div
                        className="bet-fix events-odd pad undefined align-items-md-start align-items-lg-center more-markets-container m-lg-2 col-3 d-flex h-100 d-flex align-self-center justify-content-md-start justify-content-lg-center
                              ">
                        <LazyLoadImage src={myGif} className={'fire '}/>
                    </div>
                </div>
            </div>
        </Row>
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
        sport_id,
        parent_match_id,
        match_status,
        tags
    } = props;


    useEffect(()=>{
        window.SIR('addWidget', '#sr-widget', 'match.lmtPlus', {
            branding:{tabs:{option: "icon", variant: "fullWidth"}},
            goalBannerImage: "https://storage.googleapis.com/nareimages/logo-white.webp",
            logo:["https://storage.googleapis.com/nareimages/logo-dark.webp"],
            momentum: "disable",
            matchId: parent_match_id ,
            collapseTo:"disable",
            layout: "double",
            scoreboard:"extended",
            detailedScoreboard: "disable",

        });
    })




    let lmtIncludes=[79,85,82,80, 107]
    // console.log("sport_id", lmtIncludes.includes(sport_id))

    return (
        <Row>

            {(live || lmtIncludes.includes(sport_id)) ?
                <div id="sr-widget" className='mt-1 pt-2'></div> : <Row className="panel-header primary-bg">
                    <h4 className="inline-block">
                        {home_team} <small> - </small> {away_team}
                        {
                            tags?.length ?
                                tags?.map(tag => (
                                    <span className="tag" key={tag.name}
                                          style={{
                                              backgroundColor: `${tag.background_color}`,
                                              color: `${tag.color}`
                                          }}
                                    >
                                {tag.name}
                            </span>
                                ))
                                : ""
                        }
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
            }
        </Row>
    )
}

const SideBets = (props) => {
    const {match, live} = props;
    const [picked,] = useState();


    return (
        <div
            className={`bet-fix events-odd pad ${picked} align-self-center more-markets-container m-lg-2 `}>
            {(match?.side_bets > 1) && <>
                <a className="side"
                   href={`https://s5.sir.sportradar.com/betnaremts/en/match/${match.parent_match_id}`}
                   target={"_blank"}
                   title={'View Stats'}>
                    <FontAwesomeIcon className={"icon-size"} icon={faChartLine}/>
                </a>
                    <Link className="side" title={'More Markets'}
                          to={`/match/${live ? 'live' : ''}${
                              live ? match.parent_match_id : match?.match_id}`
                          }>+{match.side_bets}
                    </Link>
            </>}
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
        let betslip = jackpot ? getJackpotBetslip(): (getBetslip() || {});
        // console.log("jackpot slip",state?.[betslip_key] )
        // console.log("jackpot_bet", getJackpotBetslip())
        // let betslip = getBetslip() || {};
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
        let sport_id = event.currentTarget.getAttribute("sport_id");
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
            "sport_id": sport_id,
            "live": live,
            "ucn": cstm,
            "market_active": market_active,
            "position": match?.pos || 0
        }

        // console.log("Slip", slip)
        // console.log(cstm)
        const maxPickReached=()=>{
            setPicked('')
            Notify(message)
        }
       let message= {status: 401, message: 'Maximum selections reached', token: ''}
        if (cstm === ucn) {
            let betslip;
            if (picked === 'picked') {
                betslip = jackpot !== true
                    ? removeFromSlip(mid)
                    : removeFromJackpotSlip(mid);

                setPicked('');
            } else {
                betslip = jackpot !== true
                    ? (getBetslip()&&Object.keys(getBetslip())?.length<=49)||getBetslip()==null?addToSlip(slip):maxPickReached()
                    : addToJackpotSlip(slip);

                dispatch({type: "SET", key: reference, payload: cstm});
            }
            dispatch({type: "SET", key: betslip_key, payload: betslip});
        }
    };

    return (
        <button
            ref={ref}
            className={`home-team ${match.match_id} ${ucn} ${picked} c-btn ${live?"c-resize":"width-button-odd"}`}
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
            id={ucn}
            sport_name={match.sport_name}
            sport_id={match.sport_id}
            sub_type_id={match.sub_type_id}
            special_bet_value={match?.special_bet_value || ''}
            onClick={handleButtonOnClick}>
            {!detail &&
                (
                    <span className="theodds odd-fix">
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
            :<EmptyTextRow odd_key={match?.odd_key} live={live}/>;
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
    newMatch.special_bet_value = odd_data.special_bet_value;
    delete newMatch['odds']
    delete newMatch['extra_odds']
    return newMatch;

}

const MatchRow = (props) => {

    const {first_match, match, jackpot, live, pdown, three_way} = props;
    const [extraMarketDisplays, setExtraMarketDisplays] = useState([])
    const categories = getFromLocalStorage('categories')
    const sport_id = new URL(window.location).searchParams.get('sport_id') || 79
    let sport = categories?.all_sports?.filter((category) => category.sport_id == sport_id)
    const [sportName, setSportName] = useState(sport?.[0].sport_name || 'Soccer');
    const [showX, setShowX] = useState(true);
    const [market, setMarket] = useState('1x2');
    const {height, width} = useWindowDimensions();

    const [threeWay, setThreeWay] = useState(false)
    const getSelectedMarkets = () => {


        const markets = marketChoice();

        let url = new URL(window.location)

        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
        // console.log("subtypes",sub_types[0]);
        if(width<=767){
            // console.log("condition has been met ", [sub_types[0]])
            sub_types=[sub_types[0]]
        }



        if (sub_types.includes("1")) {
            setThreeWay(true)
        }

        let extraMarkets = []

        sub_types.forEach((sub_type) => {
            let selectedMarket = markets.filter((market) => Number(market.id) === Number(sub_type))

            if (selectedMarket.length > 0) {
                extraMarkets.push(selectedMarket[0])
            }
        })

        // console.log("extra-markets",extraMarkets);

        setExtraMarketDisplays(extraMarkets)

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


    let url = new URL(window.location)
    match.market_active = 1
    match.odds.home_odd_active = 1
    let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
    const [totalMarkets] = useState(sub_types.length)
    let append = totalMarkets - Object.keys(match?.extra_odds || {}).length - 1
    let loops = []
    for (let i = 0; i < append; i++) {
        loops.push(i)
    }
    return (
        <div className="top-matches d-flex flex-sm-column flex-lg-row ">
            <div
                className="to-deskview to-block to-tabview  mx-lg-0 px-sm-4 px-md-4 px-lg-0  py-md-4 py-lg-0 container-size ">
                <div className="size-info mobile-for-desktop d-flex col-xs-12 pad left-text flex-row live-col">


                    <div className={`d-flex flex-column px-1 justify-content-sm-center justify-content-md-start change-date1 mobile-remove ${jackpot?"jackpot-width":""}`}>
                        {live &&
                            <>
                                <small style={{color: "green"}}> {match?.match_status} </small>

                            </>
                        }

                        <span className={'date-size wrapping px-3 date-remove'}>
                                                {(live && match?.match_time) ?
                                                    <>{`${match.match_time}'`}</> : new Date(match?.start_time).getDate()+"/"+(Number(new Date(match?.start_time).getMonth())+1) + " "+ (match?.match_time==undefined?"":match?.match_time)} {jackpot? (new Date(match?.start_time).getHours())+":"+new Date(match?.start_time).getMinutes():""}
                                            </span>
                        <>ID: {match?.game_id}</>
                    </div>
                    <div className={`col align-items-center col-xs-12 match-detail-container px-2 change-match only-mobile ${jackpot?"align-self-center":""}`}>
                        <Link to={jackpot ? '#' : `/match/${live ? 'live/' + match.parent_match_id : match.match_id}`}>
                            <div className="d-flex flex-column">
                                <div className="compt-detail overflow-ellipsis">
                                    <small>{match.category} | {match.competition_name}</small>
                                </div>
                                <div className="compt-teams d-flex flex-xl-column flex-column flex-md-row">
                                    <div className={'bold'}>
                                        {live && (match?.match_status !== 'ended') && <ColoredCircle color="red"/>}
                                        {match.home_team}
                                        <span className="opacity-reduce-txt vs-styling">
                                {live && match?.score}
                                            {!live && ''}
                            </span>
                                    </div>
                                    <div className={'bold'}>
                                        {match.away_team}
                                    </div>

                                </div>
                            </div>
                        </Link>
                        {
                            match.tags?.length ?
                                match.tags.map(tag => (
                                    <span className="tag" key={tag.name}
                                          style={{
                                              backgroundColor: `${tag.background_color}`,
                                              color: `${tag.color}`,
                                          }}
                                    >
                                {tag.name}
                            </span>
                                ))
                                : ""
                        }</div>
                    <div className={'to-tabview'}>
                        {!pdown && !jackpot &&
                            <SideBets match={match} live={live} style={{d: "inline"}}/>}
                    </div>


                </div>
                <hr className={"to-block m-sm-1 m-md-1 m-lg-0"}/>
                <div className="col d-flex  flex-row space-bets justify-content-lg-between  card-small">

                    {width>767?
                        <div className={"d-flex to-flex-1"}>
                        <div className="c-btn-group align-self-center to-flex-1 to-tabview">
                            {threeWay &&
                                <div className="d-flex flex-row ">
                                    <div className="d-flex flex-column text-center text-white fit-ipad w-100">
                                        {/*<div className="font-weight-bold mobile-remove">*/}
                                        {/*    <h4 className="font-weight-bold mobile-remove"> 3 WAY</h4>*/}
                                        {/*</div>*/}
                                        <div className={"d-sm-flex d-md-none"}>
                                            <span className='d-flex justify-content-start'>
                                                {match?.tags?.map((tag)=>(
                                                    <span className='px-2 w-100 ' style={{color:tag?.color, backgroundColor:tag?.background_color, fontSize:"8px", borderRadius:"10px", marginLeft:"3px", width:"4px", marginTop:"8px"}}>
                                                            <strong>
                                                            {tag.name}
                                                            </strong>
                                                        </span>
                                                ))}
                                            </span>
                                        </div>
                                        <div className="d-flex flex-row px-1 justify-content-end change-date1 mobile-only">
                                            <span className={'date-size wrapping px-3'}>
                                                {(live && match?.match_time) ?
                                                    <>{`${match.match_time}'`}</> : new Date(match?.start_time).getDate()+"/"+(Number(new Date(match?.start_time).getMonth())+1) + " "+ (match?.match_time==undefined?"":match?.match_time)} {jackpot? (new Date(match?.start_time).getHours())+":"+new Date(match?.start_time).getMinutes():""}
                                            </span>
                                            <div className={"px-1 wrapping"}>ID: {match?.game_id}</div>

                                        </div>
                                        <div className='d-flex justify-content-around mobile-remove'>
                                            <a className="c-btn-header text-white w-100">1</a>
                                            <a className="c-btn-header text-white w-100">X</a>
                                            <a className="c-btn-header text-white w-100">2</a>
                                        </div>


                                    </div>
                                </div>}
                        </div>
                        <div className="c-btn-group align-self-center checking">{
                            match?.odds?.home_odd ? (match?.odds?.home_odd && (!pdown && match?.odds?.home_odd && match.odds.home_odd !== 'NaN' &&
                                    match.market_active == 1 && match.odds.home_odd_active == 1)
                                    ? <OddButton match={match} mkt="home_team" live={live} jackpot={jackpot}/>
                                    : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) :
                                match?.odds?.home_odd ? <EmptyTextRow odd_key={match?.odd_key} live={live}/> : ''
                        }

                            {match?.odds?.neutral_odd ? ((!pdown && match?.odds?.neutral_odd && match.odds.neutral_odd !== 'NaN' &&
                                match.market_active == 1 && match.odds.neutral_odd_active == 1|| jackpot)
                                ? <OddButton match={match} mkt="draw" live={live} jackpot={jackpot}/>
                                : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) : ''
                            }
                            {match?.odds?.away_odd ? (match?.odds?.away_odd && (!pdown && match?.odds?.away_odd && match.odds.away_odd !== 'NaN' &&
                                    match.market_active == 1 && match.odds.away_odd_active == 1|| jackpot)
                                    ? <OddButton match={match} mkt="away_team" live={live} jackpot={jackpot}/>
                                    : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) :
                                match?.odds?.away_odd ? <EmptyTextRow odd_key={match?.odd_key} live={live}/> : ''
                            }

                        </div>
                    </div>:""}

                    {width<=767?<div className="c-btn-group align-self-center to-flex-1 to-tabview">

                                <div className="d-flex flex-row ">
                                    <div className="d-flex flex-column text-center text-white fit-ipad w-100">

                                        <div className="d-flex flex-row px-1 justify-content-end change-date1 mobile-only">
                                           <span className={'date-size wrapping px-3'}>
                                                {(live && match?.match_time) ?
                                                    <>{`${match.match_time}'`}</> : new Date(match?.start_time).getDate()+"/"+(Number(new Date(match?.start_time).getMonth())+1) + " "+ match?.match_time}
                                            </span>
                                            <div className={"px-1 wrapping"}>ID: {match?.game_id}</div>

                                        </div>



                                    </div>
                                </div>

                        </div>
                        :""}
                    {width<=767?<div className="c-btn-group align-self-center checking">{
                            match?.odds?.home_odd ? (match?.odds?.home_odd && (!pdown && match?.odds?.home_odd && match.odds.home_odd !== 'NaN' &&
                                    match.market_active == 1 && match.odds.home_odd_active == 1)
                                    ? <OddButton match={match} mkt="home_team" live={live} jackpot={jackpot}/>
                                    :<EmptyTextRow odd_key={match?.odd_key} live={live}/>) :
                                match?.odds?.home_odd ? <EmptyTextRow odd_key={match?.odd_key} live={live}/> : ''
                        }

                            {match?.odds?.neutral_odd ? ((!pdown && match?.odds?.neutral_odd && match.odds.neutral_odd !== 'NaN' &&
                                match.market_active == 1 && match.odds.neutral_odd_active == 1|| jackpot)
                                ? <OddButton match={match} mkt="draw" live={live} jackpot={jackpot}/>
                                : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) : ''
                            }
                            {match?.odds?.away_odd ? (match?.odds?.away_odd && (!pdown && match?.odds?.away_odd && match.odds.away_odd !== 'NaN' &&
                                    match.market_active == 1 && match.odds.away_odd_active == 1|| jackpot)
                                    ? <OddButton match={match} mkt="away_team" live={live} jackpot={jackpot}/>
                                    : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) :
                                match?.odds?.away_odd ?<EmptyTextRow odd_key={match?.odd_key} live={live}/> : ''
                            }

                        </div>:""}



                    {/*mobile  display and odds*/}
                    <div className={"to-profile-check separations to-flex-2"}>
                        {match?.competition_name!="World Cup"&&!jackpot  &&  <>
                            {Object.entries(match?.extra_odds || {}).map(([marketName, odds], index) => (
                                marketName !== '' && (
                                    <div key={index}
                                        className={'d-flex to-flex-1 my-lg-0  w-100'}>
                                        <div
                                            className="c-btn-group align-self-center justify-content-center  flex-md-column text-center  flex-sm-row text-center to-tabview mobile-remove">
                                            <h4>{(marketName)}</h4>

                                        </div>
                                    {/*    <div className="d-none flex-row px-1 justify-content-end change-date1 mobile-only">*/}
                                    {/*        <span className={'date-size px-1 wrapping'}>*/}
                                    {/*            {(live && match?.match_time) ?*/}
                                    {/*                <>{`${match.match_time}'`}</> : match?.start_time}*/}
                                    {/*        </span>*/}
                                    {/*    <div className={"px-1 wrapping"}>ID: {match?.game_id}</div>*/}

                                    {/*</div>*/}

                                        <div
                                            className={`c-btn-group m-lg-1  align-self-center px-2 to-tabview justify-content-center flex-sm-row flex-md-row flex-lg-row `}>

                                            {
                                                Object.entries(odds || {}).map(([odd_key, odd_data],index) =>
                                                    (
                                                        <div key={index}
                                                            className={"d-flex flex-column w-100 margin-l-mobile px-sm-1 px-md-1 px-lg-1 "}>
                                                            <div
                                                                className=" c-btn-header text-white w-100 to-tabview flex-column px-sm-1 px-lg-0 px-md-1 mobile-remove ">
                                                                {(odd_key)}
                                                            </div>
                                                            <div className=" c-btn-group  align-self-center">
                                                                {odd_data?.odd_active == 1 && odd_data.market_active == 1 ?
                                                                    (
                                                                        <OddButton
                                                                            match={getUpdatedMatchFromOdds({
                                                                                match,
                                                                                marketName,
                                                                                odd_key,
                                                                                odd_data
                                                                            })}
                                                                            key={odd_key} live={live}/>) : (
                                                                        <EmptyTextRow odd_key={match?.odd_key} live={live}/>
                                                                    )
                                                                }
                                                            </div>


                                                        </div>

                                                    ))
                                            }
                                        </div>

                                    </div>


                                )
                            ))
                            }

                      

                        </>
                        }
                    </div>
                    <div className={'to-tabview mobile-only justify-content-end'}>
                        {!pdown && !jackpot &&
                            <SideBets match={match} live={live} style={{d: "inline"}}/>}
                    </div>
                    {/*desktop display of odds*/}

                    {!jackpot && <>
                        {Object.entries(match?.extra_odds || {}).map(([marketName, odds], index) => (
                            marketName !== '' && (
                                <div className={`c-btn-group  align-self-center to-deskview`}>
                                    {
                                        Object.entries(odds || {}).map(([odd_key, odd_data]) => {
                                            return odd_data?.odd_active == 1 && odd_data.market_active == 1 ? (<OddButton
                                                match={getUpdatedMatchFromOdds({match, marketName, odd_key, odd_data})}
                                                key={odd_key} live={live}/>) : (<EmptyTextRow odd_key={match?.odd_key} live={live}/>)
                                        })
                                    }
                                </div>
                            )
                        ))
                        }

                        {!live && loops?.map(() => (
                            <div className={`c-btn-group align-self-center to-deskview`}>
                                <EmptyTextRow odd_key={match?.odd_key} live={live}/>
                                <EmptyTextRow odd_key={match?.odd_key} live={live}/>
                            </div>
                        ))}

                    </>
                    }
                    <div className={'to-deskview'}>

                        {!pdown && !jackpot &&
                            <SideBets match={match} live={live} style={{d: "inline"}}/>}
                    </div>
                    </div>


                </div>
        </div>
    )

}

export const MarketList = (props) => {

    const {live, matchwithmarkets, pdown} = props;

    const [filters, setFilters] = useState({})

    const filterMarkets = (value) => {
        let filtered = []
        let elements = Array.from(Object.entries(matchwithmarkets?.data?.odds || {}))
        elements.filter((mkt_id, markets) => {
            if (mkt_id[0].toLowerCase().includes(value)) {
                filtered[mkt_id[0]] = mkt_id[1]
            }
            return []
        })

        let match = filters?.data?.match

        let ob = ({
            data: {
                match: match,
                odds: Object.assign({}, filtered)
            }
        })

        setFilters(ob)
    }

    useEffect(() => {
        setFilters(matchwithmarkets)
    }, [matchwithmarkets])

    return (
        <div className="matches full-width">
            {!filters
                ? <div className="top-matches">Event not available for betting.</div>
                : <MoreMarketsHeaderRow
                    {...filters?.data?.match}
                    score={filters?.data?.match?.score}
                    live={live}
                />
            }
            <Row className="web-element px-3">
                <div className="col-md-12 position-sticky shadow-lg primary-bg mb-1 remove-top px-0"
                     style={{top: "135px", height: "40px", backgroundColor: "#3c5a6c !important"}}>
                    <Input type="text" className={'form-control h-100  border-0'}
                           style={{
                               fontSize: "14px",
                               backgroundColor: "#3c5a6c",
                               color: "#FFF"
                           }}
                           onInput={(event) => filterMarkets(event.target.value)}
                           placeholder={'Type to search for market ...'}/>
                </div>
                {Object.entries(filters?.data?.odds || {}).map(([mkt_id, markets]) => {
                    return <MarketRow
                        market_id={mkt_id}
                        markets={markets}
                        width={markets.length === 3 ? "33.333%" : "50%"}
                        match={filters?.data?.match}
                        key={mkt_id}
                        live={live}
                        pdown={pdown}
                    />
                })
                }
            </Row>
        </div>
    )

}

export const JackpotHeader = (props) => {
    const {jackpot} = props

    return (
        <Container>
            <Row className="top-matches jackpot-resize"
                 style={{backgroundImage: `url(${bgJackpot})`, backgroundRepeat: 'no-repeat', height: "75px"}}>
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
    const {matches, jackpotData} = props;
    const [selections, setSelections] = useState([])

    const randomize = async () => {
        matches?.data?.forEach((match, index) => {
            let teams = [match?.home_team, 'draw', match?.away_team]
            let team = teams[Math.floor(Math.random() * teams.length)].replaceAll(" ", "")
            while (selections[index] === team) {
                team = teams[Math.floor(Math.random() * teams.length)].replaceAll(" ", "")
            }
            selections[index] = team
            let selection = match?.match_id.toString() + match?.sub_type_id.toString() +
                team.toString()
            document.querySelectorAll('button[custom="' + selection + '"]').forEach((el) => {
                if (!el.classList.contains('picked')) {
                    el.click()
                }
            })
        })
        setSelections(selections)
    }


    return (
        <div className="matches full-width mt-1">

            <MatchHeaderRow jackpot={true} first_match={matches ? matches[0] : []}/>
            <div className={'row d-flex flex-row justify-content-between shadow-lg'}>
                <div className="col-md-12 text-center shadow-lg">
                    <div className={'text-white col'}>
                        Wekelea Jackpot Bet bila worries na Nare Auto pick.
                    </div>
                    <div className={'col-md-12 text-center'}>
                        <button className={'btn btn-square btn-lg  place-bet-btn bold mb-1 bg-warning'}
                                id={"jp-nare-pick-button"}
                                style={{fontWeight: "bold", fontSize: "20px"}}
                                onClick={() => randomize()}>
                            <FontAwesomeIcon icon={faFire}/> Nare Auto Pick
                        </button>
                    </div>
                </div>
            </div>
            <Row className="web-element">
                {matches && Object.entries(matches?.data).map(([key, match]) => (
                    <MatchRow match={match} jackpot key={key}/>
                ))
                }
                {(matches !== null && matches.length === 0) &&
                    <div className="top-matches row  mx-2">
                        No events found.
                    </div>
                }
            </Row>
        </div>
    )
}

const MatchList = (props) => {
    const {live, matches, pdown, three_way} = props;

    return (
        <div className="matches full-width">
            {/*<LiveSidebar/>*/}
            {matches && <MatchHeaderRow live={live} first_match={matches ? matches[0] : {}}/>}

            <Row className="web-element px-lg-3">
                {matches &&
                    Object.entries(matches).map(([key, match]) => (
                        <MatchRow match={match} key={key} live={live} pdown={pdown} three_way={three_way}/>
                    ))
                }
                {(matches !== null && matches.length === 0) &&
                    <div className="top-matches row  mx-2">
                        No events found.
                    </div>
                }
            </Row>
        </div>
    )
}
export default MatchList;
