import React, {useContext, useEffect, useRef, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {StoreContext} from "../../context/store";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPrint, faQuestionCircle, faSearch, faTimes,} from '@fortawesome/free-solid-svg-icons'

import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link, useNavigate} from "react-router-dom";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {matchesSearch} from "../../redux/matchesSlice";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux/dataSlice";

const HeaderNav = React.memo(
    (props) => {
        const gaEventTracker = useAnalyticsEventTracker('Navigation');
        const [test, setTest] = useState(false)
        const dispatchRedux=useDispatch();
        const pathname = window.location.pathname;
        const [searching, setSearching] = useState(false)
        const matchesData=useSelector((state)=>state.matchesData.searched_matches)

        const [matches, setMatches] = useState([])
        const searchInputRef = useRef(null)
        let navigate = useNavigate();


        const  active_sport_value=useSelector((state)=>state.matchesData.active_sport)
        var currentURL = new URL(window.location.href);
        var pathAndQuery = currentURL.pathname + currentURL.search;

        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))
        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData,getFromLocalStorage("user")])

        const fetchMatches = async (search) => {
            if (search && search.length >= 3) {
                gaEventTracker('Searching')
                let method = "POST"
                let endpoint = "/v1/matches?page="+(1)+`&limit=${10}&search=${search}`;

                dispatchRedux( matchesSearch({endpoint:endpoint, method:method, active_sport:active_sport_value}))
            }

        };

        const showSearchBar = () => {
            setSearching(true)
            searchInputRef.current.focus()
            gaEventTracker('Clicked on Search')
        }

        useEffect(()=>{
            setMatches(matchesData)
        },[matchesData])

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
            {
                if (user !== null) {
                    navigate("/casino")
                } else {
                    setLocalStorage("ActiveLink", '/casino')
                    navigate('/login')

                }
            }
        }

        useEffect(() => {
            if(searching){
                dispatchRedux(setState('navigation_link', pathAndQuery))
            }
        }, [searching]);
        return (
            <>
                <Container fluid id="navbar-collapse-main"
                           className={`d-none d-sm-flex d-flex flex-row  header-menu  ${searching ? 'hidden' : 'd-block'}`}>

                    <ListGroup as="ul" xs="12" horizontal
                               className="nav navbar-nav og d-flex ale ss  col-lg-9 col-md-9 col-sm-9 change-display"
                               style={{margin: '0px 10px 0px 0px'}}>
                        <li className={pathname === '/' ? "active" : ''}
                            onClick={() => gaEventTracker('Visit Homepage')}>
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
                                    Jackpot</strong>
                            </Link>
                        </li>
                        {/* <li className={pathname.includes('aviator') ? 'active live-bg' : ''}
                            onClick={() => gaEventTracker('Aviator')}>
                            <div className="url-link fm anl cg ox"
                                 onClick={() => navigate("/nare-games/aviator")}
                                 title="Aviator">
                                <strong>
                                    <div className={'d-flex menu-item'}>
                                        Aviator

                                    </div>
                                </strong>
                            </div>
                        </li> */}

                        <li className={`${pathname === '/casino' ? 'active' : ''}`}>
                            <div className="url-link fm anl cg ox " title="Live Casino" onClick={() => {
                                LoginCheck("casino");
                                gaEventTracker('Visit Casino Page')
                            }}>
                            <span>
                                <strong>Casino</strong>
                            </span>
                            </div>
                        </li>

                        <li className={`${pathname === '/nare-league' ? 'active' : ''}`}>
                            <div className="url-link fm anl cg ox " onClick={() => {
                                navigate("/nare-league");
                                gaEventTracker('Visit Nare League Page')
                            }} title="Nare League">
                            <span>
                                <strong>Nare League</strong>
                                 <span className="hot-alert-badge-item">HOT</span>
                            </span>
                            </div>
                        </li>

                        <>

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
                            <Link className="url-link fm anl cg ox" to="/promotions" title="Promotions"
                                  onClick={() => gaEventTracker('Visit Promotion Page')}>
                                <strong>
                                    Promotions
                                </strong>
                            </Link>
                        </li>

                    </ListGroup>
                    <ListGroup
                        as="ul" xs="12" horizontal
                        className="nav navbar-nav og d-flex ale ss  col-lg-3 col-md-3 col-sm-3 change-display second-nav-list">
                        <li className={pathname === '/print-matches' ? 'spacing-end' : 'spacing-end'}>
                            <div className="url-link fm anl cg ox fix-display cursor-pointer"  title="Search"
                                  onClick={() => {
                                      showSearchBar();
                                      gaEventTracker('Visit Search')
                                  }}>
                            <span className=" space-icons">
                                <strong><FontAwesomeIcon icon={faSearch}/> </strong>
                            </span>
                                <strong><span className={'hide2'}>Search </span></strong>
                            </div>
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
                                <input type="text" placeholder={'Start typing to search for team ...'}
                                       autoFocus={true}
                                       ref={searchInputRef}
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
                            {matches?.map((match, index) => (
                                <Link to={`/?search=${match.home_team}`} key={index} onClick={() => dismissSearch()}>
                                    <li>
                                        {match.home_team}
                                    </li>
                                </Link>
                            ))}
                        </div>
                    </ListGroup>
                </Container>
            </>
        )

    })
export default React.memo(HeaderNav);
