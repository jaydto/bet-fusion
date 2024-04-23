import React, {useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {StoreContext} from "../../context/store";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import bgJackpot from '../../assets/img/banner/products/jackpot.webp'
import {
    addToJackpotSlip,
    addToSlip,
    getBetslip,
    getJackpotBetslip,
    removeFromJackpotSlip,
    removeFromSlip
} from '../utils/betslip';
import './matches.css'
import {NumericFormat as CurrencyFormat} from 'react-number-format';
import {LazyLoadImage} from 'react-lazy-load-image-component';

import padlock from '../../assets/img/padlock.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faCaretDown,
    faCaretRight,
    faChartLine,
    faShield,
    faStar,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {getFromLocalStorage} from "../utils/local-storage";

import {Input} from "@mui/material";
import {Link, useNavigate, useLocation} from "react-router-dom";

import Notify from "../utils/Notify";

import {Button, ButtonGroup} from "react-bootstrap";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {favoriteMarkets, favoriteMarketsData, marketGroups, resetState} from "../../redux/matchesSlice";
import {
    getSelected,
    removePickedData,
    removeSelected,
    setMatchBetslip,
    setPickedData,
    setSelected
} from "../../redux/bettingSlice";
import {setState} from "../../redux/dataSlice";
import useWindowDimensions from "../header/Dimensions";

const clean =
    (_str) => {
        _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
        // console.log("cleanup_time_taken", t3)

        return _str.replace(/-+/g, '-');
    }

const EmptyTextRow = React.memo(
    (props) => {
        const {odd_key, classname, live, allMarkets} = props;

        return (
            <button
                className={`${classname} ${allMarkets ? ' all-markets ' : ''} empty-more-markets-button home-team btn btn-disabled match-detail c-btn justify-content-around d-flex align-items-center ${live ? "c-resize" : "width-button-odd"}`}
                style={{
                    width: "100%",
                    height: "40px",
                    padding: "8px",
                    color: "#fff",
                    background: "var(--odds-button)",
                    opacity: 1,
                    display: 'flex',
                    alignItems: 'center',
                    lineHeight: "3"
                }}>
                {odd_key && <span className=" label btn-disabled " style={{opacity: "0.3"}}>{odd_key}</span>}
                <span className="label label-inverse">
                <LazyLoadImage
                    style={{opacity: "0.3", width: "15px"}}
                    src={padlock}
                    effect="blur"
                    alt="--"/>
         </span>
            </button>
        );
    });

export const marketChoiceOptions = () => {
    return [
        {
            sport_id: '79',
            sport_name: 'Soccer',
            default_markets: [
                {
                    id: '1',
                    name: '1x2',
                    market_name: '1x2',
                },
                {
                    id: '18',
                    name: 'OV/UN',
                    market_name: 'Over/Under 2.5',
                },
                {
                    id: '29',
                    name: 'BTS',
                    market_name: 'Both Teams To Score',
                },
                {
                    id: '10',
                    name: 'DC',
                    market_name: 'Double Chance',
                },

            ],
        },
    ];
};

export const virtualGameChoiceOptions = (bottomSheetType) => {
    if (bottomSheetType === 'pull_out') {
      // Return options for pull_out
      return [
        {
          id: 'Aviator',
          name: 'Aviator',
          url: '/nare-games/aviator?status=live',
        },
        {
          id: 'JetX',
          name: 'JetX',
          url: '/smart-play?game=JetX&category=JetX',
        },
      ];
    } else {
      // Return options for morning_glory or any other type
      return [
        {
          id: 'Aviator',
          name: 'Aviator',
          url: '/nare-games/aviator?status=live',
        },
        {
          id: 'JetX',
          name: 'JetX',
          url: '/smart-play?game=JetX&category=JetX',
        },
        {
          id: 'Nare League',
          name: 'Nare League',
          url: '/nare-league',
        },
        {
          id: 'Casino',
          name: 'Casino',
          url: '/casino',
        },
      ];
    }
  };

export const marketChoice = () => {

    return [
        {
            id: "1",
            name: "1x2",
            extra_market_cols: 3,
            extra_markets_display: ["1", "X", "2"],
        },
        {
            id: "18", name: "Over/Under 2.5", extra_market_cols: 2, extra_markets_display: [
                "Over", "Under"
            ]
        },
        {
            id: "10", name: "Double Chance", extra_market_cols: 3, extra_markets_display: [
                "1X", "12", "X2"
            ]
        },
        {
            id: "29", name: "Both Teams to Score", extra_market_cols: 2, extra_markets_display: [
                "YES", "NO"
            ]
        },
        {
            id: "219", name: "Winner (incl. overtime)", extra_market_cols: 2, extra_markets_display: [1, 2]
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
                1, 2
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

}


export const MatchHeaderRow = React.memo(
    (props) => {
        const {live, first_match, jackpot, loading} = props;

        const [, setShowX] = useState(true);
        const [market, setMarket] = useState('1x2');
        const [extraMarketDisplays, setExtraMarketDisplays] = useState([])
        const [, setThreeWay] = useState(false)
        const dispatchRedux = useDispatch()
        const userData = useSelector((state) => state.auth.user)
        const search = useSelector((state) => state.matchesData.search)
        const active_sport = useSelector((state) => state.matchesData.active_sport)
        const active_sub_type = useSelector((state) => state.matchesData.active_sub_type)
        const [user, setUser] = useState(getFromLocalStorage("user"))

        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])
        const getSelectedMarkets = () => {
            const markets = marketChoice();

            let live_sub_type = first_match?.sub_type_id


            let url = new URL(window.location)

            let sub_types = live ? live_sub_type : (url.searchParams.get('sub_type_id') || "1,18,29")?.split(",")

            if (!live && sub_types.includes("1")) {
                setThreeWay(true)
            }

            let extraMarkets = []
            if (live) {
                let selectedMarket = markets.filter((market) => Number(market.id) === Number(sub_types))
                if (selectedMarket.length > 0) {
                    extraMarkets.push(selectedMarket[0])
                }

            } else {
                sub_types?.forEach((sub_type) => {
                    let selectedMarket = markets.filter((market) => Number(market.id) === Number(sub_type))

                    if (selectedMarket.length > 0) {
                        extraMarkets.push(selectedMarket[0])
                    }
                })
            }


            setExtraMarketDisplays(extraMarkets)

        }

        useEffect(() => {
            getSelectedMarkets()
            if (first_match) {
                setMarket(first_match?.market_name);
                /**
                 * fixed
                 */
                // setShowX(!["186", "340"]?.includes(first_match.sub_type_id));
                setShowX((["186", "340"] && ["186", "340"].includes(first_match?.sub_type_id)) || false);


            }
        }, [first_match])

        const navigate = useNavigate()
        const navigation_link = useSelector((state) => state.data.navigation_link)
        const pathname = window.location.pathname


        const closeFilter = (option) => {
            // reset filters
            // navigate to the right condition
            if (option === 'sport') {
                dispatchRedux(resetState("active_sport"))
                dispatchRedux(setState('navigation_link',null))
            } else if (option === 'search') {
                dispatchRedux(resetState("search"))
            } else if (option === 'sub_type') {
                dispatchRedux(resetState("active_sub_type"))

            }


            if (navigation_link) {
                if (pathname.includes('live')) {
                    navigate('/live')
                } else {
                    navigate(`${navigation_link}`)
                    dispatchRedux(setState('navigation_link',null))
                }
            } else {
                // If there is no previous navigation, go home or live home
                if (pathname.includes('live')) {
                    navigate('/live')
                } else {
                    navigate('/')

                }


            }
            dispatchRedux(setState('active_link', 79))

        }

        return (

            <Row
                className={`full-mobile sticky-top ${jackpot ? 'd-none ' : user ? "sticky-user d-flex align-items-center " : 'sticky-responsive no-sticky d-flex align-items-center'}`}>
                <div
                    className="top-matches d-flex position-sticky sticky-top shadow-sports-header header-sports live-mobile-top">
                    <div className={"size-info  d-flex col-xs-12 pad left-text px-2"}>
                        <div className="col pad left-text d-flex">
                            <div className="align-self-center col">
                                <h3 className="mx-2 main-heading-1 text-white">

                                    <div className={'d-flex align-items-center gap-2'}>
                                        {live && <span className="live-header">LIVE </span>}
                                        {(active_sport === 'Soccer' && !search) && <span className={'sport-styling'}>
                                            {active_sport} {market && <></>}
                                        </span>}
                                        {(search && !live) &&
                                            <span className={'selected-filters__item d-flex gap-2 align-items-center'}>
                                                <FontAwesomeIcon icon={faXmark} className={'close-filter'}
                                                                 onClick={() => closeFilter("search")}/>
                                                {search}
                                            </span>}
                                        {(active_sport !== 'Soccer' && !search) &&
                                            <span className={'selected-filters__item d-flex gap-2 align-items-center'}>
                                                <FontAwesomeIcon icon={faXmark} className={'close-filter'}
                                                                 onClick={() => closeFilter('sport')}/>
                                                {active_sport}
                                            </span>}

                                        {(active_sub_type && active_sub_type !== '1x2' && !live) &&
                                            <span className={'selected-filters__item d-flex gap-2 align-items-center'}>
                                                <FontAwesomeIcon icon={faXmark} className={'close-filter'}
                                                                 onClick={() => closeFilter('sub_type')}/>
                                                {active_sub_type}
                                            </span>}
                                    </div>
                                </h3>
                            </div>
                        </div>

                        <div className={'col match-detail-container'}></div>
                    </div>
                    {/*match heading*/}
                    <div className={"col flex-row justify-content-between space-bets d-flex align-self-center"}
                         style={{minWidth: "45%"}}>
                        {extraMarketDisplays && !jackpot && (
                            <div className={`${loading && first_match ? 'd-none' : 'd-flex flex-row'}`}>
                                <div className="d-flex flex-column text-center text-white mt-0 fit-ipad w-100">

                                    <div className={"c-btn-group align-self-end"}>
                                        {extraMarketDisplays?.[0]?.extra_markets_display?.map((display, index) => (
                                            <span className={'c-btn-header text-white'} key={index}>
                                              {display}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Row>
        )
    })

const MoreMarketsHeaderRow = React.memo(
    (props) => {
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
            tags,
        } = props;
        const [switches, setSwitches] = useState("scoreboard")
        const dispatchRedux = useDispatch()
        const {width} = useWindowDimensions()

        const switchLmt = (value) => {
            setSwitches(value)
        }

        useEffect(() => {
            window?.SIR("addWidget", "#sr-widget-" + parent_match_id, "match.lmtPlus", {
                branding: {tabs: {option: "icon", variant: "fullWidth"}},
                goalBannerImage:
                    "https://storage.googleapis.com/nareimages/logo-white.webp",
                logo: ["https://storage.googleapis.com/nareimages/logo-dark.webp"],
                momentum: "disable",
                matchId: parent_match_id,
                collapseTo: switches,
                layout: width < 991 ? "single" : 'double',
                scoreboard: "extended",
                detailedScoreboard: "disable",
            });
        })

        useEffect(() => {
            if (sport_id !== undefined && sport_id !== "") {
                const cache = getFromLocalStorage("market_groups")
                if (!cache || live) {
                    dispatchRedux(marketGroups({
                        "sport_id": sport_id
                    }))
                }

            }
        }, [sport_id, getFromLocalStorage("market_groups"), live])
        const navigate = useNavigate()

        let lmtIncludes = [79, 85, 82, 80, 107];
        //click functionality
        const handleLinkClick = (event) => {
            // remove highlight class from all links
            const links = document.querySelectorAll('.link');
            links?.forEach((link) => link.classList.remove('highlight'));

            // add highlight class to clicked link
            event?.currentTarget?.classList.add('highlight');
        }

        return (
            <Row>
                {live || lmtIncludes.includes(sport_id) ? (
                    <>
                        <Row className="panel-header primary-bg">
                            <h4 className="inline-block">
                                <div className={"d-flex justify-content-between w-100 align-items-center px-2"}>
                                    <div className={"d-flex flex-column w-100"}>
                                        <Row className="header-text mb-5 d-flex justify-content-center mt-3">
                                            <div
                                                className={'d-flex remove-backbutton-on-desktop justify-content-start mx-4 spacing-mobile-web align-items-center'}
                                                onClick={() => navigate(-1)}>
                                                <FontAwesomeIcon icon={faAngleLeft} style={{
                                                    fontSize: '20px',
                                                    color: 'var(--light)',
                                                    fontWeight: '700',
                                                    opacity: '0.7'
                                                }}/>
                                            </div>
                                            <Col className={' more_markets_category_sport '}>
                                                {category} {competition}
                                            </Col>
                                        </Row>
                                        <div
                                            className={"d-flex w-100  justify-content-between mb-4 align-items-center"}>
                                            <div
                                                className={"d-flex flex-column team-information_more_markets justify-content-start"}>
                                                <FontAwesomeIcon icon={faShield}
                                                                 style={{fontSize: "24px", opacity: '0.7'}}/>
                                                <span className={'teams-more-markets'}>
                                            {home_team}
                                        </span>
                                            </div>
                                            <div className={"team_vs d-flex flex-column team-information_more_markets"}>
                                            <span>
                                                Vs
                                            </span>
                                                <span>
                                             {!live && <FormatDate2 live={0} start_time={start_time}
                                                                    match_time={start_time}/>}
                                        </span>
                                                <span>
                                             {match_status !== "Ended" && (
                                                 `#${game_id}`
                                             )}
                                        </span>
                                            </div>
                                            <div
                                                className={'d-flex flex-column team-information_more_markets justify-content-end'}>
                                                <FontAwesomeIcon icon={faShield}
                                                                 style={{fontSize: "24px", opacity: '0.7'}}/>
                                                <span className={'teams-more-markets'}>
                                            {away_team}
                                        </span>
                                            </div>
                                        </div>
                                        <div className={"tag_container"}>
                                            {tags?.length
                                                ? tags?.map((tag, index) => (
                                                    <span
                                                        className="tag"
                                                        key={index}
                                                        style={{
                                                            backgroundColor: `${tag.background_color}`,
                                                            color: `${tag.color}`,
                                                            borderRadius: "12px",
                                                            padding: "2px 6px",
                                                            marginLeft: "5px",
                                                            fontSize: "10px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                      {tag.name}
                    </span>
                                                ))
                                                : ""}
                                        </div>
                                    </div>

                                </div>
                            </h4>


                        </Row>
                        <div id={`sr-widget-${parent_match_id}`}></div>
                        <ButtonGroup aria-label="stats button actions" className='w-100 d-flex justify-content-start'>
                            <Button className="place-bet-btn w-25 btn link" title="scoreboard" type="button"
                                    style={{background: "transparent", fontSize: "14px", border: "none"}}
                                    onClick={() => {
                                        switchLmt("scoreboard");
                                        handleLinkClick()
                                    }}>{score ? score : "0:0"}&nbsp;scoreboard</Button>
                            <Button
                                id="lmt_matches_more_markets"
                                onClick={() => {
                                    switchLmt("disable");
                                    handleLinkClick()
                                }}
                                style={{padding: "5px", backgroundColor: "transparent", fontSize: "14px"}}
                                type={"button"}

                                className="btn border-0 d-flex justify-content-center w-25 d-flex align-items-center link"
                                title="statistics">
                                statistics&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <FontAwesomeIcon icon={faChartLine}/>

                            </Button>
                        </ButtonGroup>
                    </>
                ) : (
                    <Row className="panel-header primary-bg">
                        <h4 className="inline-block">
                            {home_team} <small> - </small> {away_team}
                            {tags?.length
                                ? tags?.map((tag, index) => (
                                    <span
                                        className="tag"
                                        key={index}
                                        style={{
                                            backgroundColor: `${tag.background_color}`,
                                            color: `${tag.color}`,
                                        }}
                                    >
                    {tag.name}
                  </span>
                                ))
                                : ""}
                        </h4>
                        {live && (
                            <Row className="header-text">
                                <Col
                                    style={{
                                        color: "#cc5500",
                                        marginBottom: "5px",
                                    }}
                                >
                                    {" "}
                                    {match_status === "Ended" && "Ended "} {score}
                                </Col>
                            </Row>
                        )}
                        <Row className="header-text">
                            <Col>
                                {category} {competition}
                            </Col>
                        </Row>
                        {match_status !== "Ended" && (
                            <Row className="start-time">
                                {live ? (
                                    <Col>
                                        Live:{" "}
                                        <span style={{color: "#cc5500"}}>
                    {match_time || match_status}
                  </span>
                                    </Col>
                                ) : (
                                    <Col>Start: {start_time}</Col>
                                )}

                                <Col>Game ID: {game_id} </Col>
                            </Row>
                        )}
                    </Row>
                )}
            </Row>
        );
    });

const SideBets = React.memo(
    (props) => {
        const {match, live, jackpot} = props;
        const [picked,] = useState();

        return (
            <div
                className={`bet-fix events-odd pad ${picked} align-self-center more-markets-container m-lg-2 align-items-center `}
            >

                {jackpot && (
                    <a
                        className="side w-auto bold "
                        href={`https://s5.sir.sportradar.com/betnaremts/en/match/${match.parent_match_id}`}
                        target={"_blank"}
                        style={{color: "aqua", padding: '0px 13px'}}
                        title={"View Stats"} rel="noreferrer"
                    >
                        {" "}
                        Stats
                    </a>
                )}
                {match?.side_bets > 1 && (
                    <>
                        <a
                            className="side w-auto bold"
                            href={`https://s5.sir.sportradar.com/betnaremts/en/match/${match.parent_match_id}`}
                            target={"_blank"}
                            style={{color: "aqua"}}
                            title={"View Stats"} rel="noreferrer"
                        >
                            {" "}
                            <span className={'stats-mobile more-options-font'}>Stats</span>
                        </a>
                        <span className={'stats-mobile'}>|</span>
                        <Link
                            className="side text-warning w-auto more-markets-text"
                            style={{whiteSpace: "nowrap"}}
                            title={"More Markets"}
                            to={`/match/${live ? "live/" : ""}${
                                live ? match.parent_match_id : match?.match_id
                            }`}
                        >
                            <strong className="more-options-font bold">
                                <span className={'stats-mobile more-markets-text text-warning'}>+{match.side_bets} More Markets</span>
                            </strong>
                        </Link>
                    </>
                )}
            </div>
        );
    });


const MktBtn = React.memo(
    (props) => {
        const {match, mkt, detail, live, marketKey, allMarkets, reference} = props;
        const dispatchRedux = useDispatch()
        const settings = getFromLocalStorage("settings");
        const ref = useRef();
        const picked = useSelector((state) => state.betting.picked);

        const maxPickReached = () => {
            // console.log("max_pick_reached")
            dispatchRedux(removePickedData(" "))
            // dispatchRedux(removePickedData(""));
            Notify({
                status: 401,
                message: "Maximum selections reached",
                token: "",
            });
        };

        const handleButtonOnClick = useCallback(
            (event) => {
                const attributes = {
                    parent_match_id: event.currentTarget.getAttribute("parent_match_id"),
                    match_id: event.currentTarget.getAttribute("match_id"),
                    sub_type_id: event.currentTarget.getAttribute("sub_type_id"),
                    special_bet_value: event.currentTarget.getAttribute("special_bet_value"),
                    odd_key: event.currentTarget.getAttribute("odd_key"),
                    odd_value: event.currentTarget.getAttribute("odd_value"),
                    bet_type: event.currentTarget.getAttribute("bet_type"),
                    odd_type: event.currentTarget.getAttribute("odd_type"),
                    start_time: event.currentTarget.getAttribute("start_time"),
                    home_team: event.currentTarget.getAttribute("home_team"),
                    away_team: event.currentTarget.getAttribute("away_team"),
                    sport_name: event.currentTarget.getAttribute("sport_name"),
                    market_active: event.currentTarget.getAttribute("market_active"),
                };
                let cstm = clear_rep(
                    attributes.parent_match_id +
                    "" +
                    attributes.sub_type_id +
                    attributes.odd_key +
                    (marketKey !== undefined ? marketKey : "")
                );

                const betItems = getBetslip();

                const slip = {
                    match_id: attributes.match_id,
                    parent_match_id: attributes.parent_match_id,
                    special_bet_value: attributes.special_bet_value,
                    sub_type_id: attributes.sub_type_id,
                    bet_pick: attributes.odd_key,
                    start_time: attributes.start_time,
                    odd_value: attributes.odd_value,
                    home_team: attributes.home_team,
                    away_team: attributes.away_team,
                    bet_type: attributes.bet_type,
                    odd_type: attributes.odd_type,
                    sport_name: attributes.sport_name,
                    live: live,
                    ucn: clear_rep(
                        `${attributes.parent_match_id}${attributes.sub_type_id}${attributes.odd_key}${
                            marketKey !== undefined ? marketKey : ""
                        }`
                    ),
                    market_active: attributes.market_active,
                    position: match?.pos || 0,
                };


                if (cstm === match?.ucn) {
                    let betslip;
                    const updateRedux = () => {
                        betslip = picked === match?.ucn ? removeFromSlip(attributes.parent_match_id) : addToSlip(slip);
                        dispatchRedux(picked === match?.ucn ? removePickedData("") : setSelected(reference, cstm));
                        dispatchRedux(removeSelected(reference));
                        dispatchRedux(picked === match?.ucn ? removePickedData("") : setPickedData(cstm));
                    };

                    if (picked === match?.ucn) {
                        updateRedux();
                    } else {
                        if (Object.keys(betItems || {}).length === Number(settings?.sportsBookLimits?.multiBetMaxSelections)) {
                            maxPickReached();
                        } else {
                            updateRedux();
                        }
                    }

                    const betslip_data = {
                        betslip_type: "betslip",
                        data: betslip
                    };

                    dispatchRedux(setMatchBetslip(betslip_data));
                }

            },
            [match?.ucn, picked, settings, allMarkets]);


        const buttonClass = `home-team ${allMarkets ? "all-markets" : ""} ${match.parent_match_id} ${match?.ucn} ${picked.length > 0 && picked === match?.ucn ? 'picked' : ''} c-btn`

        return (
            <button
                ref={ref}
                className={buttonClass}
                home_team={match.home_team}
                odd_type={match?.name || match?.market_name || "1X2"}
                bet_type={live ? 1 : 0}
                start_time={match?.start_time}
                away_team={match.away_team}
                market_active={match.market_active}
                odd_value={mkt === "home_team" ? match?.odds?.home_odd : mkt === "away_team" ? match?.odds?.away_odd : mkt === "draw" ? match?.odds?.neutral_odd || match?.odd_key : match?.odd_value}
                odd_key={match?.[mkt] || match?.odd_key || "draw"}
                parent_match_id={match.parent_match_id}
                match_id={match.match_id}
                custom={match?.ucn}
                id={match?.ucn}
                sport_name={match?.sport_name}
                sport_id={match.sport_id}
                sub_type_id={match.sub_type_id}
                special_bet_value={match?.special_bet_value || ""}
                onClick={(e) => handleButtonOnClick(e)}
            >
                <>
                    {!detail && <span
                        className="theodds odd-fix">{mkt === "home_team" ? match?.odds?.home_odd : mkt === "away_team" ? match?.odds?.away_odd : mkt === "draw" ? match?.odds?.neutral_odd || match?.odd_key : match?.odd_value}</span>}
                    {detail && (
                        <>
        <span className="label label-inverse blueish">
          {match.display_name}
        </span>
                            <span className="label label-inverse blueish odd-value">
          {mkt === "home_team" ? match?.odds?.home_odd : mkt === "away_team" ? match?.odds?.away_odd : mkt === "draw" ? match?.odds?.neutral_odd || match?.odd_key : match?.odd_value}
        </span>
                        </>
                    )}
                </>
            </button>
        );
    });

const OddButton = React.memo(
    (props) => {
        const {match, mkt, detail, live, jackpot, marketKey, allMarkets} = props;
        // const {ucn}=match
        const [picked, setPicked] = useState("");

        const dispatchRedux = useDispatch()
        const settings = getFromLocalStorage("settings");
        const ref = useRef();
        const betslip_data_item = useSelector((state) => state.betting.betslip)
        const jackpot_slip_data_item = useSelector((state) => state.betting.jackpotbestlip)
        let reference = jackpot ? "jp_" + match.match_id + "_selected" : match.parent_match_id + "_selected";


        const updatePicked = () => {

            const referencedState = dispatchRedux(getSelected(reference));

            if (typeof referencedState === 'string') { // Check if referencedState is a string

                let uc = clear_rep(
                    (jackpot?match.match_id :match.parent_match_id )+
                    "" +
                    match.sub_type_id +
                    (match?.[mkt] || match?.odd_key || "draw")
                );
                if (jackpot) {
                    uc = "jp_" + uc;
                }

                if (referencedState === uc) {
                    setPicked("picked");
                } else {
                    setPicked("");
                }

            } else if (typeof referencedState !== "string") {
                setPicked("")
            } else {
                setPicked("")
            }

        };

        useEffect(() => {
            updatePicked()
        }, [betslip_data_item, jackpot_slip_data_item, match]);


        const maxPickReached = () => {
            // console.log("max_pick_reached")
            setPicked("");
            // dispatchRedux(removePickedData(""));
            Notify({
                status: 401,
                message: "Maximum selections reached",
                token: "",
            });
        };

        const handleButtonOnClick = useCallback(
            (event) => {
                const attributes = {
                    parent_match_id: event.currentTarget.getAttribute("parent_match_id"),
                    match_id: event.currentTarget.getAttribute("match_id"),
                    sub_type_id: event.currentTarget.getAttribute("sub_type_id"),
                    special_bet_value: event.currentTarget.getAttribute("special_bet_value"),
                    odd_key: event.currentTarget.getAttribute("odd_key"),
                    odd_value: event.currentTarget.getAttribute("odd_value"),
                    bet_type: event.currentTarget.getAttribute("bet_type"),
                    odd_type: event.currentTarget.getAttribute("odd_type"),
                    start_time: event.currentTarget.getAttribute("start_time"),
                    home_team: event.currentTarget.getAttribute("home_team"),
                    away_team: event.currentTarget.getAttribute("away_team"),
                    sport_name: event.currentTarget.getAttribute("sport_name"),
                    market_active: event.currentTarget.getAttribute("market_active"),
                };
                let cstm = clear_rep(
                    (jackpot?attributes.match_id:attributes.parent_match_id) +
                    "" +
                    attributes.sub_type_id +
                    attributes.odd_key +
                    (marketKey !== undefined ? marketKey : "")
                );
                if (jackpot) {
                    cstm = "jp_" + cstm;
                }
                const betItems = getBetslip();
                const slip = {
                    match_id: attributes.match_id,
                    parent_match_id: attributes.parent_match_id,
                    special_bet_value: attributes.special_bet_value,
                    sub_type_id: attributes.sub_type_id,
                    bet_pick: attributes.odd_key,
                    start_time: attributes.start_time,
                    odd_value: attributes.odd_value,
                    home_team: attributes.home_team,
                    away_team: attributes.away_team,
                    bet_type: attributes.bet_type,
                    odd_type: attributes.odd_type,
                    sport_name: attributes.sport_name,
                    live: live,
                    ucn: clear_rep(
                        `${jackpot?attributes.match_id:attributes.parent_match_id}${attributes.sub_type_id}${attributes.odd_key}${
                            marketKey !== undefined ? marketKey : ""
                        }`
                    ),
                    market_active: attributes.market_active,
                    position: match?.pos || 0,
                };

                if (jackpot) {
                    slip.ucn = "jp_" + slip.ucn;
                }

                if (cstm === match?.ucn) {
                    let betslip;
                    if (picked === "picked") {
                        betslip =
                            jackpot !== true
                                ? removeFromSlip(attributes.parent_match_id)
                                : removeFromJackpotSlip(attributes.match_id);

                        setPicked("");
                        dispatchRedux(removeSelected(reference))
                    } else {

                        if (!jackpot && Object.keys(betItems || {}).length === Number(settings?.sportsBookLimits?.multiBetMaxSelections)) {
                            maxPickReached()
                        } else {
                            betslip =
                                jackpot !== true
                                    ? addToSlip(slip)
                                    : addToJackpotSlip(slip);
                            dispatchRedux(setSelected(reference, cstm))

                            // dispatch({type: "SET", key: reference, payload: cstm});
                        }

                    }
                    const betslip_data = {
                        betslip_type: jackpot ? "jackpotbetslip" : "betslip",
                        data: betslip
                    }
                    dispatchRedux(setMatchBetslip(betslip_data))
                    // dispatch({type: "SET", key: betslip_key, payload: betslip});
                }
            }, [match?.ucn, picked, jackpot, settings, allMarkets]);

        return (
            <button
                ref={ref}
                className={`home-team ${allMarkets ? "all-markets" : jackpot ? " jackpot-buttons-size" : ""} ${
                    jackpot?match.match_id:match.parent_match_id
                } ${match?.ucn} ${picked} c-btn`}
                home_team={match.home_team}
                odd_type={match?.name || match?.market_name || "1X2"}
                bet_type={live ? 1 : 0}
                start_time={match?.start_time}
                away_team={match.away_team}
                market_active={match.market_active}
                odd_value={mkt === "home_team" ? match?.odds?.home_odd : mkt === "away_team" ? match?.odds?.away_odd : mkt === "draw" ? match?.odds?.neutral_odd || match?.odd_key : match?.odd_value}
                odd_key={match?.[mkt] || match?.odd_key || "draw"}
                parent_match_id={match.parent_match_id}
                match_id={match.match_id}
                custom={match?.ucn}
                id={match?.ucn}
                sport_name={match?.sport_name}
                sport_id={match.sport_id}
                sub_type_id={match.sub_type_id}
                special_bet_value={match?.special_bet_value || ""}
                onClick={handleButtonOnClick}
            >
                <>
                    {!detail && <span
                        className="theodds odd-fix">{mkt === "home_team" ? match?.odds?.home_odd : mkt === "away_team" ? match?.odds?.away_odd : mkt === "draw" ? match?.odds?.neutral_odd || match?.odd_key : match?.odd_value}</span>}
                    {detail && (
                        <>
        <span className="label label-inverse blueish">
          {match.display_name}
        </span>
                            <span className="label label-inverse blueish odd-value">
          {mkt == "home_team" ? match?.odds?.home_odd : mkt == "away_team" ? match?.odds?.away_odd : mkt == "draw" ? match?.odds?.neutral_odd || match?.odd_key : match?.odd_value}
        </span>
                        </>
                    )}
                </>
            </button>
        );
    });

const MktOddsButton = React.memo(
    (props) => {
        const {match, mktodds, live, pdown, allMarkets} = props;
        let reference = match.parent_match_id + "_selected";
        const dispatchRedux = useDispatch();

        // Calculate ucn directly
        const fullmatch = {
            ...match,
            ...mktodds,
            ucn: clear_rep(
                match.parent_match_id + "" + mktodds.sub_type_id + (match?.['detail'] || mktodds.odd_key || "draw")
            )
        }; // Append ucn to fullmatch

        const updatePicked = () => {
            const referencedState = dispatchRedux(getSelected(reference));
            if (typeof referencedState === "string") {
                dispatchRedux(setPickedData(referencedState));
            }
        };

        useEffect(() => {
            updatePicked();
        }, [reference, dispatchRedux]);


        return (!pdown && fullmatch?.odd_value !== 'NaN' && fullmatch?.market_active === 1 && fullmatch?.odd_active === 1) ? (
            <MktBtn match={fullmatch} detail mkt={'detail'} live={live} allMarkets={allMarkets} reference={reference}/>
        ) : (
            <EmptyTextRow odd_key={fullmatch?.display_name} allMarkets={allMarkets}/>
        );
    });


const MarketRow = React.memo((props) => {
    const {markets, match, width, live, pdown, allMarkets} = props;
    const [isExpanded,] = useState(false);
    const {state} = useContext(StoreContext);
    const dispatchRedux = useDispatch()
    const moreMatches = useSelector((state) => state.matchesData.more_matches)
    const favoriteMarketValue = useSelector((state) => state.matchesData.favorites_data) || getFromLocalStorage('favorite_markets') || []
    const [userFavoriteMarkets, setUserFavoriteMarkets] = useState(() => {
        return favoriteMarketValue
    });
    const userData = useSelector((state) => state.auth.user)
    const [user, setUser] = useState(getFromLocalStorage("user"))
    useEffect(() => {
        if (userData) {
            setUser(userData || getFromLocalStorage("user"))
        }
    }, [userData, getFromLocalStorage("user")])
    // Get favorite items from the API
    const getFavoriteMarkets = useCallback(async () => {
        dispatchRedux(favoriteMarkets())
    }, []);


    // Append favoriteMarketValue to the userFavoriteMarkets
    useEffect(() => {
        // Combine existing favorites with the new data from the API
        const combinedFavorites = [...userFavoriteMarkets, ...favoriteMarketValue];

        // Filter out duplicates based on sub_type_id
        const updatedFavoriteValues = combinedFavorites.filter(
            (favorite, index, self) => index === self.findIndex(f => f.sub_type_id === favorite.sub_type_id)
        );

        // Update the userFavoriteMarkets state with the combined data (without duplicates)
        setUserFavoriteMarkets(updatedFavoriteValues);

    }, [favoriteMarketValue]);

    // Handle the click event for a specific market to be marked as favorite
    const favoriteMarket = (event, marketId) => {
        // Prevent the click event from propagating to the Accordion
        event.stopPropagation();

        // Check if the marketId is already in the userFavoriteMarkets array
        const isFavorite = userFavoriteMarkets.some(favorite => favorite.sub_type_id === marketId);
        // console.log("isFavorite", isFavorite);

        // Toggle the favorite status
        if (isFavorite) {
            // If already favorite, remove from favorites
            setUserFavoriteMarkets(prevFavorites => prevFavorites.filter(fav => fav.sub_type_id !== marketId));
        } else {
            // If not favorite, add to favorites
            setUserFavoriteMarkets(prevFavorites => [...prevFavorites, {sub_type_id: marketId}]);
        }

        // Update favorite status on the server
        setMarketsFavorite(marketId);
    };


    // Function to set favorite items on the server
    const setMarketsFavorite = (sub_type_id) => {
        const data = {
            "sub_type_id": sub_type_id
        };

        // Immediately update the local state with the new favorite market (optimistically)
        setUserFavoriteMarkets(prevFavorites => [...prevFavorites, sub_type_id]);

        // Dispatch the favoriteMarketsData asyncThunk to set the favorite market on the server
        dispatchRedux(favoriteMarketsData(data))
            .then(() => {
                // API call is successful (asynchronously), no need to update local state here again
                // Fetch updated favorite markets from the API if needed
                getFavoriteMarkets();
            })
            .catch((error) => {
                // Handle error
                console.error("Error setting favorite market:", error);
                // API call failed, revert local state change
                setUserFavoriteMarkets(prevFavorites => prevFavorites.filter(fav => fav !== sub_type_id));
            });
    };


    const valuesforPreexpanding = () => {
        const allMarketNames = [...new Set(moreMatches?.data?.odds?.flatMap(item => item?.sub_type_id))];
        return allMarketNames.slice(0, 5);
    };


    return (
        <div className="top-matches match more-markets">
            <Accordion preExpanded={valuesforPreexpanding()} allowZeroExpanded className="size-accordion">
                <AccordionItem className="pb-2" uuid={markets?.sub_type_id}>
                    <AccordionItemHeading>
                        <AccordionItemButton className={`accordion-button more-markets-button `}>
                            <div className={"d-flex justify-content-between w-100 more-markets-header-text"}>
                                <span className={"d-flex align-items-center"}>
                                    {live && (
                                        <div
                                            style={{
                                                width: '2px',
                                                marginTop: '-5px',
                                                marginRight: '5px',
                                                opacity: 0.6,
                                            }}
                                        >
                                        </div>
                                    )}
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        style={{
                                            fontSize: "20px",
                                            color: userFavoriteMarkets?.some(favorite => favorite.sub_type_id === markets?.sub_type_id) ? 'gold' : 'white',
                                        }}
                                        onClick={(event) => favoriteMarket(event, markets?.sub_type_id)}
                                        className={`${user ? 'favorite' : 'd-none'}`}
                                    />&nbsp; {markets?.market_name}
                                    {/*{console.log("userFav", userFavoriteMarkets)}*/}

                                </span>
                                <FontAwesomeIcon
                                    icon={isExpanded ? faCaretRight : faCaretDown}
                                    style={{fontSize: "20px", color: "var(--light)"}}
                                />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel px-1 pt-1">
                        {markets &&
                            markets[markets?.market_name]?.map((mkt_odds, index) => (
                                <Col uuid={index.toString()} key={index} className="match-detail"
                                     style={{width: width, float: 'left'}}>
                                    <MktOddsButton match={match} mktodds={mkt_odds} live={live} pdown={pdown}
                                                   allMarkets={allMarkets}/>
                                </Col>
                            ))}
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
});


const ColoredCircle = React.memo(
    ({color}) => {
        const styles = {backgroundColor: color};
        return color ? (
            <>
                <span className="colored-circle" style={styles}/>
            </>
        ) : null;
    });

const getUpdatedMatchFromOdds = (props) => {
    const {match, marketName, odd_key, odd_data} = props;

    // Create a newMatch object by spreading the properties of match and odd_data
    let newMatch = {...match, ...odd_data};


    // Calculate the ucn property based on the conditions
    const ucn = clear_rep(
        newMatch.parent_match_id + "" + newMatch.sub_type_id + (
            odd_key
        )
    );

    // Update the newMatch object with the ucn property
    newMatch = {
        ...newMatch,
        ucn: ucn,
        name: marketName,
        odd_key: odd_key,
        odd_value: odd_data.odd_value,
        odd_active: odd_data.odd_active,
        special_bet_value: odd_data.special_bet_value,
    };

    // Remove unnecessary properties
    delete newMatch['odds'];
    delete newMatch['extra_odds'];

    return newMatch;
};

export const FormatDate2 = (props) => {
    const {start_time, match_time, live} = props;

    if (live) {
        return match_time
    } else {
        // Extract the date and time components
        const [dateString, timeString] = start_time.split(' ');
        const [year, month, day] = dateString.split('-');
        const [hour, minute] = timeString.split(':');

        // Format the date and time
        return `${month}/${day} ${hour}:${minute}`;
    }

};

export const FormatDate = (props) => {
    const {start_time, match_time, live, jackpot} = props;

    // Extract the date and time components
    const [dateString, timeString] = start_time?.split(' ');
    const [year, month, day] = dateString?.split('-');
    const [hour, minute] = timeString?.split(':');

    // Create a new Date object
    const dateTime = new Date(year, month - 1, day, hour, minute);

    // Format the date and time
    const formattedDateTime = dateTime.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    if (match_time) {
        return formattedDateTime
    } else if (jackpot) {
        return formattedDateTime
    } else if (live === 1) {
        return match_time
    } else {
        return formattedDateTime;
    }
};
const getSportImageIcon = (
    sport_name,
    folder = "sports",
    topLeagues = false,
    flag = false
) => {
    if (flag) {
        let splitString = sport_name.split(" ");
        sport_name = splitString[0].substr(0, 2).toString().toLowerCase();
    }

    let default_img = "default_sport";
    let sport_image;
    try {
        sport_image = topLeagues
            ? require(`../../assets/img/${folder}/${sport_name}.svg`)
            : require(`../../assets/svg/${folder}/${sport_name}.svg`);
    } catch (error) {
        sport_image = require(`../../assets/img/${default_img}.svg`);
    }
    return sport_image;
};
const MatchRow = React.memo(
    (props) => {

        const {first_match, match, jackpot, live, pdown} = props;
        const [, setExtraMarketDisplays] = useState([])
        const categories = getFromLocalStorage('sport_categories')
        const sport_id = new URL(window.location).searchParams.get('sport_id') || 79
        let sport = categories?.all_sports?.filter((category) => Number(category?.sport_id) === Number(sport_id))
        const [, setSportName] = useState(sport?.[0]?.sport_name || 'Soccer');
        const [, setShowX] = useState(true);
        const [, setMarket] = useState('1x2');
        const [, setThreeWay] = useState(false)


        const getSelectedMarkets = () => {

            const markets = marketChoice();

            let url = new URL(window.location)

            let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29")?.split(",")

            sub_types = [sub_types[0]]


            if (sub_types.includes("1")) {
                setThreeWay(true)
            }

            let extraMarkets = []

            sub_types?.forEach((sub_type) => {
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
                setSportName(first_match?.sport_name);
                setMarket(first_match.market_name);
                /**
                 * fixed up
                 */
                setShowX(!["186", "340"].includes(first_match.sub_type_id));

            }
        }, [first_match?.parent_match_id])

        let url = new URL(window.location)

        let sub_types = (url.searchParams.get('sub_type_id') || "1")?.split(",")
        const [totalMarkets] = useState(sub_types.length)
        let append = totalMarkets - Object.keys(match?.extra_odds || {}).length - 1
        let loops = []
        for (let i = 0; i < append; i++) {
            loops.push(i)
        }

        return (
            <div className="top-matches d-flex flex-sm-column flex-lg-row  styling-matches px-lg-2">
                <div
                    className="to-deskview to-block to-tabview  mx-lg-0 px-sm-4 px-md-2 px-lg-0 py-md-4 py-lg-0 mt-2 container-size-match ">
                    <div
                        className="size-info mobile-for-desktop d-flex col-xs-12 pad left-text flex-row live-col border-0">
                        <div
                            className={`d-flex flex-column px-1 justify-content-sm-center justify-content-md-start change-date1 mobile-remove display-ipad-remove-id ${jackpot ? "jackpot-width" : ""}`}>
                            {live &&
                                <>
                                    <small style={{color: "green"}}> {match?.match_status} </small>

                                </>
                            }

                            <span className={'date-size wrapping px-sm-3 px-md-0 date-remove display-ipad-remove-id'}>
                                           {live === 1 && match?.match_time ? (
                                               <div className={'d-flex gap-3 align-items-center'}>
                                                   <div className={'live-status'}>
                                                       {`${match?.event_status}'`}
                                                   </div>
                                                   <div className={'d-flex align-items-center'} style={{color: 'var(--red)'}}>{`${match?.match_time}'`}</div>
                                               </div>
                                           ) : (
                                               <>

                                                   <>
                                                       {match?.event_status == undefined ? "" :
                                                           <div className={'d-flex align-items-center gap-4'}>
                                                               <span className={'match-status'}>
                                                                    {match?.match_status}'
                                                              </span>
                                                                                           <span className={'live-status'}>
                                                                    {match?.event_status}'
                                                              </span>
                                                           </div>
                                                       }

                                                       <span className={'d-flex align-items-center'} style={live?{color:'var(--red)'}:{}}><FormatDate2 live={live} start_time={match?.start_time}
                                                                    match_time={match?.match_time}/>
                                                       </span>

                                                   </>


                                               </>

                                           )}</span>
                            <>ID: {match?.game_id}</>
                        </div>
                        <div
                            className={`col align-items-center col-xs-12 match-detail-container px-2 change-match only-mobile ${jackpot ? "align-self-center" : ""}`}>
                            <Link className={'odds-container-size'}
                                  to={jackpot ? '#' : `/match/${live ? 'live/' + match?.parent_match_id : match?.match_id}`}>
                                <div className="d-flex flex-column">
                                    <div
                                        className="compt-detail overflow-ellipsis team_category_game d-flex gap-2 align-items-center">
                                        <LazyLoadImage src={getSportImageIcon(match.sport_name || 'Soccer')}
                                                       effect={'blur'} style={{
                                            maxWidth: 'var(--icon-size)',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}/>
                                        <small
                                            className={'d-flex align-items-center'}>{match?.category} | {match?.competition_name}</small>
                                    </div>
                                    <div className="compt-teams d-flex flex-xl-column flex-column flex-md-row">

                                        <div className={'bold compt-teams-item'}>
                                            <span className="opacity-reduce-txt vs-styling">
                                            {live && match?.score.split(':')[0]}{!live && ''}</span>
                                            {match?.home_team}
                                        </div>
                                        <div className={'bold compt-teams-item'}>

                                            <span className="opacity-reduce-txt vs-styling">
                                                {live && match?.score.split(':')[1]}{!live && ''}</span>
                                            {match?.away_team}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className={"tag_container"}>
                                {match?.tags?.length ?
                                    match?.tags.map((tag, index) => (
                                        <span className="tag" key={index}
                                              style={{
                                                  backgroundColor: `${tag.background_color}`,
                                                  color: `${tag.color}`,
                                              }}>
                                                {tag.name}
                                        </span>
                                    ))
                                    : ""}
                            </div>
                        </div>


                    </div>
                    <hr className={"to-block m-sm-1 m-md-1 m-lg-0"}/>
                    <div
                        className={`col d-flex  space-bets justify-content-lg-between  justify-spacing-ipad card-small`}>

                        <div className={`d-flex to-flex-1 ${jackpot ? 'w-100' : " "}`}>
                            <div className="c-btn-group align-self-center to-flex-1 to-tabview">
                                <div className="d-flex flex-row ">
                                    <div
                                        className="d-flex flex-column text-center text-white fit-ipad w-100 align-items-end">

                                        <div
                                            className="d-flex flex-row px-1 justify-content-end change-date1 mobile-only display-ipad-dates">
                                            <div
                                                className={"px-1 wrapping mobile-display-game-id"}>ID: {match?.game_id}</div>
                                            <span className={'date-size wrapping px-3'}>

                                            {live === 1 && match?.match_time ? (
                                                <div className={'d-flex gap-3 align-items-center'}>
                                                    <div className={'live-status'}>
                                                        {`${match?.event_status}'`}
                                                    </div>
                                                    <div className={'d-flex align-items-center'} style={{color:'var(--red)'}}>{`${match?.match_time}'`}</div>
                                                </div>
                                            ) : (
                                                <>
                                                    <>
                                                        {match?.event_status === undefined ? "" :
                                                            <div className={'d-flex align-items-center gap-4'}>
                                                               <span className={'match-status'}>
                                                                    {match?.match_status}'
                                                              </span>
                                                                                            <span className={'live-status'}>
                                                                    {match?.event_status}'
                                                              </span>
                                                            </div>
                                                        }
                                                        <FormatDate2 live={live} start_time={match?.start_time}
                                                                     match_time={match?.match_time}/>

                                                    </>

                                                </>

                                            )}
                                            </span>

                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className={`c-btn-group align-self-center checking ${jackpot ? 'w-100' : ''}`}>
                                {match?.odds?.home_odd
                                    ? (match?.odds?.home_odd && (!pdown && match?.odds?.home_odd && match?.odds.home_odd !== 'NaN' &&
                                        match?.market_active == 1 && match?.odds.home_odd_active == 1 || jackpot)
                                        ? <OddButton match={{
                                            ...match,
                                            ucn: clear_rep(
                                                jackpot ? ("jp_" + match.match_id + "" + match.sub_type_id +
                                                        match?.home_team) :
                                                    (match.parent_match_id + "" + match.sub_type_id +
                                                        match?.home_team)
                                            )
                                        }} mkt="home_team" live={live} jackpot={jackpot}/>
                                        : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) :
                                    match?.odds?.home_odd ? <EmptyTextRow odd_key={match?.odd_key} live={live}/> : ''
                                }
                                {match?.odds?.neutral_odd ?
                                    ((!pdown && match?.odds?.neutral_odd && match.odds.neutral_odd !== 'NaN' &&
                                        match?.market_active == 1 && match.odds.neutral_odd_active == 1 || jackpot)
                                        ? <OddButton match={{
                                            ...match,
                                            ucn: clear_rep(
                                                jackpot ? ("jp_" + match.match_id + "" + match.sub_type_id +
                                                        'draw') :
                                                    (match.parent_match_id + "" + match.sub_type_id +
                                                        'draw')
                                            )
                                        }} mkt="draw" live={live} jackpot={jackpot}/>
                                        : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) : ''
                                }
                                {match?.odds?.away_odd ?
                                    (match?.odds?.away_odd && (!pdown && match?.odds?.away_odd && match?.odds.away_odd !== 'NaN' &&
                                        match.market_active == 1 && match?.odds.away_odd_active == 1 || jackpot)
                                        ? <OddButton match={{
                                            ...match,
                                            ucn: clear_rep(
                                                jackpot ? ("jp_" + match.match_id + "" + match.sub_type_id +
                                                        match?.away_team) :
                                                    (match.parent_match_id + "" + match.sub_type_id +
                                                        match?.away_team)
                                            )
                                        }} mkt="away_team" live={live} jackpot={jackpot}/>
                                        : <EmptyTextRow odd_key={match?.odd_key} live={live}/>) :
                                    match?.odds?.away_odd ? <EmptyTextRow odd_key={match?.odd_key} live={live}/> : ''
                                }
                            </div>

                        </div>

                        {/*mobile  display and odds*/}
                        <div className={"to-profile-check separations to-flex-2"}>
                            {!jackpot && <>
                                {Object.entries(match?.extra_odds || {}).map(([marketName, odds], index) => (
                                    marketName !== '' && (
                                        <div key={index}
                                             className={'d-flex to-flex-1 my-lg-0  w-100'}>

                                            <div
                                                className=" flex-row px-1 justify-content-end change-date1 extra-markets-mobile-date">
                                  <span className={'date-size px-1 wrapping'}>
                                      {(live && match?.match_time) ?
                                          <>{`${match?.match_time}'`}</> : match?.start_time}
                                  </span>
                                                <div
                                                    className={"px-1 wrapping mobile-display-game-id"}>ID: {match?.game_id}</div>

                                            </div>

                                            <div
                                                className={`c-btn-group m-lg-1  align-self-center px-2 to-tabview justify-content-center flex-sm-row flex-md-row flex-lg-row `}>

                                                {
                                                    Object.entries(odds || {}).map(([odd_key, odd_data], index) =>
                                                        (
                                                            <div key={index}
                                                                 className={"d-flex flex-column w-100 margin-l-mobile px-sm-1 px-md-1 px-lg-1 "}>
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
                                                                                key={index} live={live}/>) : (
                                                                            <EmptyTextRow key={index}
                                                                                          odd_key={match?.odd_key}
                                                                                          live={live}/>
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

                        {/*desktop display of odds*/}
                        {!jackpot && <>
                            {Object.entries(match?.extra_odds || {}).map(([marketName, odds], index) => (
                                marketName !== '' && (
                                    <div className={`c-btn-group  align-self-center to-deskview`} key={index}>
                                        {
                                            Object.entries(odds || {}).map(([odd_key, odd_data], index) => {
                                                return odd_data?.odd_active == 1 && odd_data.market_active == 1 ? (
                                                    <OddButton
                                                        match={getUpdatedMatchFromOdds({
                                                            match,
                                                            marketName,
                                                            odd_key,
                                                            odd_data
                                                        })}
                                                        key={index} live={live}/>) : (
                                                    <EmptyTextRow odd_key={match?.odd_key} live={live}/>)
                                            })
                                        }
                                    </div>
                                )
                            ))
                            }

                            {!live && loops?.map((value, index) => (
                                <div className={`c-btn-group align-self-center to-deskview`} key={index}>
                                    <EmptyTextRow odd_key={match?.odd_key} live={live}/>
                                    <EmptyTextRow odd_key={match?.odd_key} live={live}/>
                                </div>
                            ))}

                        </>
                        }
                        <div className={'display-ipad-more-options justify-content-end'}>

                            {!pdown && !jackpot &&
                                <SideBets match={match} live={live} style={{d: "inline"}}/>}
                        </div>
                    </div>


                </div>
            </div>
        )

    })


export const MarketList = React.memo(
    (props) => {
        const {live, allMarkets, pdown} = props;
        const [filters, setFilters] = useState({});
        const [groupMarketsAvailable, setGroupMarketsAvailable] = useState(null)
        //  fetching More Markets from redux state
        const matchwithmarkets = useSelector((state) => state.matchesData.more_matches)
        const [selectedMarketGroup, setSelectedMarketGroup] = useState('all'); // Initialize with 'all' or your default group
        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))


        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])

        const filterMarkets = (value, group) => {
            const elements = matchwithmarkets?.data?.odds;
            const filtered = elements?.filter((market) => {
                return market?.market_name?.toLowerCase().includes(value);
            });

            const match = filters?.data?.match;

            const ob = {
                data: {
                    match: match,
                    odds: filtered,
                },
            };
            setFilters(ob);
        };
        const filterMarketGroups = (group_id) => {
            const elements = matchwithmarkets?.data?.odds;
            let filteredMarkets;
            setSelectedMarketGroup(group_id)
            if (group_id === "favorite") {
                filteredMarkets = elements?.filter((market) => Number(market?.is_favorite) === 1)
            } else {
                filteredMarkets = elements?.filter((market) => Number(market?.group_id) === Number(group_id) || group_id === 'all')
            }
            const match = filters?.data?.match;

            const ob = {
                data: {
                    match: match,
                    odds: filteredMarkets,
                },
            };
            setGroupMarketsAvailable(Object.keys(ob?.data?.odds || {}).length !== 0);
            setFilters(ob);
        };

        useEffect(() => {
            const elements = matchwithmarkets?.data?.odds;

            // Filter the markets based on the selectedMarketGroup 
            let filteredMarkets;
            if (selectedMarketGroup === "favorite") {
                filteredMarkets = elements?.filter((market) => Number(market?.is_favorite) === 1)
            } else {
                filteredMarkets = elements?.filter((market) => Number(market?.group_id) === Number(selectedMarketGroup) || selectedMarketGroup === 'all');
            }
            const match = matchwithmarkets?.data?.match

            const ob = {
                data: {
                    match: match,
                    odds: filteredMarkets,
                },
            };
            setFilters(ob)
            setGroupMarketsAvailable(Object.keys(ob?.data?.odds || {}).length !== 0);


        }, [matchwithmarkets]);

        const mkGroup = useSelector((state) => state.matchesData.market_groups)

        const [market_groups, setMarketGroups] = useState(getFromLocalStorage("market_groups"))
        useEffect(() => {
            const cache = getFromLocalStorage("market_groups")
            setMarketGroups(mkGroup || cache)
        }, [mkGroup])
        // const endIndex = startIndex + perPage;
        const marketsToShow = Object.entries(filters?.data?.odds || {});
        return (
            <div className="matches full-width" style={{marginBottom: "0px"}}>

                <div className={`web-element ${allMarkets && 'bottom-more-markets-mobile '}`}
                     style={{marginBottom: "7px"}}>
                    {!filters ? (
                        <div className="top-matches">Event not available for betting.</div>
                    ) : (
                        <MoreMarketsHeaderRow
                            {...filters?.data?.match}
                            score={filters?.data?.match?.score}
                            live={live}
                        />
                    )
                    }
                    <div
                        className="col-md-12 position-sticky shadow-lg primary-bg mb-1 px-2 py-1"
                        style={{height: "42px", backgroundColor: "#3c5a6c !important"}}
                    >
                        <Input
                            type="text"
                            className={"form-control h-100  border-0 text-default all-markkets-search "}
                            style={{
                                fontSize: "14px",
                                borderRadius: "9px",
                                backgroundColor: "#fff",
                                color: "grey",
                                height: "40px!important",
                            }}
                            onInput={(event) => filterMarkets(String(event.target.value).toLowerCase())}
                            placeholder={"Type to search for market ..."}
                        />
                    </div>
                    <div className="text-white market-groups-container">
                        {market_groups?.length > 0 && user && <button onClick={() => filterMarketGroups('favorite')}
                                                                      className={`market-group-pill text-white badge badge-pill badge-primary bg-transparent p-2 ${selectedMarketGroup === 'favorite' ? 'active-group' : ''}`}>
                            Favorite Markets
                        </button>}
                        {market_groups?.length > 0 && <button onClick={() => filterMarketGroups('all')}
                                                              autoFocus
                                                              className={`market-group-pill text-white badge badge-pill badge-primary bg-transparent p-2 ${selectedMarketGroup === 'all' ? 'active-group' : ''}`}>
                            All Markets
                        </button>}
                        {market_groups?.map((group, index) => (
                            <button
                                key={index}
                                className={`market-group-pill text-white badge badge-pill badge-primary bg-transparent p-2 ${(Number(selectedMarketGroup) === Number(group?.id)) ? 'active-group' : ''}`}
                                onClick={() => filterMarketGroups(group?.id)}>
                                {group?.name}
                            </button>
                        ))}
                    </div>
                    {marketsToShow.map(([mkt_id, markets], index) => {
                        return <MarketRow
                            allMarkets={allMarkets}
                            market_id={mkt_id}
                            markets={markets}
                            width={markets[markets?.market_name].length === 3 ? "33.333%" : "50%"}
                            match={filters?.data?.match}
                            key={index}
                            live={live}
                            pdown={pdown}
                        />

                    })}
                    {groupMarketsAvailable === false && (
                        <div className={'text-warning col-md-12 text-center p-2'}>
                            There are no markets in this group.
                        </div>
                    )}
                </div>
            </div>
        );
    });

export const JackpotHeader = React.memo(
    (props) => {
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

    })
const clear_rep = (str) => {
    return str.replace(/\s/g, "");
};
// const clean_rep = (str) => {
//     str = str.replace(/[^A-Za-z0-9\-]/g, "");
//     return str.replace(/-+/g, "-");
// };

export const JackpotMatchList = React.memo(
    (props) => {
        const {matches} = props;
        const dispatchRedux = useDispatch()
        useEffect(() => {
            const betslip = getJackpotBetslip()
            const betslip_data = {
                betslip_type: "jackpotbetslip",
                data: betslip
            }
            Object.entries(betslip || {}).map(([matchId, match]) => {

                let uc = clear_rep("jp_" + match?.parent_match_id.toString() + match?.sub_type_id.toString() + (match?.bet_pick || "draw"));
                const reference = "jp_" + matchId + "_selected";
                dispatchRedux(setSelected(reference, uc));
            });

            dispatchRedux(setMatchBetslip(betslip_data))

        }, []);

        return (
            <div className="matches full-width mt-1 ">
                <MatchHeaderRow jackpot={true} first_match={matches ? matches[0] : []}/>
                <div className={'row d-flex flex-row justify-content-between'}>
                    <div className="col-md-12 text-center">
                        <div className={'text-white col text-header-jackpot'}>
                            <p>Wekelea Jackpot Bet bila worries na Nare Auto pick.</p>
                        </div>
                    </div>
                </div>
                <div className="web-element jackpot-page top-login-background-img-bg w-100">
                    {matches ?
                        Object.entries(matches?.data).map(([key, match], index) => (
                            <MatchRow match={match} jackpot key={index}/>
                        )) : <></>
                    }
                    {(matches !== null && matches?.length === 0) &&
                        <div className="top-matches row  mx-2">
                            No events found.
                        </div>
                    }
                </div>
            </div>
        )
    })

const MatchList = React.memo(
    (props) => {
        const {live, matches, pdown, fetching, three_way, onEndReached} = props;
        // console.log("matches_data_match_list", matches);
        const listRef = useRef();
        const dispatchRedux = useDispatch()

        const observerRef = useRef(); // Ref to hold the observer

        useEffect(() => {

            observerRef.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && !fetching) {
                    // Call the onEndReached function to fetch more data
                    onEndReached();
                    // Stop observing to avoid fetching repeatedly
                    observerRef.current.unobserve(entries[0].target);
                }
            });

            if (listRef.current) {
                observerRef.current.observe(listRef.current);
            }

            return () => {
                if (observerRef.current) {
                    observerRef.current.disconnect(); // Disconnect the observer when the component unmounts
                }
            };
        }, [onEndReached, fetching]);

        useEffect(() => {

            if (!fetching) {
                // After fetching and updating the data, set up the observer again
                if (listRef.current && observerRef.current) {
                    observerRef.current.observe(listRef.current);
                }
            }

        }, [matches, fetching, observerRef]);


        useEffect(() => {
            const betslip = getBetslip()
            const betslip_data = {
                betslip_type: 'betslip',
                data: betslip
            }
            Object.entries(betslip || {}).map(([matchId, match]) => {
                let uc = clear_rep(
                    match.parent_match_id +
                    "" +
                    match.sub_type_id +
                    (match?.bet_pick || "draw")
                );
                const reference = matchId + "_selected";
                dispatchRedux(setSelected(reference, uc));
            });

            dispatchRedux(setMatchBetslip(betslip_data))

        }, []);

        return (
            <div className="matches full-width">
                <div className="web-element top-login-background-img-bg w-100">
                    {matches &&
                        Object.entries(matches).map(([key, match], index) => (
                            <MatchRow match={match} key={index} live={live} pdown={pdown} three_way={three_way}/>
                        ))
                    }

                    {(matches?.length === 0) &&
                        <div className="top-matches row  mx-2">
                            No events found.
                        </div>
                    }
                    <div ref={listRef} style={{overflow: 'hidden'}}></div>
                </div>
            </div>
        )
    })
export default React.memo(MatchList);
