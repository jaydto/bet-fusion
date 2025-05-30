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

import { Layout, Row, Col, Grid } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../redux/dataSlice";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const GamePlay = React.memo((props) => {
  const url = new URL(window.location);
  const game = url.searchParams.get("game");
  const gameName = url.searchParams.get("game_name");
  const type = url.searchParams.get("category");
  const demo_url = url.searchParams.get("demo_url");
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

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
  // const [isCustomFullscreen, setCustomFullscreen] = useState(false);
  const isCustomFullscreen = useSelector(
    (state) => state?.data?.is_custom_fullscreen
  );

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
        dispatch(setState("is_custom_fullscreen", false));
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
      dispatch(setState("is_custom_fullscreen", true));

      console.log("isCustomFullscreen", isCustomFullscreen);
    } else {
      try {
        if (!document.fullscreenEnabled) {
          dispatch(setState("is_custom_fullscreen", false));
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

      dispatch(setState("is_custom_fullscreen", false));
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
        console.log("calling endpoint");
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
      {console.log("height", Math.min(iframeHeight, maxIframeHeight))}
      <Layout
        className=" game-play-layout"
        style={{
          background: "var(--jaza-bets-primary)",
          padding: isMobile ? 4 : 24,
          marginTop: isCustomFullscreen ? 0 : isMobile ? 0 : 75,
        }}
      >
        <FullscreenButton
          onClick={() => toggleFullscreen()}
          navigation={"/"}
          isCustomFullScreen={isCustomFullscreen}
        />
        <Content>
          <Row justify="space-between" style={{ width: "100%" }}>
            <Col span={24}>
              <div className="homepage">
                {!gameUrlLoaded && (
                  <Skeleton
                    active
                    paragraph={false}
                    style={{ height: 100, backgroundColor: "#0e131b" }}
                    className="mb-3"
                  />
                )}
                {gameUrlLoaded && (
                  <div
                    className={
                      isCustomFullscreen
                        ? "active custom-fullscreen-wrapper"
                        : ""
                    }
                    style={
                      isCustomFullscreen
                        ? {
                            padding: isMobile ? 5 : 10,
                            backgroundColor: "var(--jaza-bets-primary)",
                            zIndex: 999999,
                            position: "relative",
                            marginTop:isMobile?"-2rem":"-4rem",
                          }
                        : {}
                    }
                  >
                    <GameDemoAlert
                      game={gameName}
                      user={user}
                      gameStatus={gameStatus}
                      handleRealGameClick={handleRealGameClick}
                    />
                    <iframe
                      className={`${
                        isCustomFullscreen ? " shadow-lg" : "mt-3 shadow-lg"
                      }`}
                      id="GamePlayGames"
                      src={gamePlay}
                      title="Game"
                      allowFullScreen
                      style={{
                        ...iframeStyle,
                        height: `${Math.min(iframeHeight, maxIframeHeight)}svh`,
                      }}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
});

export default React.memo(GamePlay);
