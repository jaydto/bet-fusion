import React, {useCallback, useEffect, useState} from 'react';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import makeRequest from "../../utils/fetch-request";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {Link} from "react-router-dom";

const Sidebar = (props) => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [sport, setSport] = useState(79)

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const [competitions, setCompetitions] = useState(props?.competitions);

    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result);
                setLocalStorage('categories', c_result);
            } else {
                fetchData()
            }
        } else {
            setCompetitions(cached_competitions);
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    const [width, setWidth] = useState(window.innerWidth);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
        if (width >= 768 && width <= 991) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }
    const updateSidebarState = () => {
        let sport_id = (new URL(window.location.href).searchParams.get('sport_id'))
        if (sport_id === null && window.location.pathname === '/') {
            sport_id = 79
        }
        setSport(sport_id)
    }

    const getActiveSport = (matchId) => {
        return (Number(sport || 79) === Number(matchId))
    }
    useEffect(() => {
        updateDimensions()
        updateSidebarState()
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

        let default_img = 'default_sport'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../../assets${sport_name}`) : require(`../../../assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../assets/${folder}/${default_img}.svg`);
        }
        return sport_image
    }

    const getDefaultMarketsForSport = (competition) => {
        return competition?.default_display_markets
    }


    return (
        <div style={{
            display: 'flex',
            overflow: 'scroll initial',
            zIndex: 10,
            marginRight: '2px',
            top: "100px"
        }}
             className={`vh-100 text-white sticky-top d-none d-md-block up`}>
            <ProSidebar

                style={{backgroundColor: '#16202c !important'}}
                image={false}
                onToggle={handleToggleSidebar}
                collapsed={collapsed}
                toggled={toggled}>
                <SidebarHeader>
                    <div
                        style={{
                            padding: '5px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                        <div className="d-flex justify-content-end">

                            <span onClick={() => setCollapsed(!collapsed)} className={'cursor-pointer'}>
                               {collapsed ? (
                                   <>
                                       Show <FontAwesomeIcon icon={faArrowRight}/>
                                   </>
                               ) : (
                                   <>
                                       <FontAwesomeIcon icon={faArrowLeft}/> Hide
                                   </>
                               )}
                            </span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        {competitions?.all_sports.map((competition, index) => (

                            <SubMenu title={competition.sport_name} defaultOpen={getActiveSport(competition.sport_id)}
                                     onClick={() => gaEventTracker(`${competition?.sport_name}`)}
                                     icon={<img style={{borderRadius: '50%', height: '20px'}}
                                                src={getSportImageIcon(competition.sport_name)}/>}
                                     key={index}>

                                <MenuItem icon={<img
                                    src={getSportImageIcon('/img/flags-1-1/worldcup.png', 'img/flags-1-1', true)}
                                    style={{borderRadius: "50%", height: "20px"}}></img>}>
                                    <Link onClick={() => gaEventTracker(`Today Games ${competition?.sport_name}`)}
                                       to={`/competition/79/8085/18585?sport_id=79&sub_type_id=1,18,29&limit=500&c=worldcup`}>
                                        <strong>Fifa World Cup</strong>
                                    </Link>
                                </MenuItem>
                                {index === 0 && (

                                    <SubMenu title={'Top Leagues'}>
                                        {competitions?.top_soccer?.map((top_league, index) => (
                                            <MenuItem key={`l_${index}`}
                                                      icon={<img
                                                          src={getSportImageIcon(top_league?.flag, 'img/flags-1-1', true)}
                                                          style={{borderRadius: "50%", height: "20px"}}></img>}>
                                                <Link onClick={() => gaEventTracker(`Top Leagues ${top_league?.competition_name}`)}
                                                   to={`/competition/${top_league.sport_id}/${top_league.category_id}/${top_league.competition_id}?sport_id=${competition.sport_id}&sub_type_id=${getDefaultMarketsForSport(competition)}`}>
                                                    {top_league?.competition_name}
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </SubMenu>
                                )}
                                <SubMenu title={'Countries'}
                                         style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}>
                                    {competition?.categories.map((country, countryKey) => (
                                        <div key={`${countryKey}_category`}>
                                            <SubMenu title={country.category_name}
                                                     onClick={() => gaEventTracker(`${country?.category_name}`)}
                                                     icon={<img style={{borderRadius: '50%', height: '20px'}}
                                                                src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                     />}
                                            >
                                                {country?.competitions.map((league, leagueKey) => (
                                                    <MenuItem key={`${leagueKey}_league`}>
                                                        <Link to={`/competition/${competition.sport_id}/${country.category_id}/${league.competition_id}?sport_id=${competition.sport_id}&sub_type_id=${getDefaultMarketsForSport(competition)}`}
                                                           onClick={() => {
                                                               setLocalStorage('active_item', competition.sport_id);
                                                               gaEventTracker(league?.competition_name)
                                                           }}>
                                                            {league.competition_name}
                                                        </Link>
                                                    </MenuItem>
                                                ))}
                                            </SubMenu>
                                        </div>
                                    ))}
                                </SubMenu>
                                <MenuItem>
                                    <Link onClick={() => gaEventTracker(`Today Games ${competition?.sport_name}`)}
                                       to={`/upcoming?sport_id =${competition.sport_id}&sub_type_id=${getDefaultMarketsForSport(competition)}`}>
                                        Today Games
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link onClick={() => gaEventTracker(`Highlights ${competition?.sport_name}`)}
                                       to={`/highlights?sport_id=${competition.sport_id}&sub_type_id=${getDefaultMarketsForSport(competition)}`}>
                                        Highlights
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link onClick={() => gaEventTracker(`Tomorrow ${competition?.sport_name}`)}
                                       to={`/tomorrow?sport_id=${competition.sport_id}&sub_type_id=${getDefaultMarketsForSport(competition)}`}>
                                        Tomorrow
                                    </Link>
                                </MenuItem>
                            </SubMenu>
                        ))}
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;
