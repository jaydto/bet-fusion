import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Header from "../../header/header";
import KironTabs from "./KironTabs/KironTabs";
import logo from "../../../assets/img/Logo.webp";
import KironCompetitions from "./competitions/KironCompetitions";
import MatchList from "./matches";
import makeRequest from "../../utils/fetch-request";

import {Context} from "../../../context/store";
import {Link, useLocation, useNavigate} from "react-router-dom";
import KironPeriods, {getTime} from "./periods";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import useWindowDimensions from "../../header/Dimensions";

import Right from "../../right";
import KironMoreMarkets from "./kironMoreMarkets";
import Footer from "../../footer/footer";
import './index.css'
import KironResults from "./results";
import Standing from "./standing";
import KironBetHistory from "./bet-history/KironBetHistory";
import Complex from "../../skeleton/Complex";
import KironPlayouts from "./playout";
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudDownloadAlt} from "@fortawesome/free-solid-svg-icons/faCloudDownloadAlt";
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";

const Kiron = () => {
    const [state,dispatch]=useContext(Context)
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState('kiron')
    const [fetching, setFetching] = useState(false)
    const [threeWay, setThreeWay] = useState(false);
    const [limit, setLimit] = useState(10);
    const [kironValidation, setKironValidation] = useState();
    const [matches, setMatches] = useState([]);
    const [closed, setClosed] = useState(false);
    const [inPlay, setInPlay] = useState(false);
    const [playout, setPlayout] =useState(null)
    // const subTypes = new URL(window.location).searchParams.get('sub_type_id')||getFromLocalStorage('kiron_search_data')?.sub_type_id||'3'
    let endpoint = "/v1/nare-league/matches"
    let url = new URL(window.location.href)

    const location = useLocation();
    const navigate = useNavigate();

    const [kironCompetition, setKironCompetition] = useState(null);
    const [kironPeriod, setKironPeriod] = useState(null);
    const [roundId, setRoundId] = useState(null);
    const [kironSub, setKironSub] = useState(null);

    const [user, setUser] = useState(getFromLocalStorage("user"));
    const {height, width} = useWindowDimensions();
    const expand = "lg"
    const [isOpen, setIsOpen] = useState(false);

    const  userIn={
        marginTop: "4rem"
    }

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1 and pad with a leading zero if necessary
    const day = String(now.getDate()).padStart(2, '0'); // Pad with a leading zero if necessary
    const hours = String(now.getHours()).padStart(2, '0'); // Pad with a leading zero if necessary
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Pad with a leading zero if necessary
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Pad with a leading zero if necessary
    const kiron_first_round=getFromLocalStorage("kiron_first_round");
    const kiron_first_period=getFromLocalStorage("kiron_first_period");
    const firstMatchEndTime=getFromLocalStorage('kiron_end_time')
    const [isCountdownTimerActive, setIsCountdownTimerActive] = useState(false);
    const [kironPeriods, setKironPeriods] = useState(kiron_first_period)
    const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const getUser =state?.userLogged|| getFromLocalStorage('user')?.token

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        const userLog=state?.userLogged||getFromLocalStorage("user")?.token

                console.log('userValue')
                setUserLogged(userLog)

    }, [getUser])


    useEffect(() => {
        const period = getFromLocalStorage("kiron_first_period")||dateString;

        if (kironPeriods !== period) {
            setKironPeriods(period)
        }
    }, [kiron_first_period])


    const [newData, setNewData] = useState({
        period:'',
        competition_id: '2',
        market_id: '3',
        round_id: ''
    });


    const prevNewData = useRef(newData);


    useEffect(() => {
        if (prevNewData.current.period !== newData.period ||
            prevNewData.current.competition_id !== newData.competition_id ||
            prevNewData.current.market_id !== newData.market_id) {
            setLoading(true)

            prevNewData.current = newData;
            // console.log("here working", newData)
            setLocalStorage('kiron_search_data', newData);
        }
    }, [newData]);

    useEffect(() => {
        // checkThreeWay()
        fetchData();

    }, [newData]);

    useEffect(() => {
        const abortController = new AbortController();
       console.log("abortController")
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);

    console.log("Match_status", loading)
    const fetchData = useCallback(async () => {

        let tab = location.pathname.replace("/", "") || 'markets'

        endpoint = endpoint.replaceAll(" ", '')


        let newSearchTerm = url.searchParams.get('search')


        if (newSearchTerm !== null) {
            endpoint += '&search=' + newSearchTerm
        }

        let data=getFromLocalStorage('kiron_search_data')

        const kiron_data= data|| newData


        await makeRequest({url: endpoint, method: "POST", data:kiron_data }).then(([status, result]) => {
             if (status == 200) {
                setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                setLoading(false)
                 console.log("slip_data", result)
                if (result?.event_time) {
                    setLoading(false)
                    setKironValidation(result?.slip_data)
                }


            }
        });

    }, []);


    useEffect(() => {
        const kiron_competition=getFromLocalStorage("kiron_search_data")?.competition_id
        const kiron_period=getFromLocalStorage("kiron_search_data")?.period
        const kiron_market=getFromLocalStorage("kiron_search_data")?.market_id
        const kiron_first_period=getFromLocalStorage("kiron_first_period")

console.log("variable_state",state?.current_selection_period?.start)
        const newCompetitionId = new URL(window.location).searchParams.get('competition_id')||kiron_competition||'2'
        const newPeriod = state?.current_selection_period?.start?
            state?.current_selection_period?.start:
            state?.current_selection_period?.start.length==0||state?.current_selection_period?.start==null||state?.current_selection_period?.start==null?
                kiron_first_period||kiron_period:
                state?.current_selection_period?.start

        const newRoundId = state?.current_selection_period?.round
        const newMarket = new URL(window.location).searchParams.get('sub_type_id') ||kiron_market|'3'

//todo review christmas lights flickering
        if (newData.competition_id!==newCompetitionId  ||
            newData.competition_id!==newCompetitionId&&newData.period !==newPeriod  ||
            newData.round_id!==newRoundId   ||
            newData.market_id!==newMarket)  {
            setNewData({
                period: newPeriod,
                competition_id: newCompetitionId,
                market_id: newMarket,
                round_id: newRoundId
            });
            setLoading(true)

        }

    } );



    useEffect(() => {
        let new_tab = ""


        if (window.location.href.includes("nare-league")) {
            new_tab = ("nare-league")
        }

        if (window.location.href.includes("results")) {
            new_tab = ("results")

        }
        if (window.location.href.includes("standing")) {
            new_tab = ('standing')
        }
        if (window.location.href.includes("bet-history")) {
            new_tab = ('bet-history')
        }

        if (new_tab !== tab) {
            setTab(new_tab)
            setLoading(false)
        }

    })

    // const kironTabVisible=()=>{
    //     const time= (new Date(Date.parse(`${new Date().toDateString()} ${getTime(firstMatchEndTime)}`))-new Date().getTime())/1000
    //
    //     document.addEventListener("visibilitychange", (event) => {
    //         if (document.visibilityState == "visible") {
    //             if(window.location.pathname=="/nare-league"){
    //                 if(time<=0){
    //                     fetchData()
    //                 }
    //             }
    //         }
    //     })
    // }
    //
    // useEffect(()=>{
    //     kironTabVisible()
    // },[])



    return (
        <>

    <Navbar expand="lg" className="mb-0 ck pc os app-navbar top-nav header-mobile-kiron" fixed="top" variant="dark">
        <Container fluid className={'d-flex justify-content-between mobile-change'}>
            <Navbar.Brand className="e logo align-self-start menu-control w-100 d-flex justify-content-between" title="Betnare">
                <Link to={{pathname: "/"}} className="col-4 resize-mobile">
                    <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                   className={"image-size "}/>
                </Link>
                {width <=991 ? user?
                    <div className="col-md-3  d-flex  right justify-content-center align-items-center w-change2" style={{marginLeft: 'auto'}}>
                        <div>
                            <Link
                                to={{pathname: "/deposit"}}
                                className={"deposit-button"} style={{fontSize:"10px"}}>
                                      <span className="">
                                       <span className=" space-icons"> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>
                                          DEPOSIT
                                      </span>
                            </Link>
                        </div>
                        <div>
                            <Link
                                to={{pathname: "/my-bets"}}
                                className={"deposit-button"} style={{fontSize:"10px", marginRight:"12px"}}>
                                      <span className="text-warning">
                                       <span className=" space-icons"><FontAwesomeIcon icon={faCoins} className={"text-warning"}/>
                                           </span>
                                          MY BETS
                                      </span>
                            </Link>
                        </div>
                    </div>
                    :"" : ""}
                {
                    width<=991&&
                    <>

                        {!user&&<div className="col-sm-2 mobile-profile1 align-items-center" style={{marginLeft: 'auto'}}>
                            <div className="">
                                <Link className="cg  login-color login-size btn bg-success text-light" to={"/verify"}
                                      title="Verify Account"
                                      onClick={() => gaEventTracker('Verify')}>
                                    <span className="register-label text-light mobile-remove-verify">Verify</span>
                                </Link>
                            </div>
                            <div className="">
                                <Link className="cg  login-color login-size btn bg-warning text-light" to={"/signup"}
                                      title="Join now" onClick={() => gaEventTracker('Register')}>
                                    <span className="text-light ">Register</span>
                                </Link>
                            </div>

                            <Link to={"/login"} className="cg  login-color login-size btn" type="submit">
                                <span>Login</span>
                            </Link>

                        </div>}
                        <div className="col-1 button-toggle mx-2" style={{width: "3.1rem"}}>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} className="px-3 py-3" onClick={toggle}/>
                        </div>
                    </>

                }

            </Navbar.Brand>

            <Navbar.Offcanvas
                style={{width: "80%", height: "100%",zIndex: "9999", marginTop: "0px",overflowY:"auto"}}
                className='off-canvas background-primary p-0'
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start">
                <Offcanvas.Header closeButton className='text-white' closeVariant={"white"}>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        <div className="col-3">
                            <div>
                                <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"/>
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={(width<=514?user?"":"":"")}>
                    <SidebarMobile/>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
    <div className={'header-desktop-kiron'}>
        <Header/>
    </div>
        <div className="kiron-amt">
            <div className="d-flex flex-row">
            <div className="d-flex flex-column kiron-size" style={{marginTop:"2px"}}>
                    <KironCompetitions/>
                {!inPlay&&<KironTabs tab={location.pathname.replace("/", "")} user={userLogged}/>}
                {tab == "results" ? <KironResults/>:tab == "standing" ?<Standing/>:tab == "bet-history" ?<KironBetHistory/>:<>
                    <KironPeriods setClosed={setClosed} setInPlay={setInPlay} setPlayout={setPlayout}
                                  isCountdownTimerActive={isCountdownTimerActive} setIsCountdownTimerActive={setIsCountdownTimerActive}/>
                    <KironMoreMarkets/>
                    {loading ?matches.length>0&&matches?.map((match, index) => (
                        <Complex key={index}/>)):closed? <div className="kiron-loader" id="kiron-loader">
                            <div className="match-start">
                                Match Starts In <span id="countdown"></span>
                            </div>
                            <div className="loading loading--full-height"></div>
                        </div>:inPlay?<KironPlayouts playout={playout} isCountdownTimerActive={isCountdownTimerActive}/>:
                        <MatchList
                            fetching={fetching}
                            matches={matches}
                            competition_id={newData?.competition_id}
                            three_way={threeWay}

                        />
                    }
                </>
                }
            </div>
                <Right kiron={true} kironValidation={kironValidation}/>
            </div>
        </div>
            <div className={'footer-mobile-none'}>
                <Footer/>
            </div>
        </>
    );
};

export default Kiron;
