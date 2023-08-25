import React from "react"

const NotFound = React.memo(
    () => {
    return (
        <>
            <div className="page-404">
                <div className="outer">
                    <div className="middle">
                        <div className="inner">
                            <div className="inner-circle">
                                <i className="fa fa-home"></i>
                                <span>404</span>
                            </div>
                            <span className="inner-status">Oops! Page Not Found </span>
                            <span className="inner-detail">
                                We can not find the page you're looking for.
                                <a href="/" className="btn btn-info mtl btn-lg text-white mt-5">
                                    &nbsp; Go Back Home Betnare.com
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default NotFound