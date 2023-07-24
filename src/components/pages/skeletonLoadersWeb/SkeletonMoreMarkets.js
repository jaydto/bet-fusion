import React from 'react';
import './skeletonLoader.css'

const SkeletonMoreMarkets = React.memo(
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
                    <div className="movie--isloading mobile-web">
                        <div className="loading-content mobile-web">
                            <div className={'loading-text-container d-flex flex-column justify-content-between mobile-web'}>
                                <div className="loading-sub-text mobile-web" style={backgroundLoader}></div>
                                <div className="loading-main-text mobile-web" style={backgroundLoader}></div>
                                <div className="loading-sub-text mobile-web" style={backgroundLoader}></div>
                            </div>

                            <div className={'d-flex w-100 justify-content-end align-items-end flex-column'}>
                                <div className={'d-flex w-100 my-3 align-items-end justify-content-end'}>
                                    <div className="loading-btn mobile-web" style={backgroundLoaderbtn}></div>
                                    <div className="loading-btn mobile-web" style={backgroundLoaderbtn}></div>
                                    <div className="loading-btn mobile-web" style={backgroundLoaderbtn}></div>
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

export default SkeletonMoreMarkets;
