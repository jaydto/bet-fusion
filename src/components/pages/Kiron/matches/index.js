import React, {useCallback, useContext, useEffect, useRef, useState,} from "react";
import {StoreContext } from "../../../../context/store"
import "./matches.css";
import {addToKironSlip, removeFromKironSlip,} from "../../../utils/betslip";

import "react-lazy-load-image-component/src/effects/blur.css";

import {Spinner} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";

const clean = (_str) => {
  _str = _str.replace(/[^A-Za-z0-9\-]/g, "");
  return _str.replace(/-+/g, "-");
};


const marketChoice = () => {
  const markets = [
    [
      {
        market_id: 3,
        market_name: "1X2",
        description: "Match Result",
        position: 1
      },
      {
        market_id: 5,
        market_name: "DC",
        description: "Double Chance",
        position: 2
      },
      {
        market_id: 1,
        market_name: "CS",
        description: "Correct Score (Full Time)",
        position: 3
      },
      {
        market_id: 4,
        market_name: "H1X2",
        description: "Half-Time Result",
        position: 4
      },
      {
        market_id: 6,
        market_name: "DCH",
        description: "Double Chance (Half-Time)",
        position: 4
      },
      {
        market_id: 7,
        market_name: "TG15",
        description: "Over/Under 1.5",
        position: 4
      },
      {
        market_id: 8,
        market_name: "TG25",
        description: "Over/Under 2.5",
        position: 4
      },
      {
        market_id: 9,
        market_name: "TG35",
        description: "Over/Under 3.5",
        position: 4
      },
      {
        market_id: 10,
        market_name: "HX1",
        description: "Handicap -1",
        position: 4
      },
      {
        market_id: 11,
        market_name: "HX2",
        description: "Handicap -2",
        position: 4
      },
      {
        market_id: 12,
        market_name: "DR",
        description: "Half Time / Full Time",
        position: 4
      },
      {
        market_id: 13,
        market_name: "TG",
        description: "Total Goals",
        position: 4
      },
      {
        market_id: 14,
        market_name: "GG",
        description: "Goal:Goal Full Time",
        position: 4
      },
      {
        market_id: 15,
        market_name: "HGG",
        description: "Goal:Goal Half Time",
        position: 4
      },
      {
        market_id: 16,
        market_name: "1X2OU15",
        description: "1X2 and Over/Under 1.5",
        position: 4
      },
      {
        market_id: 17,
        market_name: "1X2OU25",
        description: "1X2 and Over/Under 2.5",
        position: 4
      },
      {
        market_id: 18,
        market_name: "1X2OU35",
        description: "1X2 and Over/Under 3.5",
        position: 4
      },
      {
        market_id: 19,
        market_name: "1X2OU45",
        description: "1X2 and Over/Under 4.5",
        position: 4
      },
      {
        market_id: 20,
        market_name: "1X2OU55",
        description: "1X2 and Over/Under 5.5",
        position: 4
      },
      {
        market_id: 21,
        market_name: "1X2G",
        description: "1X2 and Goal/No Goal",
        position: 4
      },
      {
        market_id: 22,
        market_name: "T1OU15",
        description: "Team 1 Over/Under 1.5",
        position: 4
      },
      {
        market_id: 23,
        market_name: "T2OU15",
        description: "Team 2 Over/Under 1.5",
        position: 4
      },
      {
        market_id: 24,
        market_name: "T1G",
        description: "Team 1 Goal/No Goal",
        position: 4
      },
      {
        market_id: 25,
        market_name: "T2G",
        description: "Team 2 Goal/No Goal",
        position: 4
      },
      {
        market_id: 26,
        market_name: "TGOE",
        description: "Total Goals Odd/Even",
        position: 4
      },
      {
        market_id: 27,
        market_name: "TFG",
        description: "Time of First Goal",
        position: 4
      },
      {
        market_id: 28,
        market_name: "FTS",
        description: "First Team to Score",
        position: 4
      },
      {
        market_id: 29,
        market_name: "FPS",
        description: "First Player to Score",
        position: 4
      },
      {
        market_id: 30,
        market_name: "MG",
        description: "Multi-Goals",
        position: 4
      },
      {
        market_id: 31,
        market_name: "PIM",
        description: "Penalty in Match",
        position: 4
      },
      {
        market_id: 2,
        market_name: "HS",
        description: "Half-Time Score",
        position: 5
      }
    ]
  ];

  return markets;
};

export const MatchRow = React.memo(
    (props) => {
  const {  match, three_way, competition_id} = props;

  const { state, dispatch } = useContext(StoreContext);
  const [market, setMarket] = useState("1x2");

  const [threeWay, setThreeWay] = useState(false);

  const markets = marketChoice();

  const getSelectedMarkets = (three_way) => {
    const sub_types=three_way
    if (sub_types=="3") {
      setThreeWay(true);
    }

    let extraMarkets = [];

    let selectedMarket = markets.find((innerArray) =>
        innerArray.some((market) => market.market_id === Number(three_way))
    );

    if (selectedMarket) {
      const marketName = selectedMarket.find(
          (market) => market.market_id === Number(three_way)
      ).market_name;
      setMarket(marketName)

    }
  };

  useEffect(() => {
    getSelectedMarkets(three_way);

    if (three_way) {

    }
  }, [three_way]);


  return (
      match?.odds?.length>3?
          <div className="col-12">
            <div className="event" style={{position: "static !important"}}>
              <div className="event-t">
                <div className="team-badge">
                  <LazyLoadImage src={match?.home_team_image}/>
                  <div className={"bold team"}>{match.home_team_name}</div>

                </div>
                <span className="divider">—</span>
                <div className="team-badge">
                  <LazyLoadImage src={match?.away_team_image}/>
                  <div className={"bold team"}>{match.away_team_name}</div>
                </div>
              </div>
              <div className="event-market">
                <div className="d-flex w-100">
                  <div className="btn-odd-option text-center bold">
                    <div className="btn-wrapper">
                      {match.odds.map((odd, index) => (
                          <OddButton
                              key={index}
                              oddkey={Object.keys(odd)[0]}
                              odds={Object.values(odd)[0]}
                              marketName={match?.odd_type}
                              eventTime={match?.event_time}
                              parentId={match?.parent_match_id}
                              marketId={match?.market_id}
                              homeTeam={match?.home_team_name}
                              awayTeam={match?.away_team_name}
                              competition_id={match?.competition_id}
                              round_id={match?.round_id}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>:
          <div  className="top-matches kiron d-flex flex-sm-column flex-lg-row px-0 align-items-center">
            <div className="to-deskview to-block to-tabview  mx-lg-0 px-sm-0 mx-sm-0  px-md-0 py-0 pb-0 mt-0 container-size ">
              <div className="size-info  d-flex col-xs-12 pad left-text flex-row live-col">

                <div className={`col text-left playing-teams-wrap  align-items-center col-xs-12 match-detail-container change-match px-1`}>

                  <div style={{width:'100%'}}>
                    <div className="compt-teams d-flex flex-xl-column flex-column ">
                      <div className="team-badge">
                        <LazyLoadImage src={match?.home_team_image}/>
                        <div className={"bold team"}>
                          {match.home_team_name}
                        </div>
                      </div>
                      <div className="team-badge">
                        <LazyLoadImage src={match?.away_team_image}/>
                        <div className={"bold team"}>{match.away_team_name}</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className={`col d-flex  flex-row  space-bets  justify-content-lg-between align-items-center `}>
                {/*mobile*/}
                <div className="d-flex w-100 justify-content-end">


                  {match.odds.map((odd, index) => (
                      <OddButton
                          key={index}
                          oddkey={Object.keys(odd)[0]}
                          odds={Object.values(odd)[0]}
                          marketName={match?.odd_type}
                          eventTime={match?.event_time}
                          parentId={match?.parent_match_id}
                          marketId={match?.market_id}
                          homeTeam={match?.home_team_name}
                          awayTeam={match?.away_team_name}
                          competition_id={match?.competition_id}
                          round_id={match?.round_id}
                      />
                  ))}
                </div>


              </div>
            </div>
          </div>


  );
});

const   OddButton = React.memo(
    (props) => {
  const {  mkt, detail, odds,oddkey, marketName, eventTime,homeTeam, awayTeam,parentId,marketId,  allMarkets, competition_id,round_id } = props;

  const [ucn, setUcn] = useState("");
  const [parentMatchId, setParentMatchId]=useState('')
  const [picked, setPicked] = useState("");

  const { state, dispatch } = useContext(StoreContext);
  const ref = useRef();
  let reference = parentId+"_selectedK";

  const [betslip_key, setBetslipKey] = useState("kironbetslip");
  const updateBeslipKey = useCallback(() => {
    setBetslipKey("kironbetslip");
  }, []);

  useEffect(() => {
    updateBeslipKey();
  }, [updateBeslipKey]);

  const updateMatchPicked = useCallback(() => {
    if (state?.[reference]) {
      if (state?.[reference].startsWith('remove.')) {
        setPicked('');
      } else {
        let uc = clean(
            parentId
            + "" +marketId
            +""+oddkey||'draw'

        );

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
    const button=event.currentTarget;
    const attributes = {
      parent_match_id: button.getAttribute("parent_match_id"),
      sub_type_id: button.getAttribute("sub_type_id"),
      odd_value: button.getAttribute("odd_value"),
      odd_key: button.getAttribute("odd_key"),
      bet_type: button.getAttribute("bet_type"),
      odd_type: button.getAttribute("odd_type"),
      home_team: button.getAttribute("home_team"),
      away_team: button.getAttribute("away_team"),
      competition_id: button.getAttribute('competition_id'),
      unique: button.getAttribute('uuid'),
      start_time: button.getAttribute('start_time'),
      round_id: button.getAttribute('round_id')
    };
    let cstm = clean(`${attributes.parent_match_id}${attributes.sub_type_id}${(attributes.odd_key||'draw')}`);
    setUcn(cstm)


    const slip = {
      parent_match_id: attributes.parent_match_id,
      market_id: attributes.sub_type_id,
      odd_value: attributes.odd_value,
      home_team: attributes.home_team,
      odd_key: attributes.odd_key,
      competition_id: attributes.competition_id,
      round_id: attributes.round_id,
      start_time: attributes.start_time,
      outcome_id: attributes.odd_key,
      away_team: attributes.away_team,
      // bet_type: attributes.bet_type,
      odd_type: attributes.odd_type,
      ucn: clean(`${attributes.parent_match_id}${attributes.sub_type_id}${(attributes.odd_key||'draw')}`),
      // position: 0,
    };
    setParentMatchId (attributes.parent_match_id)


    let betslip;
    if (cstm === ucn) {
      if (picked === 'picked') {
        betslip = removeFromKironSlip(parentMatchId)
        setUcn('')
        setPicked('');
      }
      else {
        betslip = addToKironSlip(slip);

        dispatch({type: "SET", key: reference, payload: cstm});
      }
      dispatch({type: "SET", key: betslip_key, payload: betslip});
    }
    else{
      betslip= addToKironSlip(slip);

      dispatch({type: "SET", key: reference, payload: cstm});

      setPicked('picked')
    }
    dispatch({type: "SET", key: betslip_key, payload: betslip});


  };


  return (
      <button
          ref={ref}
          className={`home-team kiron-btn ${picked } ${allMarkets ? "all-markets" : ""} ${parentId} ${ucn} c-btn `}
          home_team={homeTeam}
          away_team={awayTeam}
          odd_type={marketName || "1X2"}
          odd_key={oddkey}
          odd_value={odds}
          competition_id={competition_id}
          parent_match_id={parentId}
          custom={ucn}
          start_time={eventTime}
          uuid={parentId+marketId+oddkey}
          sub_type_id={marketId}
          season_id={''}
          end_time={''}
          outcome_id={''}
          outcome_name={''}
          round_id={round_id}
          onClick={handleButtonOnClick}
      ><span className="theodds odd-fix" style={{lineHeight:"1",opacity:'0.5'}}>{oddkey}</span>
        {!detail && <span className="theodds odd-fix" style={{lineHeight:"1"}}>{odds}</span>}
      </button>
  );
});

const MatchList = React.memo(
    (props) => {
  const {state,dispatch}=useContext(StoreContext )
  const {
    pdown,
    three_way,
    fetching,
    competition_id
  } = props;

  return (
      <div className="matches full-width table table-striped">

        <div className="web-element px-lg-0 ">
          {
              state?.nare_league_matches&&
              Object.entries(state?.nare_league_matches).map(([key, match], index) => (
                  <MatchRow
                      match={match}
                      key={index}
                      pdown={pdown}
                      three_way={three_way}
                      competition_id={competition_id}
                  />
              ))

          }
          {fetching && (
              <div className={`text-center mt-2 text-white d-block`}>
                <Spinner animation={"grow"} size={"lg"} />
              </div>
          )}
          {state?.nare_league_matches !== null && state?.nare_league_matches?.length === 0 && (
              <div className="top-matches row kiron mx-2">No events found.</div>
          )}
        </div>
      </div>
  );
});
export default MatchList;
