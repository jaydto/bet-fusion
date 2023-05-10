import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import makeRequest from "../utils/fetch-request";
import useWindowDimensions from "../header/Dimensions";
import {getFromLocalStorage} from "../utils/local-storage";


const Testimonials = () => {
    const [testimonials, setTestimonials]=useState([]);
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

    const fetchTestimonials= (async=>{
        let endpoint="/v1/recent-winners"

        makeRequest({url: endpoint, method:'POST',data:{}}).then((result)=>{
            setTestimonials(result[1])


        })

    });
    useEffect(() => {
        fetchTestimonials()
    }, []);

    return (
        <div className={`testimonials-style  shadow-testimonials d-flex ${user?"sticky-logged-in-testimony":"sticky-testimony"}`}>
                <div className={'text-warning bg-black size-1 d-flex'} style={{zIndex:"200", whiteSpace:'nowrap'}}><span className={'stats-desktop'}>Recent</span>&nbsp;Winners</div>

                    <ul className={' d-flex text-light flex-nowrap testimonial-style size-2'}  >
                        {testimonials?.map((testimony,index)=>(
                            <li key={index} className={" px-3 d-flex"}  >
                                {testimony}
                            </li>

                        ))}

                    </ul>




         </div>

    );
};

export default React.memo(Testimonials);
