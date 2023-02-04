import React, { useCallback, useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./countries.css";
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Right from "../right";

const Sidebar = (props) => {
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
        makeRequest({ url: endpoint, method: "get", data: null }),
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
    topLeagues = false
  ) => {
    // console.log("images_names", sport_name)

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
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          overflow: "auto initial",
          zIndex: 10,
          marginTop:'12.5rem',
          marginRight: "2px",
          top: "12.5rem",
          marginBottom:"6rem"
        }}
        className={`vh-100 text-white sticky-top   up `}
      >
        <ProSidebar
          style={{ backgroundColor: "#16202c !important", width: "100vw" }}
          image={false}
        >
          <SidebarContent>
            <Menu iconShape="circle" className="100vw">
              {competitions?.all_sports.map((competition, index) => (
                <SubMenu
                  title={competition.sport_name}
                  defaultOpen={getActiveSport(competition.sport_id)}
                  onClick={() => gaEventTracker(`${competition?.sport_name}`)}
                  icon={
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "20px",
                        display: "block",
                      }}
                      src={getSportImageIcon(competition.sport_name)}
                    />
                  }
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
                          onClick={() =>
                            gaEventTracker(`${country?.category_name}`)
                          }
                          icon={
                            <img
                              style={{ borderRadius: "50%", height: "20px" }}
                              src={getSportImageIcon(
                                country.cat_flag,
                                "flags-1-1",
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
                  </SubMenu>
                </SubMenu>
              ))}
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
      <Right/>
    </div>
  );
};

export default Sidebar;
