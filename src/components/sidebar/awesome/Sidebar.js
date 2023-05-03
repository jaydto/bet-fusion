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
import {
  getFromLocalStorage,
  setLocalStorage,
} from "../../utils/local-storage";
import makeRequest from "../../utils/fetch-request";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const gaEventTracker = useAnalyticsEventTracker("Navigation");
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [sport, setSport] = useState(79);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
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
        : require(`../../../assets/svg/${folder}/${sport_name}.png`);
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
      className={`vh-100 text-white sticky-top d-none d-md-none d-lg-block up `}
    >
      <ProSidebar
        style={{ backgroundColor: "#16202c !important" }}
        image={false}
        onToggle={handleToggleSidebar}
        collapsed={collapsed}
        toggled={toggled}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "5px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div className="d-flex justify-content-end">
              <span
                onClick={() => setCollapsed(!collapsed)}
                className={"cursor-pointer"}
              >
                {collapsed ? (
                  <>
                    Show <FontAwesomeIcon icon={faArrowRight} />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faArrowLeft} /> Hide
                  </>
                )}
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            {competitions?.all_sports.map((competition, index) => (
              <SubMenu
                title={competition.sport_name}
                defaultOpen={getActiveSport(competition.sport_id)}
                onClick={() => gaEventTracker(`${competition?.sport_name}`)}
                icon={
                  <img
                    style={{ borderRadius: "50%", height: "20px" }}
                    src={getSportImageIcon(competition.sport_name)}
                  />
                }
                key={index}
              >
                {index === 0 && (
                  <SubMenu title={"Top Leagues"}>
                    {competitions?.top_soccer?.map((top_league, index) => (
                      <MenuItem
                        key={`l_${index}`}
                        icon={
                          <img
                            src={getSportImageIcon(
                              top_league?.competition_name,
                              "leagues",
                              true
                            )}
                            style={{ borderRadius: "50%", height: "20px" }}
                          ></img>
                        }
                      >
                        <a
                          onClick={() =>
                            gaEventTracker(
                              `Top Leagues ${top_league?.competition_name}`
                            )
                          }
                          href={`/competition/${top_league.sport_id}/${
                            top_league.category_id
                          }/${top_league.competition_id}?sport_id=${
                            competition.sport_id
                          }&sub_type_id=${getDefaultMarketsForSport(
                            competition
                          )}`}
                        >
                          {top_league?.competition_name}
                        </a>
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
                <SubMenu
                  title={"Countries"}
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
                                country.category_name,
                                "flags-1-1",
                                true,
                                true
                              )}
                          />
                        }
                      >
                        {country?.competitions.map((league, leagueKey) => (
                          <MenuItem key={`${leagueKey}_league`}>
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
                <MenuItem>
                  <Link
                    onClick={() =>
                      gaEventTracker(`Today Games ${competition?.sport_name}`)
                    }
                    to={`/upcoming?sport_id =${
                      competition.sport_id
                    }&sub_type_id=${getDefaultMarketsForSport(competition)}`}
                  >
                    Today Games
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() =>
                      gaEventTracker(`Highlights ${competition?.sport_name}`)
                    }
                    to={`/highlights?sport_id=${
                      competition.sport_id
                    }&sub_type_id=${getDefaultMarketsForSport(competition)}`}
                  >
                    Highlights
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() =>
                      gaEventTracker(`Tomorrow ${competition?.sport_name}`)
                    }
                    to={`/tomorrow?sport_id=${
                      competition.sport_id
                    }&sub_type_id=${getDefaultMarketsForSport(competition)}`}
                  >
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
