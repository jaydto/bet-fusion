import React, {useCallback, useEffect, useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu,} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {getFromLocalStorage} from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useSelector} from "react-redux";

const Sidebar = React.memo(
    (props) => {
        const gaEventTracker = useAnalyticsEventTracker("Navigation");
        const [collapsed, setCollapsed] = useState(false);
        const [toggled, setToggled] = useState(false);
        const [sport, setSport] = useState(79);

        const handleToggleSidebar = (value) => {
            setToggled(value);
        };

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
                sport_name = splitString[0].substr(0, 2).toString().toLowerCase();
            }

            let default_img = "default_sport";
            let sport_image;
            try {
                sport_image = topLeagues
                    ? require(`../../../assets/img/${folder}/${sport_name}.svg`)
                    : require(`../../../assets/svg/${folder}/${sport_name}.svg`);
            } catch (error) {
                sport_image = require(`../../../assets/img/${default_img}.svg`);
            }
            return sport_image;
        };
        const getDefaultMarketsForSport = (competition) => {
            return competition?.default_display_markets;
        };

        return (
            <div
                style={{
                    display: "flex",
                    overflow: "auto initial",
                    zIndex: 10,
                    marginRight: "2px",
                    top: "9.5rem",
                }}
                className={`vh-100 text-white sticky-top d-none d-md-none d-lg-block up container-sticky-top`}
            >
                <ProSidebar
                    image={false}
                    onToggle={handleToggleSidebar}
                    collapsed={collapsed}
                    toggled={toggled}
                >
                    <SidebarContent>
                        <Menu iconShape="circle">
                            {competitions?.all_sports.map((competition, index) => (
                                index === 0 ? <SubMenu
                                        title={competition.sport_name}
                                        defaultOpen={getActiveSport(competition.sport_id)}
                                        onClick={() => gaEventTracker(`${competition?.sport_name}`)}
                                        icon={
                                            <LazyLoadImage
                                                style={{borderRadius: "50%", height: "20px"}}
                                                src={getSportImageIcon(competition.sport_name)}
                                            />}
                                        key={index}>
                                        {index === 0 && (
                                            <SubMenu title={"Top Leagues"} defaultOpen={true} key={index}>
                                                {competitions?.top_soccer?.map((top_league, index) => (
                                                    <MenuItem
                                                        key={`l_${index}`}
                                                        icon={
                                                            <LazyLoadImage
                                                                src={getSportImageIcon(
                                                                    top_league?.competition_name,
                                                                    "leagues",
                                                                    true
                                                                )}
                                                                style={{borderRadius: "50%", height: "20px", width: "20px"}}
                                                            />
                                                        }
                                                    >
                                                        <Link
                                                            onClick={() =>
                                                                gaEventTracker(
                                                                    `Top Leagues ${top_league?.competition_name}`
                                                                )
                                                            }
                                                            to={`/competition/${top_league.sport_id}/${
                                                                top_league.category_id
                                                            }/${top_league.competition_id}?sport_id=${
                                                                competition.sport_id
                                                            }&sub_type_id=${getDefaultMarketsForSport(
                                                                competition
                                                            )}`}
                                                        >
                                                            {top_league?.competition_name}
                                                        </Link>
                                                    </MenuItem>
                                                ))}
                                            </SubMenu>
                                        )}
                                    </SubMenu>
                                    : <div key={`b_${index}`}>
                                        <MenuItem
                                            key={`l_${index}`}
                                            icon={
                                                <LazyLoadImage
                                                    src={getSportImageIcon(
                                                        competition?.sport_name,
                                                        "sports",
                                                        false
                                                    )}
                                                    style={{borderRadius: "50%", height: "20px"}}
                                                />
                                            }
                                        >
                                            <Link
                                                to={`/highlights?sport_id=${competition?.sport_id}&sub_type_id=${getDefaultMarketsForSport(competition)}&sport_name=${competition?.sport_name}`}>
                                                {competition?.sport_name}
                                            </Link>
                                        </MenuItem>
                                    </div>
                            ))}
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
            </div>
        );
    });

export default React.memo(Sidebar);