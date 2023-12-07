import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {casinoCarouselImages} from "../../../redux/dataSlice";

const CasinoCarouselLoader = React.memo(
    (props) => {
        const dispatchRedux=useDispatch()
        const banner_images=useSelector((state)=>state.data.casino_carousel_banners)
        const getCarouselImages = async () => {
            dispatchRedux(casinoCarouselImages())
        }

        useEffect(() => {
            const abort= new AbortController()
            getCarouselImages()
            return ()=>{
                abort.abort()
            }
        }, [])

        const [imageLoaded, setImageLoaded] = useState(false);
        const onImageLoaded = () => {
            setImageLoaded(true);
        }
        const navigate=useNavigate()

        return (
            <Carousel indicators={false} controls={true}>
                {banner_images?.map((banner, idx) => (
                    <Carousel.Item key={idx}>
                        <LazyLoadImage
                            loading={"lazy"}
                            title={banner?.title}
                            className="d-block w-100 cursor-pointer casino-banner-image-height"
                            style={{ display: imageLoaded ? 'block' : 'none', height: 'auto', // Allow the height to adjust based on the aspect ratio
                            }}
                            src={banner?.image_url}
                            onLoad={onImageLoaded}
                            alt="Casino"
                            width={""}
                            effects="blur"
                            onClick={() => {
                                navigate(banner?.desktop_link_url)
                            }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    }
)

export default CasinoCarouselLoader;
