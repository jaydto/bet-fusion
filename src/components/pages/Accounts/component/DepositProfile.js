import React, {useContext, useEffect, useState} from 'react';

import Deposit from "../../deposit-withraw/Deposit";



function DepositProfile(props) {

    return (
        // <div className="w-100">
            <Deposit mobile={true}/>
        // </div>
    );
}

export default React.memo(DepositProfile);