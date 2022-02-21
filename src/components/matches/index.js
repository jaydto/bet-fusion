import React, {useState, useEffect, useMemo, useContext, useRef} from 'react';
import padlock from '../../assets/img/padlock.png';
import { Context }  from '../../context/store';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Skeleton from 'react-loading-skeleton'
import {
    addToSlip, 
    removeFromSlip, 
    clearSlip,
} from '../utils/betslip';

import 'react-loading-skeleton/dist/skeleton.css';
import CurrencyFormat from 'react-currency-format';


const clean = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = () =>{
    return (
        <div className="btn btn-disabled draw" 
         style={{width:"100%", height:"30px", padding:"2px"}}>
         <span className="label label-inverse">
             <img style={{opacity:"0.3", width:"15px"}} src={padlock} alt="--" />
         </span>
        </div>
    );
}

const MatchHeaderRow = (props) => {
    const {live} = props;

    return (
        <Container>
        <Row className="events-header">
            <div className="col-sm-8 left-text">
                <h3 className="main-heading-1">
                   { live && <span className="live-header">LIVE </span> } Soccer 
                 </h3>
            </div>
            <div className="col-sm-1">1</div>
            <div className="col-sm-1 events-odd">X</div>
            <div className="col-sm-1">2</div>
            <div className="col-sm-1 events-odd"></div>
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
        live
    } = props;

    return (
        <Container>
          <Row className="panel-header primary-bg">
             
            <h4 className="inline-block"> 
                {home_team} <small>VS</small> {away_team} 
            </h4>
            { live && 
                <Row className="header-text">
                   <Col style={{color:"#cc5500", marginBottom:"5px"}}>{score}</Col>
                </Row>
            }
            <Row className="header-text">
               <Col>{category} {competition}</Col>
            </Row>
            <Row className="start-time">
            { live 
               ?  <Col>Live: <span style={{color:"#cc5500"}}>{ match_time }'</span></Col>
               : <Col>Start: { start_time }</Col> }

                 <Col>Game ID: {game_id} </Col> 
            </Row>
          </Row>
        </Container>
    )
}

const SideBets = (props) => {
    const {match, live} = props;
    const [picked, setPicked] = useState();

    return (

        <div className={`col-sm-1 events-odd pad ${picked}`} >
            <a className="side" 
                href={`match/${ live ? 'live/' : '' }${
                    live ? match.parent_match_id : match?.match_id}`
                }>+{match.side_bets}
            </a>
        </div>
    )

}

const OddButton = (props) => {
    const {match, mkt, detail, live} = props
    const [ucn, setUcn] = useState('');
    const [picked, setPicked] = useState('');
    const [oddValue, setOddValue] = useState(null);
    const [state, dispatch] = useContext(Context);                              
    const ref = useRef();
    let reference = match.match_id + "_selected";

    useMemo(() => {
        let betslip = state?.betslip;
        let uc = clean(
            match.match_id 
            + "" + match.sub_type_id 
            + (match?.[mkt] ||match?.odd_key || 'draw') 
        );
        if((betslip?.[match.match_id]?.match_id == match.match_id) 
            && uc === betslip?.[match.match_id]?.ucn){
            setPicked('picked');
        }
    }, [state?.betslip])

    useMemo(() => {
        if(match){
            let uc = clean(
                match.match_id 
                + "" + match.sub_type_id 
                + (match?.[mkt] || match?.odd_key || 'draw') 
            );
            setUcn(uc);
            if(mkt === 'home_team'){
                setOddValue(match.odds.home_odd)
            } else if(mkt === 'away_team'){
                setOddValue(match.odds.away_odd)
            }else if(mkt === 'draw'){
                setOddValue(match.odds.neutral_odd)
            } else {
                setOddValue(match.odd_value);
            }
        }
    }, []);

    useMemo(() => {
        if(state?.[reference] ){
            if(state?.[reference].startsWith('remove.')){
                setPicked('');
            } else {
                
                let uc = clean(
                    match.match_id 
                    + "" + match.sub_type_id 
                    + (match?.[mkt] ||match?.odd_key || 'draw') 
                );
                if(state?.[reference] == uc){
                    setPicked('picked')
                } else {
                    setPicked('');
                }
            }
        } 
    }, [state?.[reference]])
    
    const handleButtonOnClick = (event) => {
       let pmid = event.currentTarget.getAttribute("parent_match_id");
       let mid = event.currentTarget.getAttribute("match_id");
       let stid = event.currentTarget.getAttribute("sub_type_id"); 
       let sbv = event.currentTarget.getAttribute("special_bet_value"); 
       let oddk = event.currentTarget.getAttribute("odd_key"); 
       let  odd_value = event.currentTarget.getAttribute("odd_value"); 
       let  bet_type = event.currentTarget.getAttribute("odd_type"); 
       let  home_team = event.currentTarget.getAttribute("home_team"); 
       let  away_team = event.currentTarget.getAttribute("away_team"); 
       let cstm = clean(mid + "" + stid + oddk)

       let slip = {
           "match_id":mid,
           "parent_match_id":pmid,
           "special_bet_value": sbv,
           "sub_type_id":stid,
           "bet_pick":oddk,
           "odd_value":odd_value,
           "home_team":home_team,
           "away_team":away_team,
           "bet_type":bet_type,
           "ucn":cstm,
       }
       
       if(cstm == ucn) {
           let betslip;
           if(picked == 'picked') {
                betslip = removeFromSlip(mid);
                setPicked('');
           } else {
               betslip = addToSlip(slip);
               dispatch({type:"SET", key:reference, payload:cstm});
           }
           dispatch({type:"SET", key:"betslip", payload:betslip});
       }
    }

    return (
        <button 
            ref={ref}
            className={`home-team ${match.match_id} ${ucn} ${picked}`}
            home_team={match.home_team}
            odd_type={match?.name||"1x2"} 
            bet_type={live ? 'live': 'prematch' }
            away_team={match.away_team}
            odd_value={oddValue}
            odd_key={match?.[mkt] || match?.odd_key || 'draw'}
            parent_match_id={match.parent_match_id}
            match_id={match.match_id}
            custom={ ucn } 
            sub_type_id={match.sub_type_id}
            special_bet_value={match?.special_bet_value || ''}
            onClick={handleButtonOnClick} >
                { !detail && 
                    (
                        <span className="theodds">
                            <i className="caret fas fa-caret-down"></i>
                            {oddValue}
                        </span>
                    )
                }
                { detail && 
                    (<>
                      <span 
                        className="label label-inverse blueish">
                        {match.odd_key}
                      </span>
                      <span 
                        className="label label-inverse blueish odd-value">
                          {oddValue}
                     </span>
                    </> ) }
        </button>
    )
}


const MarketRow = (props) => {
  const { markets, match, market_id, width, live} = props;
  

  const ucn = clean(
            match.match_id 
            + "" + match.sub_type_id 
            + (match.display) 
        );

 const MktOddsButton = (props) => {
    const { match, mktodds, live} = props;
    let fullmatch = {...match, ...mktodds};
    return <OddButton match={fullmatch} detail mkt={"detail"} live={live}/>
 }

  return (
        <div className="top-matches match">
          <Row className="top-matches header">
              { live && <div style={{width:"2px", marginTop:"-5px", marginRight:"5px", opacity:0.6}}><ColoredCircle color="#cc5500" /> </div> } {market_id} 
          </Row>
          
          { markets && markets.map((mkt_odds) =>{
            return (<>
                  <Col className="match-detail" style={{width:width, float:"left"}}>
                      <MktOddsButton  match={match} mktodds={mkt_odds} live={live}/>
                  </Col>
              </>)
          }) 
        }
        </div>
    )
}

const ColoredCircle = ({ color }) => {
  const styles = { backgroundColor: color };
  return color ? (
          <>
            <span className="colored-circle" style={styles} />
          </>
        ) : null;
};

const MatchRow = (props) => {
    const [betslip, setBetslip] = useState([]);
    const {match, jackpot, live} = props;

    return (
        <Row className="top-matches">
            <div className="col-sm-1 pad left-text">
                { live && <> <small style={{color:"green"}} > {match?.match_status} </small><br/></> }
                {match?.match_time && <>{`${match.match_time}'`}</> || match?.start_time}
            </div>
            <div className="col-sm-7">
                <div className="compt-detail"> {match.category} | {match.competition_name}</div>
                <div className="compt-teams">
				    { live && (match?.match_status !== 'ended') && <ColoredCircle color="red" /> }
				    {match.home_team} 
                    <span className="opacity-reduce-txt vs-styling">
                        { live && match?.score }
                        { !live && 'VS'}
                    </span>
                    {match.away_team}
                </div>
            </div>
            <Row className={`${jackpot ? 'col-4' : 'col-3'} m-0 p-0`}>
                <div className="col-sm-4 match-div-col" style={{padding:0}}>
                    { match?.odds?.home_odd 
                        ?  <OddButton match={match}  mkt="home_team" live={live}/> 
                        :  <EmptyTextRow /> 
                    }
                </div>
                <div className="col-sm-4 events-odd match-div-col" style={{padding:0}}>
                    { match?.odds?.neutral_odd 
                        ?  <OddButton match={match}  mkt="draw" live={live}/> 
                        :  <EmptyTextRow /> 
                    }
                </div>
                <div className="col-sm-4 match-div-col" style={{padding:0}}>
                    { match?.odds?.away_odd 
                        ?  <OddButton match={match}  mkt="away_team" live={live}/> 
                        :  <EmptyTextRow /> 
                    }
                </div>
            </Row>
            { !jackpot && (match?.side_bets > 1 ) && <SideBets  match={match} live={live} style={{d:"inline"}}/> }
        </Row>
    )

} 

export const MarketList = (props) => {

    const [state, dispatch] = useContext(Context);                              
    const [matchWithMarkets, setMatchWithMarkets] = useState();
    const { live }  = props;
    useEffect(()=>{
        if(state?.matchwithmarkets) {
            setMatchWithMarkets(state.matchwithmarkets);
        }
    }, [state?.matchwithmarkets])

    return (
        <div className="matches full-width">

            <MoreMarketsHeaderRow 
                {...matchWithMarkets?.data?.match}  
                score={matchWithMarkets?.data?.match?.score}
                live={live} 
            />

            <Container className="web-element">
                { matchWithMarkets?.data && 
                    Object.entries(matchWithMarkets?.data?.odds).map(([mkt_id, markets]) => {
                        return <MarketRow 
                            market_id={mkt_id}
                            markets={markets} 
                            width={markets.length === 3 ? "33.333%" : "50%"}
                            match={matchWithMarkets?.data?.match}
                            key={mkt_id}
                            live={live}
                            />
                    })
                }
               { !matchWithMarkets && [...Array(10).keys()].map((index, n) => (
                   <div className="react-loading" key={n}  >
                      <Container className=" top-matches">
                          <Row style={{height:40, opacity:0.7}}>
                           <Col lg="1" >
                               <Skeleton className="pad left-text"></Skeleton>
                           </Col>
                           <Col className="col-sm-7">
                               <Skeleton className="compt-detail"></Skeleton>
                               <Skeleton className="compt-teams"></Skeleton>
                           </Col>

                           <Col className="col-sm-1 match-div-col" >
                                <Skeleton className="home-team" ></Skeleton>
                            </Col>

                           <Col className="col-sm-1 events-odd match-div-col">
                                <Skeleton className="home-team" ></Skeleton>
                           </Col>
                           <Col className="col-sm-1 match-div-col" >
                                <Skeleton className="awy-team" ></Skeleton>
                           </Col>
                           <Col className="col-sm-1 events-odd pad" >
                               <Skeleton className="side" />
                           </Col>
                          </Row>
                       </Container>
                  </div>) )
               }
            </Container>
        </div>
    )

}

export const JackpotHeader = (props) => {
   
    const [state, dispatch] = useContext(Context);                              
    const [jackpot, setJackpot] = useState();
    useEffect(()=>{
        if(state?.jackpotmatches) {
            setJackpot(state.jackpotmatches?.meta);
        }
    }, [state?.jackpotmatches])

   return (
        <Container >
        <Row className="top-matches">                                     
           <Row className="jp-header-text">
               <div className="jp-header-top">
                  {jackpot?.type} - {jackpot?.total_games } GAMES {jackpot?.name} 
               </div>
           </Row>
           <Row className="jp-header-text">
               <div className="jp-header-amount">
               <CurrencyFormat 
                        value={jackpot?.jackpot_amount} 
                        displayType={'text'} 
                        thousandSeparator={true} prefix={'KES'} />
               </div>
           </Row>
            
        </Row>      
       </Container>
   )

}

export const JackpotMatchList = (props) => {
    const [state, dispatch] = useContext(Context);                              
    const [matches, setMatches] = useState();
    useEffect(()=>{
        if(state?.jackpotmatches) {
            setMatches(state.jackpotmatches);
        }
    }, [state?.jackpotmatches])

    return (
        <div className="matches full-width">

            <MatchHeaderRow  />

            <Container className="web-element">
                { matches && Object.entries(matches?.data).map(([key, match]) => (
                        <MatchRow match={match}  jackpot key={key}/>
                   ))
                }
               { !matches && [...Array(10).keys()].map((index, n) => (
                   <div className="react-loading" key={n}  >
                      <Container className=" top-matches">
                          <Row style={{height:40, opacity:0.7}}>
                           <Col lg="1" >
                               <Skeleton className="pad left-text"></Skeleton>
                           </Col>
                           <Col className="col-sm-7">
                               <Skeleton className="compt-detail"></Skeleton>
                               <Skeleton className="compt-teams"></Skeleton>
                           </Col>

                           <Col className="col-sm-1 match-div-col" >
                                <Skeleton className="home-team" ></Skeleton>
                            </Col>

                           <Col className="col-sm-1 events-odd match-div-col">
                                <Skeleton className="home-team" ></Skeleton>
                           </Col>
                           <Col className="col-sm-1 match-div-col" >
                                <Skeleton className="awy-team" ></Skeleton>
                           </Col>
                           <Col className="col-sm-1 events-odd pad" >
                               <Skeleton className="side" />
                           </Col>
                          </Row>
                       </Container>
                  </div>) )
               }
            </Container>
        </div>
    )
}

const MatchList = (props) => {
    const [state, dispatch] = useContext(Context);                              
    const [matches, setMatches] = useState();
    const { live} = props;
    useEffect(()=>{
        if(state?.matches) {
            setMatches(state.matches);
        }
    }, [state?.matches])

    return (
        <div className="matches full-width">

            <MatchHeaderRow  live={live} />

            <Container className="web-element">
                { matches && Object.entries(matches).map(([key, match]) => (
                        <MatchRow match={match}  key={key} live={live} />
                   ))
                }
               { !matches && [...Array(10).keys()].map((index, n) => (
                   <div className="react-loading" key={n}  >
                      <Container className=" top-matches">
                          <Row style={{height:40, opacity:0.7}}>
                           <Col lg="1" >
                               <Skeleton className="pad left-text"></Skeleton>
                           </Col>
                           <Col className="col-sm-7">
                               <Skeleton className="compt-detail"></Skeleton>
                               <Skeleton className="compt-teams"></Skeleton>
                           </Col>

                           <Col className="col-sm-1 match-div-col" >
                                <Skeleton className="home-team" ></Skeleton>
                            </Col>

                           <Col className="col-sm-1 events-odd match-div-col">
                                <Skeleton className="home-team" ></Skeleton>
                           </Col>
                           <Col className="col-sm-1 match-div-col" >
                                <Skeleton className="awy-team" ></Skeleton>
                           </Col>
                           <Col className="col-sm-1 events-odd pad" >
                               <Skeleton className="side" />
                           </Col>
                          </Row>
                       </Container>
                  </div>) )
               }
            </Container>
        </div>
    )
}
export default MatchList;
