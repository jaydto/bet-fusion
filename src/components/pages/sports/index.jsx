import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setState, sports } from "../../../redux/dataSlice";
import { getFromLocalStorage } from "../../utils/local-storage";
import Loader from "./loader";
import useWindowDimensions from "../../header/Dimensions";
import FullscreenButton from "../../shared/FullScreenButton";
import { useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const SportsPage = () => {
  const dispatch = useDispatch();
  const user = getFromLocalStorage("user");
  const { width } = useWindowDimensions();

  const loading = useSelector((state) => state.data.loading);
  const url = useSelector((state) => state.data.sports_data);
  const [isCustomFullscreen, setCustomFullscreen] = useState(false);

  const [iframeHeight, setIframeHeight] = useState(width < 991 ? 95 : 85); // Initial height

  const navigate=useNavigate()

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
      dispatch(setState("iframeHeight", 95));
    } else {
      setIframeHeight(width < 991 ? 95 : 85);
      dispatch(setState("iframeHeight", width < 991 ? 95 : 85));
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
        dispatch(setState("isFullscreen", false));
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
      dispatch(setState("isFullscreen", true));
    } else {
      try {
        if (!document.fullscreenEnabled) {
          setCustomFullscreen(false);
          dispatch(setState("isFullscreen", false));
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
      dispatch(setState("isFullscreen", false));
    }
  };

  useEffect(() => {
    if (user?.token && user?.profile_id) {
      dispatch(
        sports({
          token: user.token,
          profile_id: user.profile_id,
        })
      );
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <FullscreenButton
        onClick={() => toggleFullscreen()}
        navigation={"/"}
        isCustomFullScreen={isCustomFullscreen}
      />
      {url ? (
        <iframe
          src={url}
          title="Sports"
          allow="fullscreen"
          style={{
            ...iframeStyle,
            marginTop: isCustomFullscreen?"1rem":"0.5rem",
            height: `${Math.min(iframeHeight, maxIframeHeight)}svh`,
            color: 'var(--bet-fusion-red)'
          }}
        />
      ) : (
        <div style={{ color: "var(--white)", textAlign: "center", marginTop: "20px" }}>
          Failed to load sports content.
        </div>
      )}
    </div>
  );
};

export default SportsPage;
