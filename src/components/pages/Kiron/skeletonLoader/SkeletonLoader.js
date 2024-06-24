import React from 'react';
import './skeletonLoader.css'

const SkeletonLoader = React.memo(
    () => {

    const backgroundLoader={
        backgroundImage: "linear-gradient(90deg, #ececec 0px, #ddd 40px, #ececec 80px)"
    }
    const backgroundLoaderbtn={
        backgroundImage: "-webkit-linear-gradient(left, var(--btn-color) 0px, #ddd 40px, var(--btn-color) 80px)"
    }
    return (
        <div className=" skeleton-loader" id="skeleton-loader">
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-12">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text" style={backgroundLoader}></div>
                            <div className="loading-sub-text" style={backgroundLoader}></div>
                        </div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                        <div className="loading-btn" style={backgroundLoaderbtn}></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default SkeletonLoader;
