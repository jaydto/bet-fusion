import React from 'react';
import CustomerCare from '../../assets/img/banner/customer-care/Customer Care.png'
import Paybill from '../../assets/img/banner/customer-care/PAYBILL.jpg'

const CompanyInfo = (props) => {

    return (
        <div className="qv rc alu show-on-affix">
            <div className="qv rc alu paybill block-shadow bottom-std-margin-spacing">
                <div className="">
                    <div
                        className="contact-us black-bg capitalize text-white text-uppercase std-block-head bold">
                        Paybill Number
                    </div>
                    <div className="">
                        <span className="col-sm-4">
                        {/*<img src={contact} alt=" " />*/}
                        </span>
                        <span className="col-sm-8">
                            <img src={Paybill} alt="" className='w-100'/>
                        </span>
                    </div>
                </div>
                <div className="">
                    <div
                        className="contact-us black-bg capitalize text-white text-uppercase std-block-head bold">
                        Customer Care
                    </div>
                    <div className="">
                        <span className="col-sm-4">
                        {/*<img src={contact} alt=" " />*/}
                        </span>
                        <span className="col-sm-8">
                            <img src={CustomerCare} alt="" className='w-100'/>
                        </span>
                    </div>
                    <div className="mail text-lowercase bold">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i> &nbsp; support@betnare.com
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CompanyInfo;
