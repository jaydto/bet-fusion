import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import {
  getFromLocalStorage,
  setLocalStorage,
} from "../../utils/local-storage";
import React, { useContext, useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  faHelicopter,
  faSailboat,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import { faMagento } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../redux/dataSlice";
import {
  casinoList,
  setState as setVirtualGame,
} from "../../../redux/virtualsSlice";
import SearchResults from "../../pages/casino/searchField";
import makeRequest from "../../utils/fetch-request";
import { StoreContext } from "../../../context/store";

const SideBarCasino = React.memo((props) => {
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));

  const { games, setGames, setCategories } = props;
  const { dispatch } = useContext(StoreContext);

  const casino_games = useSelector((state) => state.virtuals.casino_games);
  const default_choice = useSelector((state) => state.virtuals.game_type);
  const storedCategories = getFromLocalStorage("casino_categories");

 

  

  const getSmartGames = async () => {
    let endpoint = "/v2/smartsoft-games";

    let method = "POST";

    await makeRequest({ url: endpoint, method: method }).then(
      ([status, result]) => {
        if (status === 200) {
          setGames(result?.games);
          if (result?.types !== storedCategories && result?.types !== null) {
            setCategories(result?.types);
            setLocalStorage("casino_categories", result?.types, 86400000);
          }
        }
      }
    );
  };



  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);
  const dispatchRedux = useDispatch();
  const [activeGame, setActiveGame] = useState(default_choice ?? "pragmatic"); // Default active game
  const casino_categories = useSelector(
    (state) => state.virtuals.casino_categories
  );
  const handleClose = () => {
    dispatchRedux(setState("show_menu_casino", false));
  };

  const handleGameChoice = (game) => {
    //dispatch action to set the game choice type

    dispatchRedux(setVirtualGame("game_type", game));
    setActiveGame(game);
    dispatch({ type: "SET", key: "casino_search", payload: {} });
    const firstItem =  casino_categories?.[0];
     if (game === "smart-soft") {
      getSmartGames();
    } 
  };

  return (
    <ProSidebar
      className={"background-primary"}
      style={{ width: "100%" }}
      image={false}
    >
      <SidebarHeader className={"background-primary"}>
        <Menu className="desktop-only-show d-flex  justify-content-between">
          <MenuItem className={"d-flex justify-content-between px-3 mb-3"}>
            <div className={"d-flex gap-4 align-items-center "}>Providers</div>
          </MenuItem>
          <MenuItem
            className={"d-flex justify-content-between"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="desktop-only-show">
              <SearchResults data={games} />
            </div>
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem className={"d-flex justify-content-between"}>
            <div
              className={`d-flex gap-4 align-items-center ${
                activeGame === "smart-soft" ? " active-casino" : ""
              }`}
            >
              <FontAwesomeIcon icon={faStreetView} className={"svg-mobile"} />
              
            </div>
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem className={"d-flex justify-content-between"}>
            <div
              className={`d-flex gap-4 align-items-center ${
                activeGame === "smart-soft" ? " active-casino" : ""
              }`}
            >
              <FontAwesomeIcon icon={faSailboat} className={"svg-mobile"} />
              <div
                onClick={() => {
                  handleClose();
                  handleGameChoice("smart-soft");
                }}
              >
                Smart Soft
              </div>
            </div>
          </MenuItem>
        </Menu>

       
       
      </SidebarHeader>
      <SidebarContent className={"background-primary"}></SidebarContent>
      <SidebarFooter className={"background-primary"}></SidebarFooter>
    </ProSidebar>
  );
});

export default React.memo(SideBarCasino);
