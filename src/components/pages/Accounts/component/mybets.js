import React from 'react';

import Mybets from "./my-bets";

function MybetsProfile(props) {

    return (
        // <div className="w-100">
            <Mybets mobile={true}/>
        // </div>
    );
}

export default React.memo(MybetsProfile);