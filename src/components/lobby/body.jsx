import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { casinoList } from "../../redux/virtualsSlice";
import { Link, useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../utils/local-storage";
import OverlayIimage from "../../assets/img/mobile/overlayImage.png";

const CasinoGamesComponent = () => {
  const dispatch = useDispatch();
  const casino_games = useSelector((state) => state.virtuals.casino_games);
  const userData = useSelector((state) => state.auth.user);
  const casino_search = useSelector((state) => state.virtuals.casino_search);

  const [user, setUser] = useState(getFromLocalStorage("user"));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data when component mounts or when needed
    getSmartGames("slots"); // Assuming "slots" is the category you want to fetch
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

    // Assuming `casinoList` is your action creator dispatched with Redux
    dispatch(casinoList(data));
  };

  const handleButtonClick = (event, game_id, gameCategory) => {
    event.stopPropagation(); // Prevent event from propagating to parent element

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

  const renderCasinoGames = (games) => {
    return games.map((providerGames, providerIndex) =>
      providerGames[Object.keys(providerGames)[0]].map((game, gameIndex) => (
        <div
          key={`${providerIndex}-${gameIndex}`}
          className={`grid-item ${gameIndex === 0 ? "span-2" : ""}`}
          data-provider={game.provider}
          data-category="slots"
          data-order={gameIndex}
          data-id={game.gameId}
        >
          <div className="jpOverlay"         style={{backgroundImage:`url(${OverlayIimage})`}}
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
                to={`/smart-play?game=${game?.game_id}&category=${
                  game?.gameCategory
                }&status=live`}
                target="_self"
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
              to={`/smart-play?game=${game?.game_id}&category=${
                game?.gameCategory
              }&status=demo`}
              target="_self"
            >
              <div>Demo</div>
            </Link>
          </div>
        </div>
      ))
    );
  };

  const renderCasinoSearch = (games) => {
    return games.map((game, gameIndex) => (
      <div
        key={`${game.provider}-${game.game.gameId}`}
        className={`grid-item ${gameIndex === 0 ? "span-2" : ""}`}
        data-provider={game.provider}
        data-category={game.game.gameCategory}
        data-order={gameIndex}
        data-id={game.game.gameId}
      >
        <div className="jpOverlay"    style={{backgroundImage:`url(${OverlayIimage})`}}
></div>
        <div className="gamePanel">
          <div
            className="img"
            style={{
              backgroundImage: `url(${game.game?.game_icon ?? game.game?.image_url})`,
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
              to={`/smart-play?game=${game.game?.game_id}&category=${
                game.game?.gameCategory
              }&status=live`}
              target="_self"
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
            to={`/smart-play?game=${game.game?.game_id}&category=${
              game.game?.gameCategory
            }&status=demo`}
            target="_self"
          >
            <div>Demo</div>
          </Link>
        </div>
      </div>
    ));
  };

  

  return (
    <section className="gamesCont grid-layout slots">
      {casino_search.length > 0
        ? renderCasinoSearch(casino_search)
        : renderCasinoGames(casino_games)}
    </section>
  );
};

export default CasinoGamesComponent;
