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
    const banner_images = useSelector((state) => state.data.casino_carousel_banners);

    // Commented out API fetching logic

    const getCarouselImages = async () => {
        dispatchRedux(casinoCarouselImages());
    };

    useEffect(() => {
        const abort = new AbortController();
        getCarouselImages();
        return () => {
            abort.abort();
        };
    }, []);


    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
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
