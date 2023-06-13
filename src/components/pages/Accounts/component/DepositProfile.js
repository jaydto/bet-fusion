import React from 'react';
import Deposit from "../../deposit-withraw/Deposit";

function DepositProfile() {

    return (
            <Deposit mobile={true}/>
    );
}

export default React.memo(DepositProfile);