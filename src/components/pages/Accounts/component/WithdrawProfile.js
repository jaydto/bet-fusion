import React, {useContext, useEffect, useState} from 'react';

import Withdraw from "../../deposit-withraw/Withdraw";


function WithdrawProfile(props) {


    return (
        <div className=" w-100">
            <Withdraw mobile={true}/>
        </div>
    );
}

export default React.memo(WithdrawProfile);