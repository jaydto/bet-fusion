import React, {useContext, useEffect, useState, useRef} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import kanyonde from "../../../src/assets/img/mobile/aviator.webp"
import Premier_League from "../../assets/img/leagues/Premier League.svg"
import live from "../../assets/img/live.png"
import casino from "../../assets/img/casino/casino.png"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faPrint,
    faQuestionCircle,
    faTimes,
    faLaptop,
    faMagic, faInfo, faDice, faFireAlt
} from '@fortawesome/free-solid-svg-icons'
import makeRequest from "../utils/fetch-request";
import {faMobile, faCoins} from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link} from "react-router-dom";
import LoginModal from '../modals/LoginModal';

const HeaderNav = (props) => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [test, setTest] = useState(false)
    const [state,] = useContext(Context);
    const pathname = window.location.pathname;
    const [searching, setSearching] = useState(false)
    const [matches, setMatches] = useState([])
    const searchInputRef = useRef(null)
    const [showLoadingModal, setShowLoadingModal] = useState(false);


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
       
            state?.user !== null ? window.location.href = "/gameplay/1301/1" : setShowLoadingModal(true);
        
       
    };

    return (
        <>
            {showLoadingModal && (<LoginModal setShowLoadingModal={setShowLoadingModal} visible={showLoadingModal}/>)}

            <Container id="navbar-collapse-main"
                       className={`d-none d-sm-flex d-flex flex-row  header-menu ${searching ? 'hidden' : 'd-block'}`}>

                <ListGroup as="ul" xs="12" horizontal
                           className="nav navbar-nav og d-flex ale ss  col-lg-12 col-md-12 col-sm-12 change-display">

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
                        <Link className="url-link fm anl cg ox"
                              to="/nare-games/aviator"
                              title="Aviator">
                            <strong>
                                <div className={'d-flex menu-item'}>
                                    Aviator
                                    <span className="notify-badge badge">NEW</span>
                                </div>
                            </strong>
                        </Link>
                    </li>
                  
                
                    <li className={`${pathname === '/casino'  ? 'active' : ''}`}>
                        <a className="url-link fm anl cg ox " href="/casino" title="Live Casino">
                            <span>
                                <strong>Casino</strong>
                                    <span className="notify-badge badge">NEW</span>
                            </span>
                        </a>
                    </li>
                    
                    <li className={`${pathname == '/gameplay' || pathname.includes("1301") ? 'active' : ''}`}>
                        <a className="url-link fm anl cg ox " href="#" onClick={() => LoginCheck("spaceman")}
                           title="Space Man">
                            <span>
                                <strong>Spaceman</strong>
                                    <span className="notify-badge badge">NEW</span>
                            </span>
                        </a>
                    </li>

                    <li className={pathname.includes('JetX') ? 'active live-bg' : ''}
                        onClick={() => gaEventTracker('Jetx')}>
                        <Link className="url-link fm anl cg ox"
                              to="#"
                              title="JetX"
                              onClick={() =>LoginCheck("JetX")}>
                            <strong>
                                <div className={'d-flex menu-item'}>
                                    JetX
                                    <span className="notify-badge badge">NEW</span>
                                </div>
                            </strong>
                        </Link>
                    </li>

                    <li className={`${pathname === '/smart-soft'  ? 'active' : ''}`}>
                        <a className="url-link fm anl cg ox " href="/smart-soft" title="SmartSoft">
                            <span>
                                <strong>X-games</strong>
                                    <span className="notify-badge badge">NEW</span>
                            </span>
                        </a>
                    </li>

                    <li className={`${pathname == '/virtuals' ? 'active' : ''}`}>
                        <Link className="url-link fm anl cg ox" to="/virtuals" title="Virtuals">
                            <span className={''}>
                                <strong>
                                    <div className={'notification-item'}>
                                        {/*<FontAwesomeIcon icon={faLaptop}/> */}
                                        Virtuals
                                        <span className="notify-badge badge">NEW</span>
                                    </div>
                                </strong>
                            </span>
                        </Link>
                    </li>
                    <li className={pathname.includes('nare-games') && pathname.includes('aviator') === false ? 'active' : ''}
                        onClick={() => gaEventTracker('Nare Games')} title={"Nare Games"}>
                        <Link className="url-link fm anl cg ox"
                              to="/nare-games"
                              title="Nare Games">

                            <strong className={"px-1"}>
                                {/*<FontAwesomeIcon icon={faFireAlt} style={{color: "orange"}}/> */}
                                Nare Games
                                <span className="notify-badge badge">NEW</span>
                            </strong>
                        </Link>
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
                        <Link className="url-link fm anl cg ox" to="/app" title="App">
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
                            <a className="g url-link" href="/casino" title="Casino">
                                {/*<FontAwesomeIcon icon={faDice}/>*/}
                                Casino
                            </a>
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
                        <Link className="url-link fm anl cg ox" to="/promotions" title="Promotions">
                            <strong>
                                {/*<FontAwesomeIcon icon={faMagic}/>*/}
                                Promos
                            </strong>
                        </Link>
                    </li>
                    <li className={pathname === '/print-matches' ? 'spacing-end' : 'spacing-end'}>
                        <a className="url-link fm anl cg ox fix-display" href="#" title="Search"
                           onClick={() => showSearchBar()}>
                            <span className=" space-icons">
                                <strong><FontAwesomeIcon icon={faSearch}/> </strong>
                            </span>
                            <strong><span className={'hide2'}>Search </span></strong>
                        </a>
                    </li>
                    <li className={pathname === '/how-to-play' ? 'active' : ''}
                        onClick={() => gaEventTracker('Visit How To Play Page')}>
                        <a className="url-link fm anl cg ox fix-display" href="/how-to-play" title="How to play">
                            <span className=" space-icons">
                                <strong><FontAwesomeIcon icon={faQuestionCircle}/> </strong>
                            </span>
                            <span className={'hide2'}><strong>Help</strong></span>
                        </a>
                    </li>
                    <li className={pathname === '/print-matches' ? 'active py-3' : 'fa-border py-md-0 py-lg-3 py-sm-0 d-flex align-items-center'}
                        onClick={() => gaEventTracker('Visit Print Matches')}>
                        <a className="url-link fm anl cg ox fix-print" href="/print-matches" title="Print Matches">
                            <span className=" space-icons"><FontAwesomeIcon icon={faPrint}/> </span>Print <span
                            className={'hide1'}>Matches</span>
                        </a>
                    </li>
                </ListGroup>

            </Container>
            <Container id="navbar-collapse-main"
                       className={`fadeIn header-menu d-flex justify-content-center px-4 ${searching ? 'd-block' : 'd-none'}`}>
                <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center">
                    <div className="d-flex">
                        <div className="col-md-10">
                            <input type="text" placeholder={'Start typing to search for team ...'} ref={searchInputRef}
                                   onInput={(event) => fetchMatches(event.target.value)}
                                   className={'form-control input-field border-0 bg-dark text-white no-border-radius'}/>
                        </div>

                        <button className={'btn text-white -align-right'} onClick={() => dismissSearch()}>
                            <FontAwesomeIcon icon={faTimes}/> Close
                        </button>
                    </div>
                    <div
                        className={`autocomplete-box position-fixed bg-white border-dark col-md-5 mt-1 shadow-lg text-start`}
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

}
export default React.memo(HeaderNav);
