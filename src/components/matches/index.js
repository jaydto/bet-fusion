import React, {useState, useEffect, useMemo, useContext, useCallback, useRef} from 'react';
import { Context }  from '../../context/store';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {
    addToSlip, 
    removeFromSlip, 
    removeFromJackpotSlip,
    addToJackpotSlip,
} from '../utils/betslip';
import CurrencyFormat from 'react-currency-format';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import padlock from '../../assets/img/padlock.png';


const clean = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = (props) =>{
    const { odd_key } = props;
    return (
        <div className="btn btn-disabled " 
         style={{width:"100%", height:"30px", padding:"2px"}}>
         { odd_key && <span className="et label btn-disabled ">{odd_key}</span>}
         <span className="label label-inverse odd-value">
             <LazyLoadImage 
                style={{opacity:"0.3", width:"15px"}} 
                src={padlock} 
                effect="blur"
                alt="--" />
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
    const [picked, ] = useState();

    return (

        <div className={`col-sm-1 events-odd pad ${picked}`} >
            <a className="side" 
                href={`/match/${ live ? 'live/' : '' }${
                    live ? match.parent_match_id : match?.match_id}`
                }>+{match.side_bets}
            </a>
        </div>
    )

}

const OddButton = (props) => {
    const {match, mkt, detail, live, jackpot} = props
    const [ucn, setUcn] = useState('');
    const [picked, setPicked] = useState('');
    const [oddValue, setOddValue] = useState(null);
    const [state, dispatch] = useContext(Context);                              
    const ref = useRef();
    let reference = match.match_id + "_selected";
    const [betslip_key, setBetslipKey] = useState('betslip');

    const updateBeslipKey = useCallback(() => {
        if(jackpot) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot]);

    useEffect(() => {
        updateBeslipKey();
    }, [updateBeslipKey])

    const updatePickedChoices = () => {
        let betslip = state?.[betslip_key];
        let uc = clean(
            match.match_id 
            + "" + match.sub_type_id 
            + (match?.[mkt] ||match?.odd_key || 'draw') 
        );
        if((betslip?.[match.match_id]?.match_id == match.match_id) 
            && uc == betslip?.[match.match_id]?.ucn){
            setPicked('picked');
        } else {
            setPicked('');
        }
    };

    useEffect(() => {
        updatePickedChoices();
    }, [picked]);


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


    const updateMatchPicked = useCallback(() => {
        if(state?.[reference] ){
            if(state?.[reference].startsWith('remove.')){
                setPicked('');
            } else {
                
                let uc = clean(
                    match.match_id 
                    + "" + match.sub_type_id 
                    + (match?.[mkt] ||match?.odd_key || 'draw') 
                );

                if(state?.[reference] === uc){
                    setPicked('picked')
                } else {
                    setPicked('');
                }
            }
        } 
    }, [state?.[reference]])

    useEffect(()=> {
        updateMatchPicked();
    }, [updateMatchPicked])
    
    const handleButtonOnClick = (event) => {
       let pmid = event.currentTarget.getAttribute("parent_match_id");
       let mid = event.currentTarget.getAttribute("match_id");
       let stid = event.currentTarget.getAttribute("sub_type_id"); 
       let sbv = event.currentTarget.getAttribute("special_bet_value"); 
       let oddk = event.currentTarget.getAttribute("odd_key"); 
       let  odd_value = event.currentTarget.getAttribute("odd_value"); 
       let  bet_type = event.currentTarget.getAttribute("bet_type"); 
       let  odd_type = event.currentTarget.getAttribute("odd_type"); 
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
           "odd_type":odd_type,
           "live":live,
           "ucn":cstm,
       }
       
       if(cstm === ucn) {
           let betslip;
           if(picked === 'picked') {
                betslip = jackpot !== true 
                   ? removeFromSlip(mid)
                   : removeFromJackpotSlip(mid);

                setPicked('');
           } else {
               betslip = jackpot !== true 
                   ? addToSlip(slip)
                   : addToJackpotSlip(slip);

               dispatch({type:"SET", key:reference, payload:cstm});
           }
           dispatch({type:"SET", key:betslip_key, payload:betslip});
       }
    }

    return (
        <button 
            ref={ref}
            className={`home-team ${match.match_id} ${ucn} ${picked}`}
            home_team={match.home_team}
            odd_type={match?.name || match?.market_name || "1X2"} 
            bet_type={live ? 1: 0 }
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
  
    const MktOddsButton = (props) => {
        const { match, mktodds, live} = props;
        let fullmatch = {...match, ...mktodds};
        return fullmatch?.odd_value !== 'NaN'
             ? <OddButton match={fullmatch} detail mkt={"detail"} live={live}/>
             :  <EmptyTextRow odd_key={fullmatch?.odd_key}/> ; 
    }

    return (
        <div className="top-matches match">
          <Row className="top-matches header">
              { live && 
                  <div 
                      style={{
                          width:"2px", 
                          marginTop:"-5px", 
                          marginRight:"5px", 
                          opacity:0.6
                      }}>
                      <ColoredCircle color="#cc5500" /> 
                  </div> 
              } 
              {market_id} 
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
    const {match, jackpot, live} = props;
    return (
        <Row className="top-matches">
            <div className="col-sm-1 pad left-text">
                { live && 
                    <> 
                    <small style={{color:"green"}} > {match?.match_status} </small>
                    <br/>
                    </> 
                }
                {(live && match?.match_time) ?  
                        <>{`${match.match_time}'`}</> : match?.start_time}
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
                    { (match?.odds?.home_odd && match.odds.home_odd !== 'NaN')
                        ?  <OddButton match={match}  mkt="home_team" live={live} jackpot = {jackpot} /> 
                        :  <EmptyTextRow odd_key={match?.odd_key}/> 
                    }
                </div>
                <div className="col-sm-4 events-odd match-div-col" style={{padding:0}}>
                    { (match?.odds?.neutral_odd && match.odds.neutral_odd !== 'NaN')
                        ?  <OddButton match={match}  mkt="draw" live={live} jackpot={jackpot}/> 
                        :  <EmptyTextRow odd_key={match?.odd_key}/> 
                    }
                </div>
                <div className="col-sm-4 match-div-col" style={{padding:0}}>
                    { (match?.odds?.away_odd && match.odds.away_odd !== 'NaN')
                        ?  <OddButton match={match}  mkt="away_team" live={live} jackpot={jackpot}/> 
                        :  <EmptyTextRow odd_key={match?.odd_key}/> 
                    }
                </div>
            </Row>
            { !jackpot && (match?.side_bets > 1 ) && <SideBets  match={match} live={live} style={{d:"inline"}}/> }
        </Row>
    )

} 

export const MarketList = (props) => {

    const [state,] = useContext(Context);                              
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
            </Container>
        </div>
    )

}

export const JackpotHeader = (props) => {
   
    const [state, ] = useContext(Context);                              
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
           <Row className="jp-header-text mb-2">
               <div className="jackpot-amount mt-3">
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
    const [state, ] = useContext(Context);                              
    const [matches, setMatches] = useState();
    useEffect(()=>{
        if(state?.jackpotmatches) {
            setMatches(state.jackpotmatches);
        }
    }, [state?.jackpotmatches])

    return (
        <div className="matches full-width mt-5">

            <MatchHeaderRow  />

            <Container className="web-element">
                { matches && Object.entries(matches?.data).map(([key, match]) => (
                        <MatchRow match={match}  jackpot key={key}/>
                   ))
                }
            </Container>
        </div>
    )
}

const MatchList = (props) => {
    const [state, ] = useContext(Context);                              
    const [matches, setMatches] = useState([]);
    const { live } = props;
    useEffect(()=>{
        if(state?.matches) {
            setMatches(state.matches);
        }
    }, [state?.matches])

    return (
        <div className="matches full-width">

            <MatchHeaderRow  live={live} />

            <Container className="web-element">
                {  
                    Object.entries(matches).map(([key, match]) => (
                        <MatchRow match={match}  key={key} live={live} />
                   ))
                }
            </Container>
        </div>
    )
}
export default MatchList;
