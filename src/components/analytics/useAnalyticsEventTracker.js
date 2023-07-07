import React from "react";
import ReactGA from "react-ga4";
import ReactPixel from 'react-facebook-pixel';

export function trackEventToGTM(category, action, label) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: category,
        eventAction: action,
        eventData: label,
    });

    // Push the GTM event
    // window.dataLayer.push({
    //     'event': 'gtmEvent',
    //     'gtmEventType': 'gaEvent',
    //     'gaEventCategory': JSON.stringify(category),
    //     'gaEventAction': action,
    //     'gaEventLabel': label
    // });
}
const useAnalyticsEventTracker = (category = 'Home', action = 'Page Visit') => {
    const eventTracker = (action_data, label) => {
        const gaCategory = action_data || action;
        const gaLabel = label || category;

        trackEventToGTM(gaCategory, category, gaLabel);
        ReactGA.event(gaCategory,{
            event:gaCategory,
            eventAction:category,
            eventData:gaLabel,
        }) ;

        ReactPixel.track(gaCategory, {
            event: gaCategory,
            eventData: gaLabel
        });
    };
    return eventTracker;
};

export default useAnalyticsEventTracker;