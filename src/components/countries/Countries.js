import React, {useCallback, useEffect, useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SubMenu,} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./countries.css";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {LazyLoadImage} from "react-lazy-load-image-component";

const Countries = React.memo(
    (props) => {
        const gaEventTracker = useAnalyticsEventTracker("Counties Page");
        const [, setCollapsed] = useState(false);

        const [sport, setSport] = useState(79);

        const [competitions, setCompetitions] = useState(props?.competitions);

        const fetchData = useCallback(async () => {
            let cached_competitions = getFromLocalStorage("sport_categories");
            let endpoint = "/v1/categories";

            if (!cached_competitions) {
                const [competition_result] = await Promise.all([
                    makeRequest({ url: endpoint, method: "get", data: null }),
                ]);
                let [c_status, c_result] = competition_result;

                if (c_status === 200) {
                    setCompetitions(c_result);
                    setLocalStorage("sport_categories", c_result);
                } else {
                    fetchData();
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
        }, []);

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

            // if (flag){
            //     let splitString = sport_name.split(" ");
            //     sport_name = (splitString[0].substr(0, 2)).toString().toLowerCase();
            //
            // }

            let sport_image;
            try {
                sport_image = topLeagues
                    ? require(`../../assets/img/${folder}/${sport_name}.svg`)
                    : require(`../../assets/img/${folder}/${sport_name}.svg`);
            } catch (error) {
                // sport_image = require(`../../assets/img/${folder}/${default_img}.svg`);
            }
            return sport_image;
        };

        const getDefaultMarketsForSport = (competition) => {
            return competition?.default_display_markets;
        };

        const targetSports = competitions?.all_sports.filter(sports =>Number(sports?.sport_id)===Number(sport_id));


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
                                <div className={"d-flex gap-3 w-100 align-items-center px-3"}>
                                    <LazyLoadImage
                                        style={{
                                            borderRadius: "50%",
                                            height: "22px",
                                            display: "block",
                                            width:'22px'
                                        }}
                                        effect="blur"
                                        src={getSportImageIcon(competition.sport_name)}
                                    /> Countries
                                </div>

                                    <Menu
                                        iconShape="circle" className="100vw"
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
                                                            className="100vw"
                                                        >
                                                            <a
                                                                href={`/competition/${competition.sport_id}/${
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
                                                            </a>
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