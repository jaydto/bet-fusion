// FullscreenButton.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft, faExpand} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";

const FullscreenX = ({ onClick, navigation, isCustomFullScreen }) => {
	const navigate=useNavigate()
	return (
		<div className={` height-max-custom d-flex align-items-center justify-content-between ${isCustomFullScreen &&'full-screen-component'}`} >
                        <span className={'px-3 '} onClick={() => navigate(navigation)}>

                                                <FontAwesomeIcon icon={faAngleLeft} style={{
													fontSize: "16px",
													color: 'var(--light)',
													fontWeight: '700',
													opacity: '0.7'
												}}/>
                                               <span style={{fontSize: "16px",
												   color: 'var(--light)',
												   fontWeight: '700',
												   opacity: '0.7',
												   paddingLeft:'11px'}}> Back</span>
                                            </span>
                                            <Link to="/leader-boardx" style={{fontSize: "16px",
												   color: 'var(--link-color)',
												   fontWeight: '700',
												   opacity: '0.7',
												//    border:'1px solid var(--light-color)',
												//    borderRadius:'4px',
												   paddingLeft:'11px'}}>~ValentineX Challenge~</Link>

			<div className="fullscreen-button px-3" onClick={onClick}>
				{isCustomFullScreen?'Exit':'View'} Fullscreen <FontAwesomeIcon icon={faExpand} />
			</div>
		</div>

	);
};

export default FullscreenX;
