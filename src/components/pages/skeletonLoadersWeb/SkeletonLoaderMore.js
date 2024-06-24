import React from 'react';
import './skeletonLoader.css'

const SkeletonLoaderMobile = React.memo(
    () => {


    const backgroundLoaderbtn={
        backgroundImage: "-webkit-linear-gradient(left, var(--btn-color) 0px, #ddd 40px, var(--btn-color) 80px)"
    }
        const skeletonCount = 10; // Number of SkeletonLoaderMobile components to render
        const RenderSkeletonLoaders = () => {
            return Array.from({ length: skeletonCount }, (_, index) => (
                <div className="col-sm-12 col-md-12" key={index}>
                    <div className="movie--isloading mobile-web more-markets-web">
                        <div className="loading-content mobile-web flex-column">
                                <div className="loading-btn mobile-web more-header-skeleton more-shape-skeleton2" style={backgroundLoaderbtn}></div>
                            <div className={'d-flex w-100 justify-content-end align-items-end flex-column'}>
                                <div className={'d-flex w-100 my-3 align-items-end justify-content-end'}>
                                    <div className="loading-btn mobile-web more-header-skeleton more-shape-skeleton1" style={backgroundLoaderbtn}></div>
                                    <div className="loading-btn mobile-web more-header-skeleton more-shape-skeleton1" style={backgroundLoaderbtn}></div>
                                    <div className="loading-btn mobile-web more-header-skeleton more-shape-skeleton1" style={backgroundLoaderbtn}></div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            ));
        };

        return (
        <div className=" skeleton-loader more-markets" id="skeleton-loader">
            <RenderSkeletonLoaders/>
        </div>
    );
});

export default SkeletonLoaderMobile;
