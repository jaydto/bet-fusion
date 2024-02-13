import React, { useContext, useEffect, useRef, useState } from "react";
import "./casino.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, ButtonGroup } from "react-bootstrap";
import CasinoCarouselLoader from "./CasinoCarouseld";
import {
  faAngleLeft,
  faAngleRight,
  faCampground,
  faFire,
  faHome,
  faReceipt,
  faRecordVinyl,
  faSmile,
  faSquareCaretLeft,
  faSquareCaretRight,
  faStar,
  faStarAndCrescent,
  faStarHalf,
  faStarOfDavid,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../../utils/local-storage";
import { casinoList } from "../../../redux/virtualsSlice";
import { StoreContext } from "../../../context/store";
import { Link, useNavigate } from "react-router-dom";
import { faAffiliatetheme } from "@fortawesome/free-brands-svg-icons";

const NewCasino = () => {
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));

  const [categories, setCategories] = useState([]);
  const { state, dispatch } = useContext(StoreContext);

  const [games, setGames] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const casino_categories = useSelector(
    (state) => state.virtuals.casino_categories
  );
  const casino_games = useSelector((state) => state.virtuals.casino_games);

  const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  const defaultCasinoCategory =
    settings?.casinoConfigs?.casino_default_category;

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  const [activeCategory, setActiveCategory] = useState(); // Set the default active category

  const handleSearchClick = () => {
    setShowFilters(false);
  };

  const handleBackClick = () => {
    setShowFilters(true);
  };

  const categories_info = ["popular", "drops-n-wins", "vs", "cs", "lg"];

  const fetchGames = async (category) => {
    let endpoint;
    if (category) endpoint = "/v1/casino-games?game-type-id=" + category;
    else endpoint = "/v1/casino-games";
    let method = "GET";
    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
    };
    dispatchRedux(casinoList(data));
  };

  useEffect(() => {
    categories_info.forEach((category) => fetchGames(category));
  }, []);

  const getCategoryGames = (category) => {
    setGames([]);
    fetchGames(category?.game_type_id);
    setActiveCategory(category?.game_type_id); // Set the active category when clicked
  };

  const filterGamesAvailable = (category) => {
    //filter games
    setActiveCategory(category?.default_description ?? category); // Set the active category when clicked
    if (activeCategory === "All") {
      dispatch({ type: "SET", key: "casino_search", payload: games });
    } else {
      const filteredData = games?.filter((item) =>
        item.gameCategory
          .toLowerCase()
          .includes(category?.default_description?.toLowerCase())
      );
      dispatch({ type: "SET", key: "casino_search", payload: filteredData });
    }
  };

  return (
    <div className="games-page d-flex">
      <div className="left-nav lazyloaded">
        {/* <div className="logo">
          <Link to="/">
            <LazyLoadImage
              width="259"
              height="243"
              src="https://cdn.betnare.com/logo-white.webp"
              className="img-fluid mx-auto d-block ls-is-cached lazyloaded"
            />
          </Link>
        </div> */}

        <div
          className="menu-container"
          data-scrollbar="true"
          tabIndex="-1"
          style={{ overflow: "hidden", outline: "none" }}
        >
          <div className="scroll-content mb-3">
            <MenuItem title="RECOMMENDED" icon={faRecordVinyl} color={"gold"}>
              <div id="v-game-filters">
                <div className="sideFilters">
                  <div className="filtersContainer">
                    <FilterItem
                      title="Hot"
                      link="?hot"
                      icon={faFire}
                      icon_color="red"
                    />
                    <FilterItem
                      title="Popular"
                      link="?popular"
                      icon={faSmile}
                      icon_color="gold"
                    />
                  </div>
                </div>
              </div>
            </MenuItem>
            <MenuItem title="CATEGORIES" icon={faCampground} color="">
              <div id="v-game-filters">
                <div className="sideFilters">
                  <div className="filtersContainer">
                    <FilterItem
                      title="Favorites"
                      link="?favorite"
                      icon={faStar}
                      icon_color="gold"
                    />
                    <FilterItem title="SLOTS PLAY" link="?slots" />
                    <FilterItem title="ROULETTE PLAY" link="?roulette" />
                    <FilterItem title="BLACKJACK" link="?blckjack" />
                    <FilterItem title="CARD PLAY" link="?card_play" />
                    <FilterItem title="VIDEO POKER" link="?video_poker" />
                    <FilterItem title="LIVE CASINO" link="?live_casino" />
                    <FilterItem title="POPULAR" link="?popular_pragmatic" />
                    <FilterItem title="JACKPOT" link="?drops_and_wins" />
                    <FilterItem title="VIRTUALS" link="?virtuals" />
                  </div>
                </div>
              </div>
            </MenuItem>
            <MenuItem title="GAME PROVIDER" icon={faAffiliatetheme} color="">
              <div id="v-game-filters">
                <div className="sideFilters">
                  <div className="filtersContainer">
                    <FilterItem title="Pragmatic" link="?pragmatic" />
                    <FilterItem title="SmartSoft" link="?smart_soft" />
                    <FilterItem title="Spribe" link="?spribe" />
                  </div>
                </div>
              </div>
            </MenuItem>

            {/* <div className="menu-item not-active">
              <Link to="/favorites/">
                <i className="ico ico-kickers"></i> GAME PROVIDER{" "}
                <i className="ico ico-chevron-right"></i>
              </Link>
              <div className="menu-item active">
                <div id="v-game-filters">
                  <div className="sideFilters" data-v-72be8539="">
                    <div className="totalFound" data-v-72be8539="">
                    0 PLAYS FOUND
                  </div>
                    <div className="filtersContainer" data-v-72be8539="">
                      <div className="filter-item" data-v-72be8539="">
                        Pragmatic
                        <i className="ico ico-chevron-right" data-v-72be8539=""></i>
                      </div>
                      <div className="filter-item" data-v-72be8539="">
                        SmartSoft
                        <i className="ico ico-chevron-right" data-v-72be8539=""></i>
                      </div>
                      <div className="filter-item" data-v-72be8539="">
                        Spribe
                        <i className="ico ico-chevron-right" data-v-72be8539=""></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="menu-item not-active">
              <Link to="/help/">
                <i className="ico ico-help"></i>HELP{" "}
              </Link>
            </div> */}
          </div>
          <div
            className="scrollbar-track scrollbar-track-y show"
            style={{ display: "block" }}
          >
            <div
              className="scrollbar-thumb scrollbar-thumb-y"
              style={{
                height: "20px",
                transform: "translate3d(0px, 0px, 0px)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="right-body ">
        <div className="casino-data">
          <section className="sections-container mb-3">
            <div className={"casino-banner-image"}>
              <CasinoCarouselLoader />
            </div>
          </section>
          <section className="sections-container">
            <ul
              className={`filters ${
                showFilters ? "d-flex" : "d-none"
              } pb-3 pb-xl-0 mr-0 ml-0 mt-3 mb-3 mt-xl-3 mb-xl-1 align-items-center `}
            >
              <li className="ml-3 d-xl-none" id="v-search-mobile">
                <Link to="#" onClick={handleSearchClick}>
                  <i className="ico ico-search"></i>
                  <span className="filters-settings">SEARCH</span>
                </Link>
              </li>
              <li>
                <Link to="?slots">
                  <i className="ico ico-reels"></i>
                  <span className="filters-settings">SLOTS PLAY</span>
                </Link>
              </li>
              <li>
                <Link to="?roulette">
                  <i className="ico ico-roulette"></i>
                  <span className="filters-settings">ROULETTE PLAY</span>
                </Link>
              </li>
              <li>
                <Link to="?blackjack">
                  <i className="ico ico-blackjack"></i>
                  <span className="filters-settings">BLACKJACK</span>
                </Link>
              </li>
              <li>
                <Link to="?live-casino">
                  <i className="ico ico-livecasino"></i>
                  <span className="filters-settings">LIVE CASINO</span>
                </Link>
              </li>
              <li>
                <Link to="?jackpot">
                  <i className="ico ico-jackpot"></i>
                  <span className="filters-settings">JACKPOT PLAY</span>
                </Link>
                <div id="v-total-jackpot"></div>
              </li>
              <li>
                <Link to="?video-poker">
                  <i className="ico ico-cardplay"></i>
                  <span className="filters-settings">CARD PLAY</span>
                </Link>
              </li>
            </ul>
          </section>
          <section
            className={`section-container ${
              !showFilters ? "d-flex" : "d-none"
            }`}
            id="v-search"
          >
            <div className="search-wrapper">
              <div className="search-group">
                <div className="search-input-group">
                  <span className="search-addon">
                    <i className="ico ico-search"></i>
                  </span>
                  <input type="text" placeholder="SEARCH..." />
                  <span className="close-addon">
                    <i className="ico ico-close"></i>
                  </span>
                </div>
              </div>
              <span className="search-close" onClick={handleBackClick}>
                <i className="ico ico-chevron-left"></i> BACK{" "}
              </span>
              <div className="search-advance">
                <i className="ico ico-search"></i> ADVANCED SEARCH{" "}
              </div>
            </div>
          </section>

          {categories_info.map((category) => {
            // Find the category object in casino_games array
            const categoryGames = casino_games.find((game) => game[category]);
            const popularGames = categoryGames ? categoryGames[category] : [];
            return (
              <Categories
                user={user}
                games={popularGames}
                title={category?.toUpperCase()}
              />
            );
          })}

          {/* <Categories user={user} games={[]} title={"new"} /> */}
        </div>
      </div>
    </div>
  );
};

export default NewCasino;

const Categories = ({ title, games, user }) => {
  const [showButtons, setShowButtons] = useState(null);
  const show = useSelector((state) => state.data.show_menu_casino);
  const game_type = useSelector((state) => state.virtuals.game_type);
  const navigate = useNavigate();

  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 100;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      container.scrollLeft += scrollAmount;
    }
  };
  const handleMouseEnter = (index) => {
    setShowButtons(index);
  };

  const handleMouseLeave = (index) => {
    setShowButtons(index);
  };

  const handleMobileClick = (index) => {
    if (window.innerWidth <= 767) {
      setShowButtons(showButtons === index ? null : index);
    }
  };
  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevent event from propagating to parent element
  };

  const handleScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    return (
      <>
        <FontAwesomeIcon
          icon={faSquareCaretLeft}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === 0 ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino`}
          onClick={() => handleScroll("left")}
        />
        &nbsp;
        <FontAwesomeIcon
          icon={faSquareCaretRight}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === maxScroll ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino `}
          onClick={() => handleScroll("right")}
        />
      </>
    );
  };

  const launchGame = (
    game_id,
    live = true,
    gameCategory = "",
    provider = ""
  ) => {
    const redirectToGameplay = () => {
      window.location.href = `/gameplay/${game_id}/${live ? "1" : "0"}`;
    };

    const redirectToNareGames = () => {
      window.location.href = `/nare-games/${game_id}${
        live ? "?status=live" : "?status=demo"
      }`;
    };

    const redirectToSmartPlay = () => {
      window.location.href = `/smart-play?game=${game_id}&category=${gameCategory}&status=${
        live ? "live" : "demo"
      }`;
    };

    if (user) {
      if (game_type !== "crash-games") {
        switch (game_type) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smart-soft":
            redirectToSmartPlay();
            break;
        }
      } else if (game_type === "crash-games") {
        switch (provider) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smartsoft":
            redirectToSmartPlay();
            break;
          default:
            navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  };
  // console.log("games_data", games)
  return (
    <section className="sections-container section-white ">
      <div id="app-container">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="category-title ml-3 ml-xl-0 d-flex d-xl-block justify-content-between newGames">
            {title} <span>View ALL</span>
          </h3>
          <div className="d-flex align-items-center mx-3 icons-size-direction-casino">
            {handleScrollButtons()}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="gamesInline d-flex justify-content-start pb-3 pl-2"
        title={title}
        all="false"
        overlay="false"
        big="false"
        style={{ width: "100%", overflow: "auto hidden" }}
      >
        {
          games?.map((game, key)=>{
           return <div
          key={key}
          className="gameInlineThumb image-container"
          style={{ marginRight: "calc(var(--bs-gutter-x) / 2)" }}
        >
          <div
            className={`size-images-casino ${
              showButtons ===key && "mobile-click"
            }`}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMobileClick(1)}
          >
            <LazyLoadImage
              effect={"blur"}
              className=" ls-is-cached"
              // src="https://api-dk10.pragmaticplay.net/game_pic/square/200/vs40wildwest.png"
              src={game?.game_icon}
            />

            <div className="overlay">
              <ButtonGroup aria-label="Casino Gaming Buttons">
                <Button
                  variant="warning"
                  onClick={(event) => handleButtonClick(event)}
                >
                  Play Demo
                </Button>
                <Button
                  variant="danger"
                  onClick={(event) => handleButtonClick(event)}
                >
                  Play Game
                </Button>
              </ButtonGroup>
            </div>

            {/* <div className="gameAttributes">
                <div
                  className="new"
                >
                  <span>NEW</span>
                </div>
              </div> */}
          </div>
        </div>
          })
        }
        <div
          key={1}
          className="gameInlineThumb image-container"
          style={{ marginRight: "calc(var(--bs-gutter-x) / 2)" }}
        >
          <div
            className={`size-images-casino ${
              showButtons == 1 && "mobile-click"
            }`}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMobileClick(1)}
          >
            <LazyLoadImage
              effect={"blur"}
              className=" ls-is-cached"
              // src="https://api-dk10.pragmaticplay.net/game_pic/square/200/vs40wildwest.png"
              src={games?.game_icon}
            />

            <div className="overlay">
              <ButtonGroup aria-label="Casino Gaming Buttons">
                <Button
                  variant="warning"
                  onClick={(event) => handleButtonClick(event)}
                >
                  Play Demo
                </Button>
                <Button
                  variant="danger"
                  onClick={(event) => handleButtonClick(event)}
                >
                  Play Game
                </Button>
              </ButtonGroup>
            </div>

            {/* <div className="gameAttributes">
                <div
                  className="new"
                >
                  <span>NEW</span>
                </div>
              </div> */}
          </div>
        </div>
       
      </div>
    </section>
  );
};

function MenuItem({ title, icon, children, color }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(isOpen);
  };

  return (
    <div
      className={`menu-item ${
        color?.length > 0 && color != undefined ? " recommended-casino " : ""
      } ${isOpen ? "active" : "not-active"}`}
    >
      <div
        className="d-flex justify-content-between align-items-center menu-info"
        onClick={toggleCollapse}
        style={{
          background:
            "repeating-linear-gradient(45deg, #0d6efd, transparent 100px)",
        }}
      >
        <span className="text-start">
          <FontAwesomeIcon icon={icon} /> {title}
        </span>
        {/* <FontAwesomeIcon icon={faAngleRight} /> */}
      </div>
      {isOpen && <div className="py-3">{children}</div>}
    </div>
  );
}
function FilterItem({ title, icon, link, icon_color }) {
  return (
    <div className="filter-item" data-v-72be8539="">
      {icon && <FontAwesomeIcon icon={icon} style={{ color: icon_color }} />}{" "}
      {/* Check if there is an icon and render it */}
      &nbsp;<Link to={link}>{title}</Link>
      {!icon && <i className="ico ico-chevron-right" data-v-72be8539=""></i>}
    </div>
  );
}
