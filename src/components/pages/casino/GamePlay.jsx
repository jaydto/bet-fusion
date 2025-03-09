import React, { useCallback, useEffect, useState } from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getFromLocalStorage } from "../../utils/local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import useWindowDimensions from "../../header/Dimensions";
import FullscreenButton from "../../shared/FullScreenButton";
import { useNavigate } from "react-router-dom";
import GameDemoAlert from "../../Alerts/GameDemoAlert";

const GamePlay = React.memo((props) => {
  const url = new URL(window.location);
  const game = url.searchParams.get("game");
  const type = url.searchParams.get("category");
  const demo_url = url.searchParams.get("demo_url");

  const status = url.searchParams.get("status");

  const [gamePlay, setGamePlay] = useState("");
  const [, setUserToken] = useState("");
  const [, setUserID] = useState("");
  const [gameUrlLoaded, setGameUrlLoaded] = useState(false);
  const gaEventTracker = useAnalyticsEventTracker("Atom Game");
  const [gameStatus, setGameStatus] = useState(status);
  const user = getFromLocalStorage("user"); // Always get the user from local storage
  console.log("demourl", demo_url);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const createToken = async (isDemo) => {
    let endpoint = "/v1/atom/api/Platforms/GameLaunch";

    let method = "POST";

    console.log("user ", user?.profile_id);

    let payload = {
      playerId: user?.profile_id,
      isDemo: isDemo === "1" ? true : false,
      gameId: game,
    };

    await makeRequest({ url: endpoint, method: method, data: payload }).then(
      ([status, result]) => {
        if (status === 200) {
          const data = {
            user_id: user?.profile_id,
            event: "Atom Games",
            game_id: game,
          };

          gaEventTracker("Playing AtomGame", data);
          setUserToken(user?.profile_id);
          setUserID(user?.profile_id);
          if (isDemo === "1") {
            setGamePlay(result?.gameLaunchUrl);
            setGameUrlLoaded(true);
          } else {
            setGamePlay(result?.gameLaunchUrl);
            setGameUrlLoaded(true);
          }
        } else {
          const data = {
            user_id: user?.profile_id,
            event: "Atom Game Launch Fail",
            game_id: game,
            message: "Game Launch Failed",
          };
          gaEventTracker("Playing  Stp Game Failed", data);
        }
      }
    );
  };
  const { width } = useWindowDimensions();
  const [isCustomFullscreen, setCustomFullscreen] = useState(false);

  const [iframeHeight, setIframeHeight] = useState(width < 991 ? 95 : 80); // Initial height

  // Define the CSS style for the iframe
  const iframeStyle = {
    maxWidth: "100%",
    width: width < 991 ? "100lvw" : "100%", // Set width to 100% for mobile, undefined for desktop
    height: `${iframeHeight}svh`, // Set the height dynamically
  };
  const maxIframeHeight =
    width > 991
      ? isCustomFullscreen
        ? window.innerHeight * 2.5
        : window.innerHeight * 0.82
      : window.innerHeight * 2.5; // Maximum height is 77% desktop  and 92% mobile of the screen height

  // // Function to update the iframe height
  const updateIframeHeight = useCallback(() => {
    console.log("customFullscrren", isCustomFullscreen);
    if (isCustomFullscreen) {
      console.log("customFullscrren now", maxIframeHeight);

      setIframeHeight(95); // Set the fixed height here
    } else {
      setIframeHeight(width < 991 ? 95 : 80);
    }
  }, [isCustomFullscreen]);

  useEffect(() => {
    // Initial iframe height calculation
    updateIframeHeight();

    // Update iframe height when the window is resized
    window.addEventListener("resize", updateIframeHeight);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateIframeHeight);
    };
  }, [updateIframeHeight, isCustomFullscreen]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setCustomFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []); // Empty dependency array to run the effect only on mount and unmount

  const toggleFullscreen = () => {
    const element = document.documentElement; // Fullscreen the whole document
    // console.log("Element fullscreen is now ... ",element)

    if (!isCustomFullscreen) {
      try {
        if (element?.requestFullscreen) {
          element?.requestFullscreen();
        } else if (element?.mozRequestFullScreen) {
          element?.mozRequestFullScreen();
        } else if (element?.webkitRequestFullscreen) {
          element?.webkitRequestFullscreen();
        } else if (element?.msRequestFullscreen) {
          element?.msRequestFullscreen();
        }
      } catch (err) {
        //there was an error encountered
        console.error("error_message", err);
      }

      setCustomFullscreen(true);
    } else {
      try {
        if (!document.fullscreenEnabled) {
          setCustomFullscreen(false);
        }
        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      } catch (err) {
        console.error("error_encountered", err);
      }

      setCustomFullscreen(false);
    }
  };

  useEffect(() => {
    const switchToDemoMode = (demo_url) => {
      createToken(status); // Create token if user exists and status is live
      setGameUrlLoaded(true);
    };
    console.log("user", user);

    if (status === "0") {
      if (user) {
        if (status === "1") {
          setGameStatus("demo");
        }
        console.log("calling endpoint")
        createToken(status); // Create token if user exists and status is live
      }
    } else {
      setGameStatus("demo");
      switchToDemoMode(demo_url); // Switch to demo mode if the status is not live
    }
  }, [status]);

  console.log("gameStatus", gameStatus);
  console.log("gameStatus", gamePlay);

  const handleRealGameClick = () => {
    // Update the URL search params to set status to "live"
    url.searchParams.set("status", "0");
    setGameStatus("live");

    window.history.pushState({}, "", url); // Update the URL without reloading
  };

  return (
    <>
      <Header />
      {console.log("height", Math.min(iframeHeight, maxIframeHeight))}
      <div className="amt top-smartsoft gameplay">
        <FullscreenButton
          onClick={() => toggleFullscreen()}
          navigation={"/casino"}
          isCustomFullScreen={isCustomFullscreen}
        />
        <div className="d-flex flex-row justify-content-between">
          <div className="col-md-12 w-100">
            <div className="homepage">
              <div
                className={`col-md-12 w-100 ${
                  gameUrlLoaded ? "d-none" : "d-block"
                }`}
              >
                <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                  <Skeleton height={"100px"} />
                </SkeletonTheme>
              </div>
              {gameUrlLoaded && (
                <div
                  className={` ${
                    isCustomFullscreen ? "active custom-fullscreen-wrapper" : ""
                  }`}
                >
                  <GameDemoAlert
                    game={game}
                    user={user}
                    gameStatus={gameStatus}
                    handleRealGameClick={handleRealGameClick}
                  />
                  <iframe
                    className={"mt-3 shadow-lg"}
                    id={"GamePlayGames"}
                    src={gamePlay}
                    title="Gadme"
                    allow="fullscreen"
                    style={{
                      ...iframeStyle,
                      height: `${Math.min(iframeHeight, maxIframeHeight)}svh`,
                    }}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
});

export default React.memo(GamePlay);
