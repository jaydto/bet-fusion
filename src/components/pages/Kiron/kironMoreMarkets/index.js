import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";
import useAnalyticsEventTracker from "../../../analytics/useAnalyticsEventTracker";


import LinkOption from "../../../utils/options";
import Button from "../../../utils/button";
import LinkSelect from "../../../utils/options";


const KironMoreMarkets= (props) => {
    const {playgame}=props;
    // let [kiron, setKiron] = useState();
    const [options, setOptions] = useState(getFromLocalStorage('kiron-more'));


    const [pathname, setPathname] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const hasSubTypeId = searchParams.has('sub_type_id');
        const subTypeId = getFromLocalStorage('kiron_search_data')?.sub_type_id || '3';
        const initialPathname = `sub_type_id=${subTypeId}`;

        if (hasSubTypeId) {
            return window.location.search;
        } else {
            return initialPathname;
        }
    });

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hasSubTypeId = searchParams.has('sub_type_id');
        const subTypeId = getFromLocalStorage('kiron_search_data')?.sub_type_id || '3';
        const updatedPathname = hasSubTypeId ? location.search : `sub_type_id=${subTypeId}`;
        setPathname(updatedPathname);
    }, [location.search]);

    const gaEventTracker = useAnalyticsEventTracker('Navigation');


    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('kiron-more');
        let endpoint = "/v1/nare-league/markets";
        let method="POST"

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: method, data: null}),
            ]);
            let [c_status, c_result] = competition_result
            // console.log('kirons',c_result)
            if (c_status === 200) {
                // setKiron(c_result);
                const labeledOptions = c_result.map(option => ({
                    to: "sub_type_id="+option.market_id,
                    label: option?.description
                }));


                setOptions(labeledOptions);

                setLocalStorage('kiron-more', labeledOptions);
            } else {
                fetchData()
            }
        } else {
            setOptions(cached_competitions);
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);

    const getTime=(time)=>{
        const start = new Date(time);
        const startTimeString = start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        return (startTimeString)
    }

    console.log("pathname", pathname)

    return (
        options&&

        <div className="market-option">
            <div className="tabcontent pt-2 pb-2">
                <div className="sport_dropdowns">
                    <div className="double-chance-market text-start" style={{marginLeft:'1rem'}}>
                        <Button  to={`/nare-league?sub_type_id=3`} type="button" className={`text-light btn size-market-kiron size-market-kiron ${pathname.includes(`sub_type_id=3`)&& 'btn-warning '} `}>1X2</Button>
                    </div>
                    <div className="double-chance-market text-center">
                        <Button  to={`/nare-league?sub_type_id=14`} type="button" className={`text-light btn remove-on-smaller-screen size-market-kiron  ${pathname.includes(`sub_type_id=14`)&& 'btn-warning '} `}>Goal/No Goal</Button>
                    </div>
                    <div className="double-chance-market text-center">
                        <Button  to={`/nare-league?sub_type_id=8`} type="button" className={`text-light btn remove-on-smaller-screen size-market-kiron  ${pathname.includes(`sub_type_id=8`)&& 'btn-warning '} `}>Over/Under 2.5</Button>
                    </div>
                    <div className="double-chance-market text-center">

                        <div className="select ">
                            <LinkSelect options={options}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // <div className={ `${playgame?"d-none": "league-container"} ` } style={{background:" #162024",}}>
        //     <table  style={{width: "100%", textAlign: "center", display:'flex'}}>
        //         <tbody className={"d-flex"} style={{overflowX: "auto"}}>
        //         <tr className={"d-flex league-row gap-2 justify-content-center align-items-center  "} style={{ flex: '0 0 auto', overflowX:"hidden" }}>
        //             {kiron?.map((kiron_options, index) => (
        //                 <td key={index} className={` d-flex menu-t sport-check w-100 ${pathname===kiron_options.round_id?" active":""}`} style={{textAlign: 'center',lineHeight: '1.5'}} >
        //                     <Link  style={{width:"100%",height:"50px" }}  to={'#'} >
        //
        //                         <div className="card bg-dark inner-div active d-flex align-items-center flex-column justify-content-center link" onClick={handleLinkClick} style={{ height:'40px', width:'60px'}}>
        //
        //
        //                             {getTime(kiron_options.start_time)}
        //                         </div>
        //
        //                     </Link>
        //                 </td>
        //
        //             ))}
        //
        //         </tr>
        //         </tbody>
        //
        //     </table>
        //
        // </div>
    )
};

export default React.memo(KironMoreMarkets);


