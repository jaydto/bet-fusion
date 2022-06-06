import React from 'react';
import contact from '../../assets/img/contact-24.png';

const CompanyInfo = (props) => {

    return (
        <div className="qv rc alu show-on-affix">
            <div className="qv rc alu paybill block-shadow bottom-std-margin-spacing">
                <div className="std-block-head bold">
                    Paybill Number
                </div>

                <div className="warning-txt"></div>

                <div className="sidebar company-number bold">
                    4087777
                </div>

                <div className="payment-selector std-side-pads no-transform">


                </div>
                <div className="support">
                    <div className="contact-us black-bg capitalize">Customer Care</div>
                    <div className="helpline">
                        <span className="col-sm-4">
                        {/*<img src={contact} alt=" " />*/}
                        </span>
                        <span className="col-sm-8">
                            0701 087 777
                        </span>
                    </div>
                    <div className="mail">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i> &nbsp; support@betnare.com
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CompanyInfo;
