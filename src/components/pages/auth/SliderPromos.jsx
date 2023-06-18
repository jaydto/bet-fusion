import React, {useContext, useEffect, useState} from 'react';
import "./slider.css"
import {Context} from "../../../context/store";
const Slider = React.memo(
	() => {
	const [state,]=useContext(Context)
	const promosData =state?.app_config?.message?.accountConfiguration?.registrationPromos

	const [slideIndex, setSlideIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSlideIndex((prevIndex) => (prevIndex + 1) % promosData?.length);
		}, 4000);

		return () => {
			clearInterval(interval);
		};
	}, [promosData?.length]);

	const showSlides = () => {
		return promosData?.map((promo, index) => (
			<a
				key={index}
				href="#"
				className={`hcg-slides animated${index === slideIndex ? ' active' : ''}`}
				style={{ display: index === slideIndex ? 'flex' : 'none' }}
			>
				<span className="hcg-slide-text animated">{promo}</span>
			</a>
		));
	};

	const handleDotClick = (index) => {
		setSlideIndex(index);
	};

	const renderDots = () => {
		return promosData?.map((_, index) => (
			<a
				key={index}
				href="#"
				className={`hcg-slide-dot${index === slideIndex ? ' dot-active' : ''}`}
				onClick={() => handleDotClick(index)}
			/>
		));
	};

	return (
		<div id="hcg-slider-1" className="hcg-slider">
			<div className="hcg-slide-container">
				<div className="hcg-slider-body">{showSlides()}</div>
			</div>
			<div className="hcg-slide-dot-control">{renderDots()}</div>
		</div>
	);
});

export default Slider;
