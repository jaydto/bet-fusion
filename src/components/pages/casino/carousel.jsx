import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { casinoCarouselImages } from "../../../redux/dataSlice";

import { useDispatch, useSelector } from "react-redux";
import { casinoCarouselImages } from "../../../redux/dataSlice";


const CasinoCarouselLoader = React.memo(() => {
    const dispatchRedux = useDispatch();
    const navigate = useNavigate();

    const banner_images = useSelector((state) => state.data.casino_carousel_banners);
    const [imageLoaded, setImageLoaded] = useState(false);


    // Commented out API fetching logic

    const getCarouselImages = async () => {
        dispatchRedux(casinoCarouselImages());
    };

    useEffect(() => {
        if (!banner_images || banner_images.length === 0) {
            getCarouselImages();
        } else {
            // If data exists, we consider the "logic" loaded (though images still need to download)
            setImageLoaded(true); 
        }
    }, [banner_images?.length]);

    const onImageLoaded = () => setImageLoaded(true);

    return (
        <Carousel indicators={false} controls={true}>
            {(banner_images??[]).map((banner, idx) => (
                <Carousel.Item key={idx}>
                    <LazyLoadImage
                        loading="lazy"
                        title={banner.title}
                        className="d-block w-100 cursor-pointer casino-banner-image-height"
                        style={{ display: imageLoaded ? "block" : "none", height: "auto" }}
                        src={banner.image_url}
                        onLoad={onImageLoaded}
                        alt="Casino"
                        effect="blur"
                        onClick={() => navigate(banner.desktop_link_url)}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
});

export default CasinoCarouselLoader;
