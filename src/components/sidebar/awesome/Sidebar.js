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

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };


    const [imageLoaded, setImageLoaded] = useState(false);
    const [competitions, setCompetitions] = useState(props?.competitions);
    const [show] = useState(props?.override_display)


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
        console.log("Competition", competition)
        return competition.flag
    }

    return (
        <div style={{
            display: 'flex',
            overflow: 'scroll initial',
            zIndex: 10,
            marginRight: '5px',
            marginTop: "5px"
        }}
             className={`vh-100 text-white sticky-top `}>
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
                            <SubMenu title={competition.sport_name}
                                     icon={<img style={{borderRadius: '50%', height: '25px'}}
                                                src={require(`./../../../assets${competition.flag}`)}/>}
                                     key={index}>
                                <SubMenu title={'Countries'} style={{maxHeight: '300px', overflow: 'scroll'}}>
                                    {competition?.categories.map((country, countryKey) => (
                                        <div key={`${countryKey}_category`}>
                                            <SubMenu title={country.category_name}
                                                     icon={<img style={{borderRadius: '50%', height: '20px'}}
                                                                src={country.cat_flag !== null ?
                                                                    require(`./../../../assets/img/flags-1-1/${country.cat_flag}.svg`) :
                                                                    require(`./../../../assets/img/flags-1-1/default_flag.svg`)}
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
                                    <a href={`/upcoming?sport_id=${competition.sport_id}/`}>Today Games</a>
                                </MenuItem>
                                <MenuItem>
                                    <a href={`/highlights?sport_id=${competition.sport_id}/`}>Highlights</a>
                                </MenuItem>
                                <MenuItem>
                                    <a href={`/tomorrow?sport_id=${competition.sport_id}/`}>
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
