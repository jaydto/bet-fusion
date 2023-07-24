import React from 'react';
import './skeleton-desktop.css'
import './skeletonLoader.css'

const SkeletonLoader = React.memo(
    () => {

        const backgroundLoader={
            backgroundImage: "linear-gradient(90deg, #ececec 0px, #ddd 40px, #ececec 80px)"
        }
        const backgroundLoaderbtn={
            backgroundImage: "-webkit-linear-gradient(left, #2D4352 0px, #ddd 40px, #2D4352 80px)"
        }
        const skeletonCount = 10; // Number of SkeletonLoaderMobile components to render

        const RenderSkeletonLoaders = () => {
            return Array.from({ length: skeletonCount }, (_, index) => (
                <div className="col-sm-12 col-md-12" key={index}>
                    <div className="movie--isloading web-desktop">
                        <div className="loading-content web-desktop ">
                            <div className="loading-content web-desktop web-header">
                                <div className={'loading-text-container d-flex flex-column justify-content-start web-desktop'} style={{flexBasis:'41%'}}>
                                    <div className="loading-sub-text mb-3 web-desktop" style={backgroundLoader}></div>
                                    <div className="loading-sub-text web-desktop" style={backgroundLoader}></div>
                                </div>
                                <div className={'loading-text-container d-flex flex-column justify-content-between web-desktop'}>
                                    <div className="loading-sub-text mb-3 web-desktop" style={backgroundLoader}></div>
                                    <div className="loading-main-text web-desktop" style={backgroundLoader}></div>
                                    <div className="loading-sub-text web-desktop" style={backgroundLoader}></div>
                                </div>
                            </div>
                            <div className={'d-flex w-100 justify-content-between align-items-end flex-column'}>
                                <div className={'d-flex w-100 justify-content-between'}>
                                    <div className={'d-flex w-100 my-3 align-items-end justify-content-end mx-2'}>
                                        <div className="loading-btn mobile-web" style={backgroundLoaderbtn}></div>
                                        <div className="loading-btn mobile-web" style={backgroundLoaderbtn}></div>
                                        <div className="loading-btn mobile-web" style={backgroundLoaderbtn}></div>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            ));
        };

        return (
            <div className=" skeleton-loader" id="skeleton-loader">
                <RenderSkeletonLoaders/>
            </div>
        );
    });

export default SkeletonLoader;
