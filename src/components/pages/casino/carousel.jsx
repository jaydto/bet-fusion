import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import Banner1 from "../../../assets/img/banner/products/BetDonjo1.gif";
// import Banner2 from "../../../assets/img/banner/products/BetDonjo2.webp";

const localBanners = [
    { title: "Banner 1", image_url: Banner1, link: "/casino" },
    // { title: "Banner 2", image_url: Banner2, link: "/sports" },
];

const CasinoCarouselLoader = React.memo(() => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="casino-carousel-container">
<div className="carousel-container">
            {/* Background Div */}
            <div className="carousel-background"></div>

            {/* Carousel */}
            <Carousel indicators={false} controls={true} className="carousel-overlay">
                {localBanners.map((banner, idx) => (
                    <Carousel.Item key={idx}>
                        <LazyLoadImage
                            loading="lazy"
                            title={banner.title}
                            className="d-block w-100 cursor-pointer"
                            style={{ display: imageLoaded ? "block" : "none", height: "auto" }}
                            src={banner.image_url}
                            onLoad={() => setImageLoaded(true)}
                            alt="Casino"
                            effect="blur"
                            onClick={() => navigate(banner.link)}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
        </div>
        
    );
});

export default CasinoCarouselLoader;
