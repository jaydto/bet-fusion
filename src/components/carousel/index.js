import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Av2 from '../../assets/img/banner/products/Aviator.webp'
import Roma from '../../assets/img/banner/products/RomavsLeverkusen.webp'



const banners = [

    {src: Roma, url: "/match/32870895"},
    {src: Av2, url: "/nare-games/aviator"},

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
