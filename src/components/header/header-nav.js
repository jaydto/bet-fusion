import React, {useContext, useEffect, useRef, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPrint, faQuestionCircle, faSearch, faTimes,} from '@fortawesome/free-solid-svg-icons'
import makeRequest from "../utils/fetch-request";

import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link, useNavigate} from "react-router-dom";
import {setLocalStorage} from "../utils/local-storage";

const HeaderNav = React.memo(
    (props) => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [test, setTest] = useState(false)
    const [state,] = useContext(Context);
    const pathname = window.location.pathname;
    const searchTerm=window.location.search
    const [searching, setSearching] = useState(false)
    const [matches, setMatches] = useState([])
    const searchInputRef = useRef(null)
    let navigate = useNavigate();

    useEffect(() => {
        fetchMatches()
    }, [searching])

    const fetchMatches = async (search) => {
        if (search && search.length >= 3) {
            gaEventTracker('Searching')
            let method = "POST"
            let endpoint = "/v1/matches?page=" + (1) + `&limit=${10}&search=${search}`;
            await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
                if (status === 200) {
                    setMatches(result?.data || result)
                }
            });
        }

    };

    const showSearchBar = () => {
        setSearching(true)
        searchInputRef.current.focus()
        gaEventTracker('Clicked on Search')
    }

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }

    const checkEnvironment = () => {
        setTest(window.location.hostname === 'test.betnare.com')
    }

    useEffect(() => {
        checkEnvironment()
    })

        const LoginCheck = (game) => {
            if(game == "JetX"){
                if(state?.user !== null){
                    navigate( "/smart-play?game=JetX&category=JetX")
                }
                else {
                    setLocalStorage("ActiveLink",'/smart-play?game=JetX&category=JetX')
                    navigate('/login')
                }
            }else if(game == "FootballX"){
                if(state?.user !== null){
                    navigate( "/smart-play?game=FootballX&category=Games")
                }
                else {
                    setLocalStorage("ActiveLink",'/smart-play?game=FootballX&category=Games')
                    navigate('/login')
                }
            }else if(game=='spaceman'){
                if(state?.user !== null){
                    navigate( "/gameplay/1301/1")
                } else{
                    setLocalStorage("ActiveLink",'/gameplay/1301/1')
                    navigate('/login')
                }
            }else {
                if(state?.user !== null){
                    navigate("/casino")
                } else{
                    setLocalStorage("ActiveLink",'/casino')
                    navigate('/login')

                }
            }

        };
    return (
        <>
            <Container  fluid id="navbar-collapse-main"
                       className={`d-none d-sm-flex d-flex flex-row  header-menu  ${searching ? 'hidden' : 'd-block'}`}>


                {/*<ListGroup as="ul" xs="12" horizontal*/}
                {/*           className="nav navbar-nav og d-flex ale ss  col-lg-2 col-md-2 col-sm-2 change-display" >*/}

                {/*   */}
                {/*</ListGroup>*/}
                <ListGroup as="ul" xs="12" horizontal
                           className="nav navbar-nav og d-flex ale ss  col-lg-9 col-md-9 col-sm-9 change-display" style={{margin:'0px 10px 0px 0px'}}>
                    <li className={pathname === '/' ? "active" : ''} onClick={() => gaEventTracker('Visit Homepage')}>
                        <Link className="cg fm ox anl url-link not-selectable " to="/"
                              title="Home"><strong>Home</strong></Link>
                    </li>

                    <li className={pathname.includes('live') && pathname.includes('casino') === false && pathname.includes('livescore') === false ? 'active' : ''}
                        onClick={() => gaEventTracker('Visit Live Page')}>
                        <Link className={`url-link fm anl cg ox `}
                              to="/live" title="Live">
                            <strong>
                                Live
                            </strong>
                        </Link>
                    </li>
                    <li className={pathname === '/jackpot' ? 'active' : ''}
                        onClick={() => gaEventTracker('Visit Jackpot Page')}>
                        <Link className="cg fm ox anl url-link" to="/jackpot" title="Jackpot">
                            <strong>
                                {/*<FontAwesomeIcon icon={faCoins}/> */}
                                Jackpot</strong>
                        </Link>
                    </li>
                    <li className={pathname.includes('aviator') ? 'active live-bg' : ''}
                        onClick={() => gaEventTracker('Aviator')}>
                        <div className="url-link fm anl cg ox"
                              onClick={()=>navigate("/nare-games/aviator")}
                              title="Aviator">
                            <strong>
                                <div className={'d-flex menu-item'}>
                                    Aviator
                                    <span className="hot-alert-badge-item">HOT</span>
                                </div>
                            </strong>
                        </div>
                    </li>

                    <li className={`${pathname === '/casino'  ? 'active' : ''}`}>
                        <div className="url-link fm anl cg ox "  title="Live Casino" onClick={() => {LoginCheck("casino");gaEventTracker('Visit Casino Page')}}>
                            <span>
                                <strong>Virtuals</strong>
                            </span>
                        </div>
                    </li>

                    <li className={`${pathname == '/gameplay' || pathname.includes("1301") ? 'active' : ''}`}>
                        <div className="url-link fm anl cg ox " onClick={() => {
                            LoginCheck("spaceman");gaEventTracker('Visit SpaceMan Page')
                        }}
                           title="Space Man">
                            <span>
                                <strong>Spaceman</strong>
                                    <span className="hot-alert-badge-item">HOT</span>
                            </span>
                        </div>
                    </li>

                    <li className={searchTerm.includes('JetX') ? 'active live-bg' : ''}
                        onClick={() => gaEventTracker('Jetx')}>
                        <div className="url-link fm anl cg ox"
                              title="JetX"
                              onClick={() => {
                                  LoginCheck("JetX");gaEventTracker('Visit JetX Page')
                              }}>
                            <span>
                                <strong>JetX</strong>
                                    <span className="hot-alert-badge-item">HOT</span>

                            </span>
                        </div>
                    </li>

                    <li className={searchTerm.includes('FootballX') ? 'active live-bg' : ''}
                        onClick={() => gaEventTracker('FootballX')}>
                        <div className="url-link fm anl cg ox"
                             title="FootballX"
                             onClick={() => {
                                 LoginCheck("FootballX");gaEventTracker('Visit FootballX Page')
                             }}>
                            <span>
                                <strong>FootballX</strong>
                                    <span className="new-alert-badge-item">NEW</span>

                            </span>
                        </div>
                    </li>

                    <li className={`${pathname === '/nare-league'  ? 'active' : ''}`}>
                        <div className="url-link fm anl cg ox " onClick={()=> {
                            navigate("/nare-league");
                            gaEventTracker('Visit Nare League Page')
                        }} title="Nare League" >
                            <span>
                                <strong>Nare League</strong>
                                    <span className="hot-alert-badge-item">HOT</span>
                            </span>
                        </div>
                    </li>

                    <li className={`${pathname === '/smart-soft'  ? 'active' : ''}`}>
                        <Link className="url-link fm anl cg ox " to="/smart-soft" title="SmartSoft" onClick={()=>gaEventTracker('Visit SmartSoft Page')}>
                            <span>
                                <strong>X-games</strong>

                            </span>
                        </Link>
                    </li>

                    <li className={`${pathname == '/virtuals' ? 'active' : ''}`}>
                        <Link className="url-link fm anl cg ox" to="/virtuals" title="Virtuals" onClick={()=>gaEventTracker('Visit Virtuals Page')}>
                            <span className={''}>
                                <strong>
                                    <div className={'notification-item'}>
                                        {/*<FontAwesomeIcon icon={faLaptop}/> */}
                                        Virtuals
                                       </div>
                                </strong>
                            </span>
                        </Link>
                    </li>
                    <li className={pathname.includes('nare-games') && pathname.includes('aviator') === false ? 'active' : ''}
                         title={"Nare Games"}>
                        <div className="url-link fm anl cg ox"
                              onClick={()=> {
                                  navigate("/nare-games");
                                  gaEventTracker('Visit Nare Games Page')
                              }}
                              title="Nare Games" >

                            <strong className={"px-1"}>
                                {/*<FontAwesomeIcon icon={faFireAlt} style={{color: "orange"}}/> */}
                                Nare Games
                                <span className="hot-alert-badge-item">HOT</span>
                            </strong>
                        </div>
                    </li>

                    <li className={`${pathname.includes('Premier') || (window.location.href.includes("Premier")) ? 'active px-2' : 'px-2'}`}
                        onClick={() => gaEventTracker('Premier League')}>
                        <Link className="cg fm ox anl url-link"
                              to="/competition/79/8076/16805?sport_id=79&sub_type_id=1,18,29&limit=500&c=Premier League"
                              title="Premier League">
                            <div className={'notification-item'}>
                                <strong>Premier League</strong>
                            </div>
                        </Link>
                    </li>


                    <li className={pathname === '/app' ? 'active' : ''}
                        onClick={() => gaEventTracker('Visit App Page')}>
                        <Link className="url-link fm anl cg ox" to="/app" title="App" onClick={()=>gaEventTracker('Visit App Page')}>
                            <span>
                                <strong>
                                    {/*<FontAwesomeIcon icon={faMobile}/>*/}
                                    APP
                                </strong>
                            </span>
                        </Link>
                    </li>

                    <>
                        <li className={`${pathname.includes("casino") ? 'active' : ''} d-none`}>
                            <Link className="g url-link" to="/casino" title="Casino" onClick={()=>gaEventTracker('Visit Casino Page')} >
                                {/*<FontAwesomeIcon icon={faDice}/>*/}
                                Virtuals
                            </Link>
                        </li>


                        <li className={pathname === '/livescore' ? 'active' : ''}>
                            <Link className="url-link fm anl cg ox" to="/livescore"
                                  title="Live Score" onClick={() => gaEventTracker('Visit Live Score Page')}>
                            <span>
                                <strong>
                                    {/*<FontAwesomeIcon icon={faInfo}/> */}
                                    Live Score
                                </strong>
                            </span>
                            </Link>
                        </li>
                    </>

                    <li className={pathname.includes("promotions") ? 'active' : ''}
                        onClick={() => gaEventTracker('Visit Promotions Page')}>
                        <Link className="url-link fm anl cg ox" to="/promotions" title="Promotions" onClick={()=>gaEventTracker('Visit Promotion Page')}>
                            <strong>
                                {/*<FontAwesomeIcon icon={faMagic}/>*/}
                                Promos
                            </strong>
                        </Link>
                    </li>

                    {/*<li className={pathname.includes("affiliate") ? 'active' : ''}*/}
                    {/*    onClick={() => gaEventTracker('Visited Affiliate Page')}>*/}
                    {/*    <Link className="url-link fm anl cg ox" to="/affiliate" title="Affiliate">*/}
                    {/*        <strong>*/}
                    {/*            Affiliate*/}
                    {/*        </strong>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}

                </ListGroup>
                <ListGroup
                    as="ul" xs="12" horizontal
                    className="nav navbar-nav og d-flex ale ss  col-lg-3 col-md-3 col-sm-3 change-display second-nav-list">
                    <li className={pathname === '/print-matches' ? 'spacing-end' : 'spacing-end'}>
                        <Link className="url-link fm anl cg ox fix-display" to="#" title="Search"
                           onClick={() => {
                               showSearchBar();gaEventTracker('Visit Search')
                           }} >
                            <span className=" space-icons">
                                <strong><FontAwesomeIcon icon={faSearch}/> </strong>
                            </span>
                            <strong><span className={'hide2'}>Search </span></strong>
                        </Link>
                    </li>
                    <li className={pathname === '/how-to-play' ? 'active' : ''}
                        onClick={() => gaEventTracker('Visit How To Play Page')}>
                        <Link className="url-link fm anl cg ox fix-display" to="/how-to-play" title="How to play">
                            <span className=" space-icons">
                                <strong><FontAwesomeIcon icon={faQuestionCircle}/> </strong>
                            </span>
                            <span className={'hide2'}><strong>Help</strong></span>
                        </Link>
                    </li>
                    <li className={pathname === '/print-matches' ? 'active py-3' : ' py-md-0 py-lg-3 py-sm-0 d-flex align-items-center gap-1'}
                        onClick={() => gaEventTracker('Visit Print Matches')}>
                        <Link className="url-link fm anl cg ox fix-print" to="/print-matches" title="Print Matches">
                            <span className=" space-icons"><FontAwesomeIcon icon={faPrint}/> </span>Print <span
                            className={'hide1'}> Matches</span>
                        </Link>
                    </li>
                </ListGroup>

            </Container>


            <Container id="navbar-collapse-main"
                       className={`fadeIn header-menu d-flex justify-content-center px-4 ${searching ? 'd-block' : 'd-none'}`}>
                <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center">
                    <div className="d-flex">
                        <div className="col-md-10">
                            <input type="text" placeholder={'Start typing to search for team ...'} autoFocus={true} ref={searchInputRef}
                                   onInput={(event) => fetchMatches(event.target.value)}
                                   className={'form-control input-field border-0 bg-dark text-white no-border-radius'}/>
                        </div>

                        <button className={'btn text-white -align-right'} onClick={() => dismissSearch()}>
                            <FontAwesomeIcon icon={faTimes}/> Close
                        </button>
                    </div>
                    <div
                        className={`autocomplete-box search-results-box position-fixed  border-dark col-md-5 mt-1 shadow-lg text-start`}
                        onClick={() => gaEventTracker('View Search Results')}>
                        {matches.map((match, index) => (
                            <a href={`/?search=${match.home_team}`} key={index}>
                                <li>
                                    {match.home_team}
                                </li>
                            </a>
                        ))}
                    </div>
                </ListGroup>
            </Container>
        </>
    )

})
export default React.memo(HeaderNav);
