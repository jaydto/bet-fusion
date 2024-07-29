import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { casinoList } from "../../redux/virtualsSlice";
import { Link, useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../utils/local-storage";
import OverlayImage from "../../assets/img/mobile/overlayImage.png";
import useWindowDimensions from "../header/Dimensions";

const sections = [
  // "smartSoft",
  
  "popular",
  "crash games",
  "instant games",
  "virtual League",
  "slots",
];




const CasinoGamesComponent = () => {
  const dispatch = useDispatch();
  const casino_games = useSelector((state) => state.virtuals.casino_games);
  const userData = useSelector((state) => state.auth.user);
  const casino_search = useSelector((state) => state.virtuals.casino_search);
  const {width}=useWindowDimensions()

  const [user, setUser] = useState(getFromLocalStorage("user"));
  const [visibleItems, setVisibleItems] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section]: 9 }), {})
  );
  const competitionData = useSelector((state) => state.virtualLeague.competitions_data) || getFromLocalStorage('kiron-competitions')

  const navigate = useNavigate();
  const sectionRefs = useRef({});
  const defaultVisibleCount = {
    // smartSoft: 0,
    popular:0,
    "crash games":  width<991 ? 0 : 4,
    "instant games":0,
    "virtual League":  0,
    slots:   width<991 ? 0 : 4,
  };

  useEffect(() => {
    getSmartGames("slots");
  }, []);

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  const getSmartGames = async (category) => {
    let endpoint = "/v2/smartsoft-games";
    let method = "POST";

    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "smart-soft",
    };

    dispatch(casinoList(data));
  };

  const handleButtonClick = (event, game_id, gameCategory) => {
    event.stopPropagation();

    const redirectToSmartPlay = () => {
      navigate(
        `/smart-play?game=${game_id}&category=${gameCategory}&status=live`
      );
    };

    if (user) {
      redirectToSmartPlay();
    } else {
      navigate("/login");
    }
  };

  const handleSeeMore = (section, totalLength) => {
    setVisibleItems((prevVisibleItems) => ({
      ...prevVisibleItems,
      [section]: totalLength,
    }));
    if (sectionRefs.current[section]) {
      sectionRefs.current[section].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSeeLess = (section) => {
    setVisibleItems((prevVisibleItems) => ({
      ...prevVisibleItems,
      [section]: 9,
    }));
  };

  const renderCasinoGames = (games, section) => {
    const gamesToDisplay = games?.slice(0, visibleItems[section]);
    return gamesToDisplay?.flatMap((providerGames, providerIndex) =>
      providerGames[Object.keys(providerGames)[0]]
        ?.slice(0, visibleItems[section])
        ?.map((game, gameIndex) => (
          <div
            key={`${providerIndex}-${gameIndex}`}
            className={`grid-item ${
              gameIndex === defaultVisibleCount[section] ? "span-2" :gameIndex ===1?"span-3" : ""
            }`}
            data-provider={game.provider}
            data-category="slots"
            data-order={gameIndex}
            data-id={game.gameId}
          >
            <div
              className="jpOverlay"
              style={{ backgroundImage: `url(${OverlayImage})` }}
            ></div>
            <div className="gamePanel">
              <div
                className="img"
                style={{
                  backgroundImage: `url(${game?.game_icon ?? game?.image_url})`,
                  width: "-webkit-fill-available",
                }}
              ></div>
              <div className="reaCover">
                <div
                  data-real="1"
                  className="link Real"
                  onClick={(event) =>
                    handleButtonClick(
                      event,
                      game?.game_id ?? game?.gameName ?? game?.key,
                      game?.gameCategory
                    )
                  }
                >
                  <div>Play now</div>
                </div>
              </div>
            </div>
            <div className="imgCover">
              <h4>{game?.game_name ?? game?.gameName}</h4>
              <a className="infoBtn">
                <div>i</div>
              </a>
              <Link
                data-real="0"
                className="link Fun"
                to={`/smart-play?game=${game?.game_id}&category=${game?.gameCategory}&status=demo`}
                target="_self"
              >
                <div>Demo</div>
              </Link>
            </div>
          </div>
        ))
    );
  };

  const renderVirtualLeague = () => {
    const gamesToDisplay = competitionData?.slice(0, visibleItems["virtual League"]);
    return gamesToDisplay?.map((competition, index) => (
      <div
        key={competition.competition_id}
        className={`grid-item`}
        data-provider="virtual-league"
        data-category="virtual-league"
        data-order={index}
        data-id={competition.competition_id}
        
      >
        <div
          className="jpOverlay"
         
        ></div>
        <div className="gamePanel">
          <div
            className="img"
            style={{
              backgroundImage: `url(${competition.image_url})`,
              width: "-webkit-fill-available",
            }}
          ></div>
          <div className="reaCover">
            <div className="link Real">
              <Link className="d-flex" to={`virtual-league?competition_id=${competition?.competition_id}`}>View Competition</Link>
            </div>
          </div>
        </div>
        <div className="imgCover">
          <h4>{competition.competition_name}</h4>
          <a className="infoBtn">
            <div>i</div>
          </a>
        </div>
      </div>
    ));
  };

  const renderCasinoSearch = (games, section) => {
    const gamesToDisplay = games?.slice(0, visibleItems[section]);
    return gamesToDisplay?.map((game, gameIndex) => (
      <div
        key={`${game.provider}-${game.game.gameId}`}
        className={`grid-item ${gameIndex === 0 ? "span-2" : ""}`}
        data-provider={game.provider}
        data-category={game.game.gameCategory}
        data-order={gameIndex}
        data-id={game.game.gameId}
        // ref={(el) => {
        //   if (!sectionRefs.current[section]) {
        //     sectionRefs.current[section] = el;
        //   }
        // }}
      >
        <div
          className="jpOverlay"
          style={{ backgroundImage: `url(${OverlayImage})` }}
        ></div>
        <div className="gamePanel">
          <div
            className="img"
            style={{
              backgroundImage: `url(${
                game.game?.game_icon ?? game.game?.image_url
              })`,
              width: "-webkit-fill-available",
            }}
          ></div>
          <div className="reaCover">
            <div
              data-real="1"
              className="link Real"
              onClick={(event) =>
                handleButtonClick(
                  event,
                  game.game?.game_id ?? game.game?.gameName ?? game.game?.key,
                  game.game?.gameCategory
                )
              }
            >
              <div>Play now</div>
            </div>
          </div>
        </div>
        <div className="imgCover">
          <h4>{game.game?.game_name ?? game.game?.gameName}</h4>
          <a className="infoBtn">
            <div>i</div>
          </a>
          <Link
            data-real="0"
            className="link Fun"
            to={`/smart-play?game=${game.game?.game_id}&category=${game.game?.gameCategory}&status=demo`}
            target="_self"
          >
            <div>Demo</div>
          </Link>
        </div>
      </div>
    ));
  };

  const renderSection = (section) => {
    const data = casino_search.length > 0 ? casino_search : casino_games;
    const allGames = data.flatMap(
      (providerGames) => providerGames[Object.keys(providerGames)[0]]
    );
    const length = allGames.length;

    return (
      <div
        key={section}
        className="section"
        ref={(el) => {
          if (!sectionRefs.current[section]) {
            sectionRefs.current[section] = el;
          }
        }}
      >
        <div className="d-flex justify-content-between px-4 section-lobby-header">
          <h2 style={{textTransform: "capitalize"}}>{section}</h2>
          <div className="see-more-less">
            {visibleItems[section] < length ? (
              <button style={{textTransform: "capitalize"}} onClick={() => handleSeeMore(section, length)}>
                See More
              </button>
            ) : (
              <button style={{textTransform: "capitalize"}} onClick={() => handleSeeLess(section)}>See Less</button>
            )}
          </div>
        </div>
          { (section === "virtual League") ? 
          <div className="gamesCont grid-layout slots">
            {renderVirtualLeague()}
            </div>
          :

        <div className="gamesCont grid-layout slots">
          {length > 0 ? (
            casino_search.length > 0 ? (
              renderCasinoSearch(data, section)
            ) : (
              renderCasinoGames(data, section)
            )
          ) : (
            <p>No games available.</p>
          )}
        </div>}
      </div>
    );
  };

  return <div ref={(el) => {
    if (!sectionRefs.current["virtual League"]) {
      sectionRefs.current["virtual League"] = el;
    }
  }}>{sections.map(renderSection)}</div>;
};

export default CasinoGamesComponent;
