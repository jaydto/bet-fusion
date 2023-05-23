import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import instant from '../../assets/img/banner/products/3kinstant.webp'
import bonus from '../../assets/img/banner/products/20Bonus.webp'
import affiliate from '../../assets/img/banner/products/Affiliate.webp'
import app from '../../assets/img/banner/products/App.webp'
import casino from '../../assets/img/banner/products/Casino_banner.webp'
import spaceman from '../../assets/img/banner/products/SpaceMan.webp'
import jackpot from '../../assets/img/banner/products/jackpot.webp'


const banners = [
    {src: instant, url: "/promotions"},
    {src: bonus, url: "/promotions"},
    {src: affiliate, url: "/"},
    {src: app, url: "/app"},
    {src: casino, url: "/casino"},
    {src: jackpot, url: "/jackpot"},
    {src: spaceman, url: "/gameplay/1301/1"},


]

const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel indicators={false}>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx} >
                    <LazyLoadImage
                        className="d-block w-100 cursor-pointer"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={banner.src}
                        onLoad={onImageLoaded}
                        alt="Batnare"
                        effects="blur"
                        onClick={() => {
                            window.location.href = banner.url
                        }}
                    />
                </Carousel.Item>
            ))
            }

        </Carousel>
    )
}
export default CarouselLoader;
