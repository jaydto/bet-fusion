import React, {useContext, useEffect, useState} from 'react';

import Deposit from "../../deposit-withraw/Deposit";
import Points from "../../deposit-withraw/Points";



function PointsProfile(props) {

    return (
        // <div className="w-100">
            <Points mobile={true}/>
        // </div>
    );
}

export default React.memo(PointsProfile);