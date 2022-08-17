import React from "react";
import ReactGA from "react-ga4";

const useAnalyticsEventTracker = (category="Home") => {
    const eventTracker = (action = "Page Visit", label = "Home") => {
        ReactGA.event({category, action, label});
    }
    return eventTracker;
}
export default useAnalyticsEventTracker;