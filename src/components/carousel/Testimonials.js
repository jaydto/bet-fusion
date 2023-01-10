import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import makeRequest from "../utils/fetch-request";
import useWindowDimensions from "../header/Dimensions";
import {getFromLocalStorage} from "../utils/local-storage";


const Testimonials = () => {
    const [testimonials, setTestimonials]=useState([]);
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

    const fetchTestimonials= (async=>{
        // let endpoint='https://api.betnare.com/v1/recent-winners';
        let endpoint="/v1/recent-winners"

        makeRequest({url: endpoint, method:'POST',data:{}}).then((result)=>{
            setTestimonials(result[1])

            console.log("results_data", result[1])
        })
        // axios.post(endpoint).then((result)=>{
        //     console.log("result_data",result)
        // })


    });
    useEffect(() => {
        fetchTestimonials()
    }, []);

    return (
        <div className={"testimonials-style border border-warning d-flex "+`${width<=767?user?"sticky-logged-in-testimony":"sticky-testimony":"sticky-testimony"}`}>

                <div className={'text-warning bg-black size-1 '} style={{zIndex:"200", whiteSpace:'nowrap'}}>Recent Winners</div>

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
