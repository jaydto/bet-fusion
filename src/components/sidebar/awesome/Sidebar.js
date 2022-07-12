import React, {useCallback, useEffect, useState} from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import makeRequest from "../../utils/fetch-request";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Sidebar = (props) => {

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
            }
            setLocalStorage('categories', c_result);
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

    const getIcon = (competition) => {
        return competition.flag
    }

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
        return (Number(sport) === Number(matchId))

    }
    useEffect(() => {
        updateDimensions()
        updateSidebarState()
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const getSportImageIcon = (sport_name, folder = 'svg') => {

        let default_img = 'default_sport'
        let sport_image;
        try {
            sport_image = require(`../../../assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../assets/${folder}/${default_img}.svg`);
        }
        return sport_image
    }


    return (
        <div style={{
            display: 'flex',
            overflow: 'scroll initial',
            zIndex: 10,
            marginRight: '5px',
            top: "140px"
        }}
             className={`vh-100 text-white sticky-top d-none d-md-block`}>
            <ProSidebar
                style={{backgroundColor: '#16202c !important'}}
                image={false}
                onToggle={handleToggleSidebar}
                collapsed={collapsed}
                toggled={toggled}
            >
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
                        }}
                    >
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
                                     icon={<img style={{borderRadius: '50%', height: '20px'}}
                                                src={getSportImageIcon(competition.sport_name)}/>}
                                     key={index}>
                                <SubMenu title={'Countries'} style={{maxHeight: '300px', overflow: 'scroll'}}>
                                    {competition?.categories.map((country, countryKey) => (
                                        <div key={`${countryKey}_category`}>
                                            <SubMenu title={country.category_name}
                                                     icon={<img style={{borderRadius: '50%', height: '20px'}}
                                                                src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                     />}
                                            >
                                                {country?.competitions.map((league, leagueKey) => (
                                                    <MenuItem key={`${leagueKey}_league`}>
                                                        <a href={`/competition/${competition.sport_id}/${country.category_id}/${league.competition_id}`}
                                                           onClick={() => setLocalStorage('active_item', competition.sport_id)}>
                                                            {league.competition_name}
                                                        </a>
                                                    </MenuItem>
                                                ))}
                                            </SubMenu>
                                        </div>
                                    ))}
                                </SubMenu>
                                <MenuItem>
                                    <a href={`/upcoming?sport_id=${competition.sport_id}`}>Today Games</a>
                                </MenuItem>
                                <MenuItem>
                                    <a href={`/highlights?sport_id=${competition.sport_id}`}>Highlights</a>
                                </MenuItem>
                                <MenuItem>
                                    <a href={`/tomorrow?sport_id=${competition.sport_id}`}>
                                        Tomorrow
                                    </a>
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
