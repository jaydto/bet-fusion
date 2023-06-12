import React, {useState, useEffect, useContext, useCallback, useRef, useLayoutEffect} from 'react';
import {Context} from '../../context/store';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import bgJackpot from '../../assets/img/banner/products/jackpot.webp'
import {
  addToSlip,
  removeFromSlip,
  removeFromJackpotSlip,
  addToJackpotSlip,
  getBetslip, getJackpotBetslip
} from '../utils/betslip';
import './matches.css'
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

import Notify from "../utils/Notify";

import {Button, ButtonGroup} from "react-bootstrap";

const clean = (_str) => {
  _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
  return _str.replace(/-+/g, '-');
}

const EmptyTextRow = (props) => {
  const {odd_key, classname,live,allMarkets} = props;

  return (
      <button className={`${classname} ${allMarkets ? ' all-markets ':''} home-team btn btn-disabled match-detail c-btn ${live?"c-resize":"width-button-odd"}`}
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
  const categories = getFromLocalStorage('categories')
  const sport_id = new URL(window.location).searchParams.get('sport_id') || 79
  let sport = categories?.all_sports?.filter((category) => category.sport_id == sport_id)
  const [sportName, setSportName] = useState(sport!=null?sport?.[0].sport_name || 'Soccer':"");    const [showX, setShowX] = useState(true);
  const [market, setMarket] = useState('1x2');
  const [state,]=useContext(Context)
  const [user, ] = useState(getFromLocalStorage("user"));
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

      <Row className={`full-mobile sticky-top ${jackpot?'sticky-jackpot ':user?"sticky-user ":'sticky-responsive no-sticky '}px-lg-3`}>
        <div className="top-matches d-flex position-sticky sticky-top shadow-sports-header header-sports">
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
          <div className={`col  to-deskview flex-row justify-content-between ${state?.kiron_page==true&&' space-bets '}`}>
            {threeWay &&
                <div className="d-flex flex-row ">
                  <div className="d-flex flex-column text-center text-white fit-ipad ">

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
                  extraMarketDisplays?.map((extra_market,index) => (

                      <div className={'d-flex flex-row'} key={index}>
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
                className="bet-fix events-odd pad undefined align-items-md-start align-items-lg-center more-markets-container m-lg-2 col-3 d-flex h-100 d-flex align-self-center justify-content-md-start justify-content-lg-center">
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
    tags,
  } = props;
  const [switches, setSwitches]=useState("scoreboard")

  const switchLmt=(value)=>{
    setSwitches(value)
  }
  useEffect(() => {
    window.SIR("addWidget", "#sr-widget", "match.lmtPlus", {
      branding: { tabs: { option: "icon", variant: "fullWidth" } },
      goalBannerImage:
          "https://storage.googleapis.com/nareimages/logo-white.webp",
      logo: ["https://storage.googleapis.com/nareimages/logo-dark.webp"],
      momentum: "disable",
      matchId: parent_match_id,
      collapseTo: switches,
      layout: "single",
      scoreboard: "extended",
      detailedScoreboard: "disable",
    });
  });

  let lmtIncludes = [79, 85, 82, 80, 107];
  //click functionality
  const handleLinkClick=(event)=> {
    // remove highlight class from all links
    const links = document.querySelectorAll('.link');
    links.forEach((link) => link.classList.remove('highlight'));

    // add highlight class to clicked link
    event.currentTarget.classList.add('highlight');
  }

  return (
      <Row>
        {live || lmtIncludes.includes(sport_id) ? (
            <>
              <Row className="panel-header primary-bg">
                <h4 className="inline-block">
                  {home_team} <small> - </small> {away_team}
                  {tags?.length
                      ? tags?.map((tag) => (
                          <span
                              className="tag"
                              key={tag.name}
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
                </h4>

                <Row className="header-text">
                  <Col>
                    {category} {competition}
                  </Col>
                </Row>
                {match_status !== "Ended" && (
                    <Row className="start-time">
                      <Col>Game ID: {game_id} </Col>
                    </Row>
                )}
              </Row>
              <div id="sr-widget" className=""></div>
              <ButtonGroup aria-label="stats button actions" className='w-100 d-flex justify-content-start'>
                <Button  className="place-bet-btn w-25 btn link" title="scoreboard" type="button" style={{background:"transparent",fontSize:"14px"}} onClick={() => {switchLmt("scoreboard");handleLinkClick()}}>{score?score:"0:0"}&nbsp;scoreboard</Button>
                <Button
                    id=""
                    onClick={() => {switchLmt("disable"); handleLinkClick()}}
                    style={{padding: "5px", backgroundColor: "transparent",fontSize:"14px"}}
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
                    ? tags?.map((tag) => (
                        <span
                            className="tag"
                            key={tag.name}
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
                          <span style={{ color: "#cc5500" }}>
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
};

const SideBets = (props) => {
  const { match, live, jackpot } = props;
  const [picked] = useState();

  return (
      <div
          className={`bet-fix events-odd pad ${picked} align-self-center more-markets-container m-lg-2 align-items-center `}
      >

        {jackpot && (
            <a
                className="side w-auto bold "
                href={`https://s5.sir.sportradar.com/betnaremts/en/match/${match.parent_match_id}`}
                target={"_blank"}
                style={{ color: "aqua",padding:'0px 13px'}}
                title={"View Stats"}
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
                  style={{ color: "aqua" }}
                  title={"View Stats"}
              >
                {" "}
               <span className={'stats-mobile'}>Stats</span>
                <span className={'stats-desktop'}><FontAwesomeIcon className={"icon-size"} icon={faChartLine}/> </span>
              </a>
              <span className={'stats-mobile'}>|</span>
              <Link
                  className="side text-warning w-auto more-markets-text"
                  style={{ whiteSpace: "nowrap" }}
                  title={"More Markets"}
                  to={`/match/${live ? "live/" : ""}${
                      live ? match.parent_match_id : match?.match_id
                  }`}
              >
                <strong className="small bold">
                  <span className={'stats-mobile more-markets-text'}>+{match.side_bets} More Markets</span>
                  <span className={'stats-desktop more-markets-text'}>+{match.side_bets}</span>
                </strong>
              </Link>
            </>
        )}
      </div>
  );
};

const OddButton = (props) => {
  const { match, mkt, detail, live, jackpot, subType, marketKey, allMarkets } =
      props;

  const [ucn, setUcn] = useState("");

  const [picked, setPicked] = useState("");

  const [oddValue, setOddValue] = useState(null);

  const [state, dispatch] = useContext(Context);
  const ref = useRef();
  let reference = match.match_id + "_selected";
  const [betslip_key, setBetslipKey] = useState("betslip");
  const updateBeslipKey = useCallback(() => {
    if (jackpot) {
      setBetslipKey("jackpotbetslip");
    }
  }, [jackpot]);

  useEffect(() => {
    updateBeslipKey();
  }, [updateBeslipKey]);

  const updatePickedChoices = useCallback(() => {
    const betslip = jackpot ? getJackpotBetslip() : getBetslip() || {};

    let uc = clean(
        match.match_id +
        "" +
        match.sub_type_id +
        (match?.[mkt] || match?.odd_key || "draw")
    );

    if (
        betslip?.[match.match_id]?.match_id == match.match_id &&
        uc == betslip?.[match.match_id]?.ucn
    ) {

      setPicked("picked");
 } else {

      setPicked("");
    }
  }, [picked, state[betslip_key]]);

  useEffect(() => {
    updatePickedChoices();
  }, [updatePickedChoices]);

  useEffect(() => {
    updatePickedChoices();
  }, [updatePickedChoices]);

  const updateOddValue = useCallback(() => {
    if (match) {
      const { match_id, sub_type_id, odds, odd_key } = match;

      let uc = clean(
          match_id + "" + sub_type_id + (match?.[mkt] || odd_key || "draw")
      );
      setUcn(uc);
      switch (mkt) {
        case "home_team":
          setOddValue(odds.home_odd);
          break;
        case "away_team":
          setOddValue(odds.away_odd);
          break;
        case "draw":
          setOddValue(odds.neutral_odd || odd_key);
          break;
        default:
          setOddValue(match.odd_value);
      }
    }
  }, [match]);

  useLayoutEffect(() => {
    updateOddValue();
  }, [updateOddValue]);

  const updateMatchPicked = useCallback(() => {
    if (state?.[reference]) {
      if (state?.[reference].startsWith("remove.")) {
        setPicked("");
      } else {
        let uc = clean(
            match.match_id +
            "" +
            match.sub_type_id +
            (match?.[mkt] || match?.odd_key || "draw")
        );

        if (state?.[reference] === uc) {
          setPicked("picked");
        } else {
          setPicked("");
        }
      }
    }
  }, [state?.[reference]]);

  useEffect(() => {
    updateMatchPicked();
  }, [updateMatchPicked]);

  let message = {
    status: 401,
    message: "Maximum selections reached",
    token: "",
  };
  const maxPickReached = () => {
    setPicked("");
    Notify(message);
  };

  const handleButtonOnClick = (event) => {
    const attributes = {
      parent_match_id: event.currentTarget.getAttribute("parent_match_id"),
      match_id: event.currentTarget.getAttribute("match_id"),
      sub_type_id: event.currentTarget.getAttribute("sub_type_id"),
      special_bet_value: event.currentTarget.getAttribute("special_bet_value"),
      odd_key: event.currentTarget.getAttribute("odd_key"),
      odd_value: event.currentTarget.getAttribute("odd_value"),
      bet_type: event.currentTarget.getAttribute("bet_type"),
      odd_type: event.currentTarget.getAttribute("odd_type"),
      home_team: event.currentTarget.getAttribute("home_team"),
      away_team: event.currentTarget.getAttribute("away_team"),
      sport_name: event.currentTarget.getAttribute("sport_name"),
      market_active: event.currentTarget.getAttribute("market_active"),
    };
    let cstm = clean(
        attributes.match_id +
        "" +
        attributes.sub_type_id +
        attributes.odd_key +
        (marketKey !== undefined ? marketKey : "")
    );

    {

    }
    const slip = {
      match_id: attributes.match_id,
      parent_match_id: attributes.parent_match_id,
      special_bet_value: attributes.special_bet_value,
      sub_type_id: attributes.sub_type_id,
      bet_pick: attributes.odd_key,
      odd_value: attributes.odd_value,
      home_team: attributes.home_team,
      away_team: attributes.away_team,
      bet_type: attributes.bet_type,
      odd_type: attributes.odd_type,
      sport_name: attributes.sport_name,
      live: live,
      ucn: clean(
          `${attributes.match_id}${attributes.sub_type_id}${attributes.odd_key}${
              marketKey !== undefined ? marketKey : ""
          }`
      ),
      market_active: attributes.market_active,
      position: match?.pos || 0,
    };


    if (cstm === ucn) {
      // console.log("cstn pre start: ",cstm+" ucn: "+ucn )
      let betslip;
      if (picked === "picked") {

        betslip =
            jackpot !== true
                ? removeFromSlip(attributes.match_id)
                : removeFromJackpotSlip(attributes.match_id);

        setPicked("");
      } else {
        // console.log("cstn pre slip: ",cstm+" ucn: "+ucn )
        betslip =
            jackpot !== true
                ? (getBetslip() && Object.keys(getBetslip())?.length <= 29) ||
                getBetslip() == null
                    ? addToSlip(slip)
                    : maxPickReached()
                : addToJackpotSlip(slip);

        dispatch({ type: "SET", key: reference, payload: cstm });
      }
      dispatch({ type: "SET", key: betslip_key, payload: betslip });
    }
  };

  return (
      <button
          ref={ref}
          className={`home-team ${allMarkets ? "all-markets" : ""} ${
              match.match_id
          } ${ucn} ${picked} c-btn`}
          home_team={match.home_team}
          odd_type={match?.name || match?.market_name || "1X2"}
          bet_type={live ? 1 : 0}
          away_team={match.away_team}
          market_active={match.market_active}
          odd_value={oddValue}
          odd_key={match?.[mkt] || match?.odd_key || "draw"}
          parent_match_id={match.parent_match_id}
          match_id={match.match_id}
          custom={ucn}
          id={ucn}
          sport_name={match?.sport_name}
          sport_id={match.sport_id}
          sub_type_id={match.sub_type_id}
          special_bet_value={match?.special_bet_value || ""}
          onClick={handleButtonOnClick}
      >
        {!detail && <span className="theodds odd-fix">{oddValue}</span>}
        {detail && (
            <>
          <span className="label label-inverse blueish">
            {match.display_name}
          </span>
              <span className="label label-inverse blueish odd-value">
            {oddValue}
          </span>
            </>
        )}
      </button>
  );
};

const MarketRow = (props) => {
  const { markets, match, market_id, width, live, pdown, allMarkets } = props;

  const MktOddsButton = (props) => {
    const { match, mktodds, live, pdown } = props;
    const fullmatch = { ...match, ...mktodds };
    // console.log("Market odds", fullmatch)
    return !pdown &&
    fullmatch?.odd_value !== "NaN" &&
    fullmatch.market_active == 1 &&
    fullmatch.odd_active == 1 ? (
        <OddButton
            match={fullmatch}
            detail
            mkt={"detail"}
            live={live}
            allMarkets={allMarkets}
        />
    ) : (
        <EmptyTextRow odd_key={fullmatch?.odd_key} allMarkets={allMarkets} />
    );
  };

  return (
      <div className="top-matches match">
        <Row className="top-matches header d-flex justify-content-center">
          {live && (
              <div
                  style={{
                    width: "2px",
                    marginTop: "-5px",
                    marginRight: "5px",
                    opacity: 0.6,
                  }}
              >
                <ColoredCircle color="#cc5500" />
              </div>
          )}
          {market_id}
        </Row>

        {markets &&
            markets.map((mkt_odds) => {
              //  console.log(mkt_odds)
              return (
                  <>
                    <Col
                        key={mkt_odds.id}
                        className="match-detail"
                        style={{ width: width, float: "left" }}
                    >
                      <MktOddsButton
                          match={match}
                          mktodds={mkt_odds}
                          live={live}
                          pdown={pdown}
                      />
                    </Col>
                  </>
              );
            })}
      </div>
  );
};

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
    if(width<=767){
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
      <div className="top-matches d-flex flex-sm-column flex-lg-row  styling-matches">
        <div
            className="to-deskview to-block to-tabview  mx-lg-0 px-sm-4 px-md-4 px-lg-0  py-md-4 py-lg-0 container-size ">
          <div className="size-info mobile-for-desktop d-flex col-xs-12 pad left-text flex-row live-col">


            <div className={`d-flex flex-column px-1 justify-content-sm-center justify-content-md-start change-date1 mobile-remove display-ipad-remove-id ${jackpot?"jackpot-width":""}`}>
              {live &&
                  <>
                    <small style={{color: "green"}}> {match?.match_status} </small>

                  </>
              }

              <span className={'date-size wrapping px-sm-3 px-md-0 date-remove display-ipad-remove-id'}>
                                           {live==1 && match?.match_time ? (
                                               <div className={'d-flex gap-3'}>
                                                 <div className={'live-status'}>
                                                   {`${match.event_status}'`}
                                                 </div>
                                                 <>{`${match.match_time}'`}</>
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
                                                   {new Date(match?.start_time).getDate() +
                                                       "/" +
                                                       (Number(new Date(match?.start_time).getMonth()) + 1) +
                                                       " " +
                                                       (match?.match_time == undefined ? "": match?.match_time)}

                                                 </>


                                               </>

                                           )}</span>
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
          <div className={`col d-flex  flex-row   ${width>1259?'':'space-bets'} justify-content-lg-between  justify-spacing-ipad card-small`}>

            {width>767?
                <div className={"d-flex to-flex-1"}>
                  <div className="c-btn-group align-self-center to-flex-1 to-tabview">
                    {threeWay &&
                        <div className="d-flex flex-row ">
                          <div className="d-flex flex-column text-center text-white fit-ipad w-100">
                            <div className={"d-sm-none d-md-none"}>
                                            <span className='d-flex justify-content-start'>
                                                {match?.tags?.map((tag,index)=>(
                                                    <span key={index} className='px-2 w-100 ' style={{color:tag?.color, backgroundColor:tag?.background_color, fontSize:"8px", borderRadius:"10px", marginLeft:"3px", width:"4px", marginTop:"8px"}}>
                                                            <strong>
                                                            {tag.name}
                                                            </strong>
                                                        </span>
                                                ))}
                                            </span>
                            </div>
                            <div className="d-flex flex-row px-1 justify-content-end change-date1 mobile-only display-ipad-dates">
                                            <span className={'date-size wrapping px-3'}>
                                            {live==1 && match?.match_time ? (
                                                <div className={'d-flex gap-3'}>
                                                  <div className={'live-status'}>
                                                    {`${match.event_status}'`}
                                                  </div>
                                                  <>{`${match.match_time}'`}</>
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
                                                    {new Date(match?.start_time).getDate() +
                                                        "/" +
                                                        (Number(new Date(match?.start_time).getMonth()) + 1) +
                                                        " " +
                                                        (match?.match_time == undefined ? "": match?.match_time)}

                                                  </>


                                                </>

                                            )}
                                            </span>
                              <div className={"px-1 wrapping"}>ID: {match?.game_id}</div>

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
                                             {live==1 && match?.match_time ? (
                                                 <div className={'d-flex gap-3'}>
                                                   <div className={'live-status'}>
                                                     {`${match.event_status}'`}
                                                   </div>
                                                   <>{`${match.match_time}'`}</>
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
                                                     {new Date(match?.start_time).getDate() +
                                                         "/" +
                                                         (Number(new Date(match?.start_time).getMonth()) + 1) +
                                                         " " +
                                                         (match?.match_time == undefined ? "": match?.match_time)}

                                                   </>


                                                 </>

                                             )}</span>
                        <div className={"px-1 wrapping"}>ID: {match?.game_id}</div>

                      </div>



                    </div>
                  </div>

                </div>
                :""}
            {width<=767?<div className="c-btn-group align-self-center markets-container-data-check  ">{
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

                              <div className=" flex-row px-1 justify-content-end change-date1 extra-markets-mobile-date">
                                  <span className={'date-size px-1 wrapping'}>
                                      {(live && match?.match_time) ?
                                          <>{`${match.match_time}'`}</> : match?.start_time}
                                  </span>
                              <div className={"px-1 wrapping"}>ID: {match?.game_id}</div>

                          </div>

                          <div
                              className={`c-btn-group m-lg-1  align-self-center px-2 to-tabview justify-content-center flex-sm-row flex-md-row flex-lg-row `}>

                            {
                              Object.entries(odds || {}).map(([odd_key, odd_data],index) =>
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
            <div className={'to-tabview mobile-to-desktop-options justify-content-end'}>
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
            <div className={'display-ipad-more-options'}>

              {!pdown && !jackpot &&
                  <SideBets match={match} live={live} style={{d: "inline"}}/>}
            </div>
          </div>


        </div>
      </div>
  )

}


export const MarketList = (props) => {
  const { live, allMarkets, pdown } = props;
  const [state, dispatch] = useContext(Context);

  const [filters, setFilters] = useState({});
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  //  fetching More Markets from redux state
  const matchwithmarkets = allMarkets
      ? state?.all_markets
      : dispatch({ type: "SET", key: "all_markets", payload: null });



  const filterMarkets = (value) => {
    let filtered = [];
    let elements = Array.from(
        Object.entries(matchwithmarkets?.data?.odds || {})
    );
    elements.filter((mkt_id, markets) => {
      if (mkt_id[0].toLowerCase().includes(value)) {
        filtered[mkt_id[0]] = mkt_id[1];
      }
      return [];
    });

    let match = filters?.data?.match;

    let ob = {
      data: {
        match: match,
        odds: Object.assign({}, filtered),
      },
    };

    setFilters(ob);
  };



  useEffect(() => {
    setFilters(matchwithmarkets);

  }, [matchwithmarkets]);


  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const marketsToShow = Object.entries(filters?.data?.odds || {}).slice(startIndex, endIndex);

  return (
      <div  className="matches full-width" style={{marginBottom:"0px"}}>

        <div className="web-element" style={{marginBottom:"7px"}}>
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
              style={{ height: "42px", backgroundColor: "#3c5a6c !important" }}
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
                onInput={(event) => filterMarkets(event.target.value)}
                placeholder={"Type to search for market ..."}
            />
          </div>


          {marketsToShow.map(([mkt_id, markets]) => {
            return  <MarketRow
                allMarkets={allMarkets}
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


        </div>
      </div>
  );
};

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
      <div className="matches full-width mt-1 ">

        <MatchHeaderRow jackpot={true} first_match={matches ? matches[0] : []}/>
        <div className={'row d-flex flex-row justify-content-between shadow-lg '}>
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
        <Row className="web-element top-login-background-img-bg">
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
  const {live, matches, pdown,fetching, three_way} = props;
  const listInnerRef = useRef();



  return (
      <div className="matches full-width"  >
        {matches && <MatchHeaderRow live={live} first_match={matches ? matches[0] : {}}/>}

        <Row className="web-element px-lg-3 top-login-background-img-bg ">
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
export default React.memo(MatchList);