import React from 'react';

import Points from "../../points/RedeemPoints";

function PointsProfile(props) {

    return (
        // <div className="w-100">
            <Points mobile={true}/>
        // </div>
    );
}

export default React.memo(PointsProfile);