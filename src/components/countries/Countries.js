import React, {useCallback, useEffect, useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SubMenu,} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./countries.css";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {LazyLoadImage} from "react-lazy-load-image-component";
import { useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Countries = React.memo(
    () => {
        const gaEventTracker = useAnalyticsEventTracker("Counties Page");
        const [, setCollapsed] = useState(false);

        const [sport, ] = useState(79);

        const availableCategories=useSelector((state)=>state.matchesData.sport_categories)

        const [competitions, setCompetitions] = useState(getFromLocalStorage("sport_categories"));

        useEffect(()=>{
            setCompetitions(availableCategories||getFromLocalStorage("sport_categories"))

        },[availableCategories])


        const [width, setWidth] = useState(window.innerWidth);

        const updateDimensions = () => {
            setWidth(window.innerWidth);
            if (width >= 768 && width <= 991) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };
        let sport_id = new URL(window.location.href).searchParams.get("sport_id");

        // this implementtion will be done for showing which is the current active match selection
        const getActiveSport = (matchId) => {
            return Number(sport || 79) === Number(matchId);
        };
        useEffect(() => {
            updateDimensions();
            window.addEventListener("resize", updateDimensions);
            return () => window.removeEventListener("resize", updateDimensions);
        }, [width]);

        const getSportImageIcon = (
            sport_name,
            folder = "sports",
            topLeagues = false,
            flag=false
        ) => {
            let sport_image;
            try {
                sport_image = topLeagues
                    ? require(`../../assets/img/${folder}/${sport_name}.svg`)
                    :`https://storage.googleapis.com/nareimages/flags/${sport_name}.svg`;
            } catch (error) {
            }
            return sport_image;
        };

        const getDefaultMarketsForSport = (competition) => {
            return competition?.default_display_markets;
        };

        const targetSports = competitions?.all_sports.filter(sports =>Number(sports?.sport_id)===Number(sport_id));
        let sport_active=useSelector((state)=>state.matchesData.active_sport);


        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        overflow: "auto initial",
                        zIndex: 10,

                        marginRight: "2px",

                        marginBottom:"6rem"
                    }}
                    className={`vh-100 text-white sticky-top   up `}
                >
                    <ProSidebar
                        style={{ backgroundColor: "#16202c !important", width: "100vw" }}
                        className={'countries-container-desktop'}
                        image={false}
                    >
                        <SidebarContent>
                            {targetSports?.map((competition, index) => (
                            <Menu
                                iconShape="circle" className="100vw"
                                key={index}
                                title={"Countries"}
                                >

                                {((index === 0) && (typeof sport_active === 'string') && (sport_active.toLowerCase() === 'soccer')) && ( <p className={'text-light mb-0 px-3 pb-0 pt-1 d-lg-none d-md-block d-sm-block'} style={{opacity:'0.7', fontWeight:'var(--font-weight3'}}>
                                    Top Leagues
                                </p>   )}
                                {((index === 0) && (typeof sport_active === 'string') && (sport_active.toLowerCase() === 'soccer')) && (
                                    <div>
                                        <Menu title={"Top Leagues"} key={index} defaultOpen={true} className={'d-lg-none d-md-block d-sm-block w-100 px-4 top-leagues-mobile'} style={{lineHeight:'1'}}>
                                            {competitions?.top_soccer?.map((top_league, index) => (
                                                <MenuItem
                                                    key={`l_${index}`}
                                                    className={'d-flex align-items-center'}
                                                    style={{maxHeight:'27px'}}
                                                    icon={
                                                        <LazyLoadImage
                                                            src={getSportImageIcon(
                                                                top_league?.competition_name,
                                                                "leagues",
                                                                true
                                                            )}
                                                            className={'sidebar-league-icon-small '}
                                                            style={{borderRadius: "50%", height: "23px", width: "23px"}}
                                                        />
                                                    }
                                                >
                                                    <Link
                                                        className={'text-sidebar-small-size'}
                                                        onClick={() =>
                                                            gaEventTracker(
                                                                `Top Leagues ${top_league?.competition_name}`
                                                            )
                                                        }
                                                        to={`/competition/${top_league.sport_id}/${
                                                            top_league.category_id
                                                        }/${top_league.competition_id}?competition_league=${top_league?.competition_name}&sub_type_id=${
                                                            getDefaultMarketsForSport(competition)}&sport_id=${
                                                            competition.sport_id
                                                        }`}
                                                    >
                                                        {top_league?.competition_name}
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>

                                )}

                                <p className={'text-light mb-0 px-3 pb-0 pt-1'} style={{opacity:'0.7', fontWeight:'var(--font-weight3'}}>
                                    Countries
                                </p>
                                <Menu
                                        iconShape="circle" className="100vw px-4"
                                        title={"Countries"}
                                        style={{
                                            overflowY: "auto",
                                            overflowX: "hidden",
                                        }}
                                    >
                                        {competition?.categories.map((country, countryKey) => (

                                            <div key={`${countryKey}_category`}>
                                                <SubMenu
                                                    title={country.category_name}
                                                    onClick={() =>
                                                        gaEventTracker(`Country Sport ${sport_id}`,`${country?.category_name}`)
                                                    }
                                                    icon={
                                                        <LazyLoadImage
                                                            effect="blur"
                                                            style={{ borderRadius: "50%", height: "20px" }}
                                                            src={getSportImageIcon(
                                                                country?.cat_flag,
                                                                "flags-1-1",
                                                                false,
                                                                true
                                                            )}
                                                        />
                                                    }
                                                >
                                                    {country?.competitions.map((league, leagueKey) => (
                                                        <MenuItem
                                                            key={`${leagueKey}_league`}
                                                            className="100vw league-left-spacing"
                                                        >
                                                            <Link
                                                                to={`/competition/${competition.sport_id}/${
                                                                    country.category_id
                                                                }/${league.competition_id}?sport_id=${
                                                                    competition.sport_id
                                                                }&sub_type_id=${getDefaultMarketsForSport(
                                                                    competition
                                                                )}`}
                                                                onClick={() => {
                                                                    setLocalStorage(
                                                                        "active_item",
                                                                        competition.sport_id
                                                                    );
                                                                    gaEventTracker(league?.competition_name);
                                                                }}
                                                            >
                                                                {league.competition_name}
                                                            </Link>
                                                        </MenuItem>
                                                    ))}
                                                </SubMenu>
                                            </div>
                                        ))}
                                    </Menu>
                            </Menu>
                                ))}
                        </SidebarContent>
                    </ProSidebar>
                </div>
            </div>
        );
    });

export default Countries;
