import React from 'react';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import BetSlip from './betslip';

const AlertMessage = (props) => {
    return (
        <div className={`alert alert-dismissible ${props.classname}`} role='alert'>
            <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span>
            </button>
           {props.message}
        </div>
    )
}

const Right = (props) => {
    const { jackpot } = props;

    return (
        <div className="gn" id="right-generic">
            {props?.message && <AlertMessage classname={props.classname} message={props.message} /> }
            <div className="bet-option-list" id='slip-holder'>
                <div className="bet alu block-shadow">
                    <header>
                        <div className="betslip-header">
                            <span className="col-sm-2 bkmrk"><i className="fa fa-bookmark" aria-hidden="true"></i></span>
                            <span className="col-sm-8 slp">BETSLIP</span>
                            <span className="col-sm-2 slip-counter">{props.betslip_count}</span>
                        </div>
                    </header>
                    <button id="slip-button-close" type="button" className="close mobi" aria-hidden="true">×</button>
                    <div id="betslip" className="betslip">
                        
                        <BetSlip jackpot={jackpot} />
                    </div>
                    <QuickLogin />

                </div>

                <CompanyInfo />

            </div>
        </div>

    )
}
export default Right;
