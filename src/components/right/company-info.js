import React from 'react';

import {LazyLoadImage} from "react-lazy-load-image-component";

const CompanyInfo = React.memo(
    (props) => {

        return (
            <div className="qv rc alu show-on-affix">
                <div className="qv rc alu paybill block-shadow bottom-std-margin-spacing card px-2"
                     style={{background: "transparent"}}>
                    <div className="">
                        <div className="">
                        <span className="col-sm-4">
                        {/*<LazyLoadImage src={contact} alt=" " />*/}
                        </span>
                            <span className="col-sm-8">
                            {/* <LazyLoadImage src={Paybill} alt="" className='w-100' style={{borderRadius: "10px"}}/> */}
                        </span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="">
                        <span className="col-sm-4">
                        {/*<LazyLoadImage src={contact} alt=" " />*/}
                        </span>
                            <span className="col-sm-8 mt-4">
                            {/* <LazyLoadImage src={CustomerCare} alt="" className='w-100' style={{borderRadius: "10px"}}/> */}
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        )

    })
export default React.memo(CompanyInfo);
