import React from "react";
import ReactGA from "react-ga4";
import ReactPixel from 'react-facebook-pixel';

export function trackEventToGTM(category, action, label) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'customEvent',
        eventCategory: category,
        eventAction: action,
        eventLabel: label
    });

    // Push the GTM event
    window.dataLayer.push({
        'event': 'gtmEvent',
        'gtmEventType': 'gaEvent',
        'gaEventCategory': category,
        'gaEventAction': action,
        'gaEventLabel': label
    });
}
const useAnalyticsEventTracker = (category = 'Home', action = 'Page Visit') => {
    const eventTracker = (action_data, label) => {
        const gaCategory = action_data || action;
        const gaLabel = label || category;

        trackEventToGTM(category, gaCategory, gaLabel);
        ReactGA.event({ category, action: gaCategory, label: gaLabel });
        ReactPixel.track('CustomEvent', {
            category: gaCategory,
            action: gaLabel
        });
    };
    return eventTracker;
};

export default useAnalyticsEventTracker;