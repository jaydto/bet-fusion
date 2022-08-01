import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import banner4 from '../../assets/img/banner/products/20PercentFirstdepositBonus-min.png'
import banner2 from '../../assets/img/banner/products/30PercentDAILYCASHBACK.png'
import banner3 from '../../assets/img/banner/products/70PercentMULTIBETCASHBACK.png'
import banner1 from '../../assets/img/banner/products/KaribuBonus.png'
import banner5 from '../../assets/img/banner/products/100PercentDepositBonus.png'

const banners = [
    banner1, banner2, banner3, banner4, banner5
]

const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx}>
                    <LazyLoadImage
                        className="d-block w-100"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={banner}
                        onLoad={onImageLoaded}
                        alt="Batnare"
                        effects="blur"
                    />
                </Carousel.Item>
            ))
            }

        </Carousel>
    )
}
export default CarouselLoader;
