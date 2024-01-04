import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {carouselImages} from "../../redux/dataSlice";
import useWindowDimensions from '../header/Dimensions';

const CarouselLoader = React.memo(
    (props) => {
        const dispatchRedux=useDispatch()
        const banner_images=useSelector((state)=>state.data.carousel_banners)
        const getCarouselImages = async () => {
            dispatchRedux(carouselImages())
        }
        const {width}=useWindowDimensions()


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
            <Carousel indicators={false} 
            controls={width>991?true:false}>
                {banner_images?.map((banner, idx) => (
                    <Carousel.Item key={idx}>
                        <LazyLoadImage
                            loading={"lazy"}
                            title={banner?.title}
                            className="d-block w-100 cursor-pointer"
                            style={{ display: imageLoaded ? 'block' : 'none', height: 'auto', // Allow the height to adjust based on the aspect ratio
                            }}
                            src={banner?.image_url}
                            onLoad={onImageLoaded}
                            alt="Batnare"
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

export default CarouselLoader;
