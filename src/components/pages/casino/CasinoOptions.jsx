import React, { useContext, useEffect, useState } from "react";
import "./casino.css";
import {
  Button,
  ButtonGroup,
  Navbar,
  Offcanvas,
  ToastContainer,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import SideBarCasino from "../../sidebar/awesome/SideBarCasino";
import SearchComponent from "../virtuals/searchField";
import { StoreContext } from "../../../context/store";
import { casinoList } from "../../../redux/virtualsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import aviator from "../../../assets/img/aviator.png";
import { getFromLocalStorage } from "../../utils/local-storage";

const CasinoOptions = () => {
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));

  const expand = "md";
  const [categories, setCategories] = useState([]);

  const [games, setGames] = useState([]);

  const [activeCategory, setActiveCategory] = useState("popular"); // Set the default active category
  const navigate = useNavigate();

  const { state } = useContext(StoreContext);
  // const loading=useSelector((state)=>state.virtuals.loading)
  const casino_games = useSelector((state) => state.virtuals.casino_games);
  const show = useSelector((state) => state.data.show_menu_casino);
  const game_type = useSelector((state) => state.virtuals.game_type);
  const casino_categories = useSelector(
    (state) => state.virtuals.casino_categories
  );

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  useEffect(() => {
    if (casino_games) {
      setGames(casino_games);
    }
    if (casino_categories) {
      setCategories(casino_categories);
    }
  }, [casino_games, casino_categories]);

  const fetchGames = async (category = "popular") => {
    let endpoint = "/v1/casino-games?game-type-id=" + category;
    let method = "GET";
    const data = {
      endpoint: endpoint,
      method: method,
    };
    dispatchRedux(casinoList(data));
  };

  const getCategoryGames = (category) => {
    setGames([]);
    fetchGames(category?.game_type_id);
    setActiveCategory(category?.game_type_id); // Set the active category when clicked
  };

  const launchGame = (game_id, live = true, gameCategory='') => {
    user
      ? game_type=='pragmatic'?(window.location.href = `/gameplay/${game_id}/${live ? "1" : "0"}`): game_type=='spribe'?(window.location.href = `/nare-games/${game_id}${live ? '?status=demo': "?status=live"}`):(window.location.href = `/smart-play?game=${game_id}&category=${gameCategory}&status=${live ? 'live':'demo'}`)
      : navigate("/login");
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const launchAviator = (status) => {
    if (status === "demo") {
      navigate("/nare-games/aviator?status=demo");
    } else {
      navigate("/nare-games/aviator?status=live");
    }
  };



  const handleShow = () => {
    dispatchRedux(setState("show_menu_casino", true));
  };
  const handleClose = () => {
    dispatchRedux(setState("show_menu_casino", false));
  };
  const toggle = () => {
    show ? handleClose() : handleShow();
  };
  return (
    <div className={"flex-item casino-options-container"}>
      <div className="item4 casino-options">
        <ToastContainer />
      </div>
      <div
        className={`flex-container  flex-column  top-spacing-page-no-download-casino`}
      >
        <div className="item2">
          <div className="item2 size-all-markets casino-header-banner">
            <div className={"casino-banner-image"}></div>
          </div>
          <Navbar
            expand="md"
            className={` mb-0 ck pt-sm-0 pt-md-2 pc os app-navbar `}
            variant="dark"
          >
            <div
              className={
                "w-100 d-flex justify-content-between mobile-change desktop-ipad-size top-header-main"
              }
            >
              <div className={"d-flex w-100 directions-header-nav"}>
                <Navbar.Brand
                  className={`e logo align-self-start align-items-center menu-control d-flex justify-content-between w-100`}
                  title="Betnare"
                >
                  <div className="px-2 w-75">
                    <SearchComponent data={games} />
                  </div>

                  <div
                    className="col-1 button-toggle space-button"
                    style={{
                      width: "4.1rem",
                      overflowY: "auto",
                      marginLeft: "20px",
                    }}
                  >
                    <Navbar.Toggle
                      aria-controls={`offcanvasNavbar-expand-${"lg"}`}
                      className="px-3 py-3"
                      onClick={toggle}
                    />
                  </div>
                </Navbar.Brand>

                {/*todo check information provided for a user*/}
                <div
                  className={` col-10 change-size desk-top`}
                  id="navbar-collapse-main "
                ></div>
              </div>

              <Offcanvas
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: "9999",
                  position: "fixed",
                  top: "26rem",
                  //   marginTop: "10rem",
                  overflowY: "auto",
                }}
                placement={"bottom"}
                onHide={handleClose}
                show={show}
                className="off-canvas background-primary p-0"
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              >
                <Offcanvas.Header
                  closeButton
                  className="text-white"
                  closeVariant={"white"}
                  onClick={toggle}
                >
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <div className="col-10">
                      <div onClick={(e) => e.stopPropagation()}>
                        <h2 className="normal header-providers ">Providers</h2>
                      </div>
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <SideBarCasino games={games} setGames={setGames} setCategories={setCategories}/>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Navbar>

          <div className="col-md-12 d-flex flex-column mt-2 ">
            <div className="col-md-12 casino-scroll">
              <div className="shadow-sm p-2 shadow-sm casino-category-container mt-2">
                {categories?.map(
                  (category, index) =>
                    category?.game_type_id !== "rgs-vsb" && (
                      <Button
                        bg={
                          activeCategory === category?.game_type_id??category?.default_description
                            ? "warning"
                            : "default"
                        }
                        key={index}
                        style={{ marginRight: "2px" }}
                        className={`cursor-pointer text-center casino-category ${
                          activeCategory === category?.game_type_id??category?.default_description
                            ? " active-category "
                            : ""
                        } casino-category-button`}
                        onClick={() => getCategoryGames(category)}
                      >
                        {category?.game_type_description??category?.default_description}
                      </Button>
                    )
                )}
              </div>
            </div>

            <div className="d-flex">
                <div className="desktop-only-show">
                <SideBarCasino games={games} setGames={setGames} setCategories={setCategories}/>
                </div>
              <div
                className={
                  "row text-white p-2 shadow-sm justify-content-center"
                }
              >
                {state?.casino_search !== undefined &&
                state?.casino_search.length > 0
                  ? state?.casino_search?.map((search_game, index) =>
                      search_game?.game_id === "rgs-vsv" ? (
                        ""
                      ) : (
                        <div
                          key={index}
                          className={"col-md-4 col-lg-3 col-sm-4 virtual-width"}
                        >
                          <div
                            className={
                              "mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container"
                            }
                          >
                            <div
                              onClick={() =>
                                launchGame(search_game?.game_id??search_game?.gameName??search_game?.key, true, search_game?.gameCategory)
                              }
                              className=""
                              key={search_game.game_id}
                            >
                              <p
                                className={
                                  "text-center bold text-elipsis text-uppercase"
                                }
                              >
                                {search_game?.game_name}
                              </p>
                              <LazyLoadImage
                                effect={"blur"}
                                src={`${search_game.game_icon??search_game.image_url}`}
                                className={"virtual-game-image vw-100"}
                              />
                            </div>
                            <div className="overlay shadow-sm row">
                              <ButtonGroup aria-label="Basic example">
                                <Button
                                  variant="warning"
                                  onClick={() =>
                                    launchGame(search_game?.game_id??search_game?.gameName??search_game?.key, false, search_game?.gameCategory)
                                  }
                                >
                                  Play Demo
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    launchGame(search_game?.game_id??search_game?.gameName??search_game?.key, true,search_game?.gameCategory )
                                  }
                                >
                                  Play Game
                                </Button>
                              </ButtonGroup>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  : games?.reduce((result, game, index) => {
                      if (game?.game_id === "rgs-vsv") {
                        // Skip games with game_id "rgs-vsv"
                        return result;
                      }

                      if (
                        game?.game_type_id === "vs" &&
                        activeCategory === "popular"
                      ) {
                        // Include JSX block for Aviator at the beginning
                        if (index === 0) {
                          result.push(
                            <div
                              key="vs"
                              className={
                                "col-md-4 col-lg-3 col-sm-4 virtual-width"
                              }
                            >
                              <div className={"virtual-game-container"}>
                                <div
                                  onClick={() =>
                                    navigate("/nare-games/aviator")
                                  }
                                  className=""
                                >
                                  <p
                                    className={
                                      "text-center bold text-elipsis text-uppercase"
                                    }
                                  >
                                    Aviator
                                  </p>
                                  <LazyLoadImage
                                    effect={"blur"}
                                    src={aviator}
                                    className={"virtual-game-image vw-100"}
                                  />
                                </div>
                                <div className="overlay shadow-sm w-100">
                                  <ButtonGroup
                                    aria-label="Casino Games"
                                    className={"w-100"}
                                  >
                                    <Button
                                      variant="warning"
                                      onClick={() => launchAviator("demo")}
                                    >
                                      Play Demo
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() => launchAviator("live")}
                                    >
                                      Play Game
                                    </Button>
                                  </ButtonGroup>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          // Include JSX block for other "vs" games
                          result.push(
                            <div
                              key={index}
                              className={
                                "col-md-4 col-lg-3 col-sm-4 virtual-width"
                              }
                            >
                              {/*other "vs" games */}
                              <div
                                key={index}
                                className={"virtual-game-container"}
                              >
                                <div
                                  onClick={() =>
                                    navigate(`/nare-games/${game?.game_id}`)
                                  }
                                  className=""
                                >
                                  <p
                                    className={
                                      "text-center bold text-elipsis text-uppercase"
                                    }
                                  >
                                    {game?.game_name}
                                  </p>
                                  <LazyLoadImage
                                    src={`${game?.game_icon??game?.image_url}`}
                                    effect={"blur"}
                                    className={"virtual-game-image vw-100"}
                                  />
                                </div>
                                <div className="overlay shadow-sm w-100">
                                  <ButtonGroup
                                    aria-label="Casino Games"
                                    className={"w-100"}
                                  >
                                    <Button
                                      variant="warning"
                                      onClick={() =>
                                        launchGame(game?.game_id??game?.gameName??game?.key, false, game?.gameCategory)
                                      }
                                    >
                                      Play Demo
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        launchGame(game?.game_id??game?.gameName??game?.key, true, game?.gameCategory)
                                      }
                                    >
                                      Play Game
                                    </Button>
                                  </ButtonGroup>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      } else {
                        // JSX block for other games
                        result.push(
                          <div
                            key={index}
                            className={
                              "col-md-4 col-lg-3 col-sm-4 virtual-width"
                            }
                          >
                            <div className={"virtual-game-container"}>
                              <div
                                onClick={() =>
                                  navigate(`/nare-games/${game?.game_id}`)
                                }
                                className=""
                              >
                                <p
                                  className={
                                    "text-center bold text-elipsis text-uppercase"
                                  }
                                >
                                  {game?.game_name}
                                </p>
                                <LazyLoadImage
                                  src={`${game?.game_icon??game?.image_url}`}
                                  effect={"blur"}
                                  className={"virtual-game-image vw-100"}
                                />
                              </div>
                              <div className="overlay shadow-sm w-100">
                                <ButtonGroup
                                  aria-label="Casino Games"
                                  className={"w-100"}
                                >
                                  <Button
                                    variant="warning"
                                    onClick={() =>
                                      launchGame(game?.game_id??game?.gameName??game?.key, false, game?.gameCategory)

                                    }
                                  >
                                    Play Demo
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() =>
                                      launchGame(game?.game_id??game?.gameName??game?.key, true, game?.gameCategory)

                                    }
                                  >
                                    Play Game
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </div>
                          </div>
                          /* ... */
                        );
                      }
                      return result;
                    }, [])}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoOptions;
