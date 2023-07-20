import React, {useCallback, useEffect, useState} from "react";
import "./countries.css";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Menu, MenuItem, SubMenu} from "react-pro-sidebar";


const Countries = React.memo(
    (props) => {
        const gaEventTracker = useAnalyticsEventTracker("Navigation");
        const [collapsed, setCollapsed] = useState(false);

        const [sport, setSport] = useState(79);

        const handleCollapsedChange = (checked) => {
            setCollapsed(checked);
        };

        const [competitions, setCompetitions] = useState(props?.competitions);

        const fetchData = useCallback(async () => {
            let cached_competitions = getFromLocalStorage("categories");
            let endpoint = "/v1/categories";

            if (!cached_competitions) {
                const [competition_result] = await Promise.all([
                    makeRequest({url: endpoint, method: "get", data: null}),
                ]);
                let [c_status, c_result] = competition_result;

                if (c_status === 200) {
                    setCompetitions(c_result);
                    setLocalStorage("categories", c_result);
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
        const updateSidebarState = () => {
            let sport_id = new URL(window.location.href).searchParams.get("sport_id");
            if (sport_id === null && window.location.pathname === "/") {
                sport_id = 79;
            }
            setSport(sport_id);
        };

        const getActiveSport = (matchId) => {
            return Number(sport || 79) === Number(matchId);
        };
        useEffect(() => {
            updateDimensions();
            updateSidebarState();
            window.addEventListener("resize", updateDimensions);
            return () => window.removeEventListener("resize", updateDimensions);
        }, [width]);

        const getSportImageIcon = (
            sport_name,
            folder = "sports",
            topLeagues = false,
            flag = false
        ) => {
            if (flag) {
                let splitString = sport_name.split(" ");
                sport_name = (splitString[0].substr(0, 2)).toString().toLowerCase();

            }


            let default_img = "default_sport";
            let sport_image;
            try {
                sport_image = topLeagues
                    ? require(`../../assets/img/${folder}/${sport_name}.svg`)
                    : require(`../../assets/svg/${folder}/${sport_name}.png`);
            } catch (error) {
                sport_image = require(`../../assets/img/${default_img}.svg`);
            }
            return sport_image;
        };

        const getDefaultMarketsForSport = (competition) => {
            return competition?.default_display_markets;
        }
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        overflow: "auto initial",
                        zIndex: 10,
                        marginRight: "2px",
                        marginBottom: "6rem",
                    }}
                    className={`vh-100 text-white sticky-top up `}
                >
                    <Menu iconShape="circle" className="100vw">
                        {competitions?.all_sports.map((competition, index) => (
                            <SubMenu
                                title={competition.sport_name}
                                defaultOpen={getActiveSport(competition.sport_id)}
                                onClick={() => gaEventTracker(`${competition?.sport_name}`)}
                                key={index}
                                className="100vw"
                            >
                                <SubMenu
                                    title={"Countries"}
                                    defaultOpen={competition?.categories}
                                    style={{
                                        maxHeight: "300px",
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                    }}
                                >
                                    {competition?.categories.map((country, countryKey) => (
                                        <div key={`${countryKey}_category`}>
                                            <SubMenu
                                                title={country.category_name}
                                                onClick={() => gaEventTracker(`${country?.category_name}`)}
                                            >
                                                {country?.competitions.map((league, leagueKey) => (
                                                    <MenuItem key={`${leagueKey}_league`} className="100vw">
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
                                </SubMenu>
                            </SubMenu>
                        ))}
                    </Menu>
                </div>
            </div>
        )
    });

export default Countries;
