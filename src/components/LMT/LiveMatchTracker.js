import React, { useEffect } from 'react';

function LiveMatchTracker({ matchId }) {
    console.log("live match id", matchId)
    useEffect(() => {
        window.SIR('addWidget', '#sr-widget', 'match.lmtPlus', {
            matchId: matchId,
            layout: "single",
            scoreboard: "disable",
            detailedScoreboard: "disable",
            tabsPosition: "disable"
        });

    }, [matchId]);

    return <div id="sr-widget"></div>;
}

export default LiveMatchTracker;
